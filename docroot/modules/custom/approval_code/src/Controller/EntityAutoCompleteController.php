<?php

namespace Drupal\approval_code\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Routing\RouteProviderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Utility\Xss;
use Drupal\Core\Entity\Element\EntityAutocomplete;
use Drupal\Core\Database\Driver\mysql\Connection;

/**
 * Defines a route controller for watches autocomplete form elements.
 */
class EntityAutoCompleteController extends ControllerBase {

  /**
   * The node storage.
   *
   * @var \Drupal\node\NodeStorage
   *   The node storage service.
   */
  protected $nodeStorage;

  /**
   * MySQL Connection.
   *
   * @var \Drupal\Core\Database\Driver\mysql\Connection
   *   MySQL Connection service.
   */
  protected $connection;

  /**
   * Route provider.
   *
   * @var \Drupal\Core\Routing\RouteProviderInterface
   *   Route provider service.
   */
  protected $routeProvider;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, Connection $connection, RouteProviderInterface $routeProvider) {
    $this->nodeStorage = $entity_type_manager->getStorage('node');
    $this->connection = $connection;
    $this->routeProvider = $routeProvider;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('database'),
      $container->get('router.route_provider')
    );
  }

  /**
   * Handler for autocomplete request.
   */
  public function handleAutocomplete(Request $request) {
    $results = [];
    $input = $request->query->get('q');
    $entity_type = $request->get('entity_type');

    // Get the typed string from the URL, if it exists.
    if (!$input || !in_array($entity_type, ['node', 'route'])) {
      return new JsonResponse($results);
    }

    $input = Xss::filter($input);
    switch ($entity_type) {
      case 'node':
        $node_types = $this->config('approval_code.settings')->get('content_types');
        $query = $this->nodeStorage->getQuery()
          ->condition('type', $node_types, 'IN')
          ->condition('title', $input, 'CONTAINS')
          ->groupBy('nid')
          ->sort('created', 'DESC')
          ->range(0, 10);

        $ids = $query->execute();
        $nodes = $ids ? $this->nodeStorage->loadMultiple($ids) : [];

        foreach ($nodes as $node) {
          $availability = '🚫';
          if ($node->isPublished()) {
            $availability = '✅';
          }

          $label = [
            $node->getTitle(),
            '<small>(' . $node->id() . ')</small>',
            $availability,
          ];

          $results[] = [
            'value' => EntityAutocomplete::getEntityLabels([$node]),
            'label' => implode(' ', $label),
          ];
        }

        break;

      case 'route':
        $query = \Drupal::database()->select('router', 'r');
        $query->fields('r', ['name', 'path']);
        $query->condition('r.name', "%" . $this->connection->escapeLike($input) . "%", 'LIKE');
        $query->range(0, 10);
        $routes = $query->execute()->fetchAll();

        foreach ($routes as $route) {
          $results[] = [
            'value' => $route->name,
            'label' => $route->name,
          ];
        }

        break;
    }

    return new JsonResponse($results);
  }

}

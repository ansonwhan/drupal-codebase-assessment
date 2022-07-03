<?php

namespace Drupal\approval_code\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Database\Database;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Routing\RouteProviderInterface;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

/**
 * {@inheritdoc}
 */
class approvalAdminForm extends ConfigFormBase {

  /**
   * Drupal\Core\Entity\EntityTypeManagerInterface definition.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Drupal\Core\Entity\LinkGeneratorInterface definition.
   *
   * @var \Drupal\Core\Utility\LinkGeneratorInterface
   */
  protected $linkGenerator;

  /**
   * Route provider service.
   *
   * @var \Drupal\Core\Routing\RouteProviderInterface
   *   Route provider service variable.
   */
  protected $routeProvider;

  /**
   * Logger channel service.
   *
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   *   Logger channel service interface.
   */
  protected $loggerFactory;

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'approval_code.settings',
    ];
  }

  /**
   * approvalAdminForm constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   Entity Type Manger service.
   * @param \Drupal\Core\Utility\LinkGeneratorInterface $link_generator
   *   Link generator service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $channelFactory
   *   Channel factory service.
   * @param \Drupal\Core\Routing\RouteProviderInterface $routeProvider
   *   Route provider service.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, LinkGeneratorInterface $link_generator, LoggerChannelFactoryInterface $channelFactory, RouteProviderInterface $routeProvider) {
    $this->entityTypeManager = $entity_type_manager;
    $this->linkGenerator = $link_generator;
    $this->loggerFactory = $channelFactory->get('approval_code');
    $this->routeProvider = $routeProvider;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('link_generator'),
      $container->get('logger.factory'),
      $container->get('router.route_provider')
    );
  }

  /**
   * {@inheritdoc}
   */
  private function getContentTypes() {
    $types = $this->entityTypeManager
      ->getStorage('node_type')
      ->loadMultiple();
    $content_types = [];
    foreach ($types as $key => $content_type) {
      $content_types[$key] = $content_type->label();
    }
    return $content_types;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'approval_admin';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('approval_code.settings');
    $form['desktop_group'] = [
      '#type'          => 'fieldset',
    ];
    $form['desktop_group']['global_approval'] = [
      '#description'   => $this->t('This is the default Global approval Code. This approval Code will be applied to all pages of the site unless overridden at the node level'),
      '#default_value' => $config->get('global_approval'),
      '#placeholder'   => $this->t('No approval Code set'),
      '#size'          => 19,
      '#title'         => $this->t('Global approval Code'),
      '#type'          => 'textfield',
    ];
    $form['desktop_group']['global_approval_modified'] = [
      '#default_value' => $config->get('global_approval_modified'),
      '#description'   => $this->t('Day may not be displayed to the user'),
      '#placeholder'   => $this->t('Not Set'),
      '#title'         => $this->t('approval Date'),
      '#type'          => 'date',
    ];
    $form['desktop_group']['global_approval_expiration'] = [
      '#default_value' => $config->get('global_approval_expiration'),
      '#description'   => $this->t('If expiration is not set, this will default to 1 year from approval date'),
      '#placeholder'   => $this->t('Not Set'),
      '#title'         => $this->t('approval Expiration Date'),
      '#type'          => 'date',
    ];
    $form['mobile_group'] = [
      '#open'          => $config->get('global_approval_mobile') ? TRUE : FALSE,
      '#title'         => $this->t('Mobile'),
      '#type'          => 'details',
    ];
    $form['mobile_group']['global_approval_mobile'] = [
      '#description'   => $this->t('Global approval Code, specific to mobile devices. If these mobile fields are populated, output will be generated for both Desktop and mobile.'),
      '#default_value' => $config->get('global_approval_mobile'),
      '#placeholder'   => $this->t('No approval Code set'),
      '#size'          => 19,
      '#title'         => $this->t('Mobile approval Code'),
      '#type'          => 'textfield',
    ];
    $form['mobile_group']['global_approval_modified_mobile'] = [
      '#default_value' => $config->get('global_approval_modified_mobile'),
      '#description'   => $this->t('Day may not be displayed to the user'),
      '#placeholder'   => $this->t('Not Set'),
      '#title'         => $this->t('Mobile approval Date'),
      '#type'          => 'date',
    ];
    $form['mobile_group']['global_approval_expiration_mobile'] = [
      '#default_value' => $config->get('global_approval_expiration_mobile'),
      '#description'   => $this->t('If expiration is not set, this will default to 1 year from approval date'),
      '#placeholder'   => $this->t('Not Set'),
      '#title'         => $this->t('Mobile approval Expiration Date'),
      '#type'          => 'date',
    ];
    $form['content_types'] = [
      '#attributes'    => ['class' => ['approval-ct-list']],
      '#default_value' => $config->get('content_types') ?: [],
      '#description'   => $this->t('Enable approval Codes to be overridden on these node types'),
      '#options'       => $this->getContentTypes(),
      '#title'         => $this->t('Content Types'),
      '#type'          => 'checkboxes',
    ];
    if (!empty($overridden = $this->overridden())) {
      $form['overridden_group'] = [
        '#description'   => $this->t('These are nodes where the approval code differs from the global approval'),
        '#type'          => 'fieldset',
        '#title'         => $this->t('Overridden Nodes'),
        'overridden'     => [
          '#attributes'    => ['id' => 'overridden'],
          '#markup'        => implode('</li><li>', $overridden),
          '#prefix'        => '<ul><li>',
          '#suffix'        => '</li></ul>',
        ],
      ];
    }
    if (!empty($overridden_routes = $this->overridden('route'))) {
      $form['overridden_routes'] = [
        '#description'   => $this->t('These are routes where the approval code differs from the global approval'),
        '#type'          => 'fieldset',
        '#title'         => $this->t('Overridden Custom Routes'),
        'overridden'     => [
          '#attributes'    => ['id' => 'overridden-routes'],
          '#markup'        => implode('</li><li>', $overridden_routes),
          '#prefix'        => '<ul><li>',
          '#suffix'        => '</li></ul>',
        ],
      ];
    }

    $form['#attached']['library'][] = 'approval_code/approval_code';

    return parent::buildForm($form, $form_state);

  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $approval        = $form_state->getValue('global_approval');
    $modified   = $form_state->getValue('global_approval_modified');
    $expiration = $form_state->getValue('global_approval_expiration');
    $approval_m      = $form_state->getValue('global_approval_mobile');
    $modified_m = $form_state->getValue('global_approval_modified_mobile');
    $exp_m      = $form_state->getValue('global_approval_expiration_mobile');

    // Set 1 year in advance if expiration left empty.
    if (!empty($approval) && !empty($modified) && empty($expiration)) {
      $expiration = date('Y-m-d', strtotime('+1 year', strtotime($modified)));
      $form_state->setValueForElement($form['desktop_group']['global_approval_expiration'], $expiration);
    }
    // Must set Date if approval code entered.
    elseif (!empty($approval) && empty($modified)) {
      $form_state->setErrorByName('global_approval_modified', $this->t('Please set date modified.'));
    }
    // Must set approval code if Date entered.
    elseif (empty($approval) && !empty($modified)) {
      $form_state->setErrorByName('global_approval', $this->t('Please set approval Code or remove date modified.'));
    }
    // Moble.
    if (!empty($approval_m) && !empty($modified_m) && empty($exp_m)) {
      $exp_m = date('Y-m-d', strtotime('+1 year', strtotime($modified_m)));
      $form_state->setValueForElement($form['mobile_group']['global_approval_expiration_mobile'], $exp_m);
    }
    elseif (!empty($approval_m) && empty($modified_m)) {
      $form_state->setErrorByName('global_approval_modified_mobile', $this->t('Please set date modified.'));
    }
    elseif (empty($approval_m) && !empty($modified_m)) {
      $form_state->setErrorByName('global_approval_mobile', $this->t('Please set approval Code or remove date modified.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $content_types = $form_state->getValue('content_types') ?: [];

    $this->config('approval_code.settings')
      ->set('global_approval', $form_state->getValue('global_approval'))
      ->set('global_approval_modified', $form_state->getValue('global_approval_modified'))
      ->set('global_approval_expiration', $form_state->getValue('global_approval_expiration'))
      ->set('global_approval_mobile', $form_state->getValue('global_approval_mobile'))
      ->set('global_approval_modified_mobile', $form_state->getValue('global_approval_modified_mobile'))
      ->set('global_approval_expiration_mobile', $form_state->getValue('global_approval_expiration_mobile'))
      ->set('content_types', array_filter($content_types))
      ->save();
  }

  /**
   * This function fetches all nodes/routes with a approval code set.
   *
   * It returns an array.
   */
  private function overridden($type = 'node') {
    $db = Database::getConnection();
    $approval_entities = $db->select('approval', 'approval')
      ->fields('approval')
      ->condition('entity_type', $type)
      ->execute()
      ->fetchAll();

    $compiled_list = [];
    foreach ($approval_entities as $approval_entity) {
      $link = $this->formatItem($approval_entity, $type);
      if ($link) {
        $compiled_list[] = $link;
      }
    }

    return $compiled_list;
  }

  /**
   * This function returns edit link for node/route.
   */
  private function formatItem($item, $type) {
    $link = FALSE;
    switch ($type) {
      case 'node':
        $node_storage = $this->entityTypeManager->getStorage('node');
        $node = $node_storage->load($item->entity_id);
        if ($node instanceof Node) {
          if (isset($item->id)) {
            $edit_link = Url::fromRoute('entity.approval_code.edit_form',
              ['approval_code' => $item->id]);
          }
          /* @todo: Remove this else statement after drush updb run. */
          else {
            $edit_link = Url::fromUserInput('/node/' . $item->entity_id . '/edit');
          }
          $link = $this->linkGenerator->generate($node->getTitle(), $edit_link) . ' / ' . $item->code;
        }
        break;

      case 'route':
        if (isset($item->id)) {
          $edit_link = Url::fromRoute('entity.approval_code.edit_form', ['approval_code' => $item->id]);

          try {
            $route = $this->routeProvider->getRouteByName($item->entity_id);
            $title = $route->getDefault('_title') ?: $item->entity_id;
            $link = $this->linkGenerator->generate($title, $edit_link) . ' / ' . $item->code;
          }
          catch (RouteNotFoundException $exception) {
            $this->loggerFactory->error('Route not found error. Please, check the route.');
          }

        }

        break;
    }

    return $link;
  }

}

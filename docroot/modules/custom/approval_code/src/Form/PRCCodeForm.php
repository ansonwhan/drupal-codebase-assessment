<?php

namespace Drupal\approval_code\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Entity\Element\EntityAutocomplete;
use Drupal\Core\Form\FormStateInterface;

/**
 * approval Code Entity Edit form.
 *
 * @ingroup approval_code
 */
class approvalCodeForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /** @var \Drupal\approval_code\Entity\approvalCode $entity */
    $form = parent::buildForm($form, $form_state);

    $form['entity_type']['widget']['#ajax'] = [
      'callback' => [$this, 'changeEntityType'],
      'event' => 'change',
      'wrapper' => 'change-entity-wrapper',
    ];

    $form['entity_id']['#prefix'] = '<div id="change-entity-wrapper">';
    $form['entity_id']['#suffix'] = '</div>';
    $form['entity_id']['widget'][0]['value']['#autocomplete_route_name'] = 'approval_code.autocomplete.entity';

    $entity_type_value = 'node';
    $entity_type = $form_state->getValue('entity_type');
    if (isset($entity_type[0]['value'])) {
      $entity_type_value = $entity_type[0]['value'];
    }
    /* This is made for default form load change node ID to node title */
    if ($entity_type_value == 'node') {
      $entity_id = $form['entity_id']['widget'][0]['value']['#default_value'];
      if (is_numeric($entity_id)) {
        $node = \Drupal::entityTypeManager()
          ->getStorage('node')
          ->load($entity_id);
        $form['entity_id']['widget'][0]['value']['#default_value'] = EntityAutocomplete::getEntityLabels([$node]);
      }
    }
    $form['entity_id']['widget'][0]['value']['#autocomplete_route_parameters'] = ['entity_type' => $entity_type_value];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    // Redirect to approval_code list after save.
    $form_state->setRedirect('entity.approval_code.collection');
    $entity = $this->getEntity();
    /* Changing to ID back only for nodes to save correctly in database */
    if ($entity->entity_type->value == 'node') {
      $key = 'entity_id';
      $entity->{$key}->value = EntityAutocomplete::extractEntityIdFromAutocompleteInput($entity->{$key}->value);
    }

    $entity->save();
  }

  /**
   * Ajax callback.
   */
  public function changeEntityType(array &$form, FormStateInterface $form_state) {
    return $form['entity_id'];
  }

}

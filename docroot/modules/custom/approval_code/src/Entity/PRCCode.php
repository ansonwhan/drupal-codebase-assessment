<?php

namespace Drupal\approval_code\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\EntityChangedTrait;

/**
 * Defines the approvalCode entity.
 *
 * @ingroup approval_code
 *
 * @ContentEntityType(
 * id = "approval_code",
 * label = @Translation("approval Code entity"),
 * handlers = {
 * "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 * "list_builder" = "Drupal\approval_code\Entity\Controller\approvalCodeListBuilder",
 * "form" = {
 * "add" = "Drupal\approval_code\Form\approvalCodeForm",
 * "edit" = "Drupal\approval_code\Form\approvalCodeForm",
 * "delete" = "Drupal\approval_code\Form\approvalCodeDeleteForm",
 * },
 * "access" = "Drupal\approval_code\approvalCodeAccessControlHandler",
 * },
 * list_cache_contexts = { "user" },
 * base_table = "approval",
 * admin_permission = "administer approval_code entity",
 * entity_keys = {
 * "id" = "id",
 * "entity_type" = "entity_type",
 * "entity_id" = "entity_id",
 * "code" = "code",
 * "modified" = "modified",
 * "expired" = "expired",
 * "code_mobile" = "code_mobile",
 * "modified_mobile" = "modified_mobile",
 * "expired_mobile" = "expired_mobile",
 * },
 * links = {
 * "canonical" = "/admin/approval_code/{approval_code}",
 * "edit-form" = "/admin/approval_code/{approval_code}/edit",
 * "delete-form" = "/admin/approval_code/{approval_code}/delete",
 * "collection" = "/admin/approval_code/list"
 * },
 * )
 */
class approvalCode extends ContentEntityBase {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   *
   * Define the field properties here.
   *
   * Field name, type and size determine the table structure.
   *
   * In addition, we can define how the field and its content can be manipulated
   * in the GUI. The behaviour of the widgets used can be determined here.
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {

    // Standard field, used as unique if primary index.
    $fields['id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('ID'))
      ->setDescription(t('The ID of the Term entity.'))
      ->setReadOnly(TRUE);

    $fields['entity_type'] = BaseFieldDefinition::create('list_string')
      ->setLabel(t('Entity type'))
      ->setDescription(t('Entity type value.'))
      ->setRequired(TRUE)
      ->setSettings([
        'allowed_values' => [
          'node' => 'Node',
          'route' => 'Route',
        ],
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['entity_id'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Entity id'))
      ->setDescription(t('Please, start typing node title or route name.'))
      ->setRequired(TRUE)
      ->setSettings([
        'default_value' => '',
        'max_length' => 64,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['code'] = BaseFieldDefinition::create('string')
      ->setLabel(t('approval Code'))
      ->setDescription(t('approval code value.'))
      ->setRequired(TRUE)
      ->setSettings([
        'default_value' => '',
        'max_length' => 255,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['modified'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Modified date'))
      ->setDescription(t('Modified date value.'))
      ->setRequired(TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setSettings([
        'datetime_type' => 'date',
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['expired'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Expired date'))
      ->setDescription(t('Expired date value.'))
      ->setRequired(TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setSettings([
        'datetime_type' => 'date',
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['code_mobile'] = BaseFieldDefinition::create('string')
      ->setLabel(t('approval Code mobile'))
      ->setDescription(t('approval code mobile value.'))
      ->setSettings([
        'default_value' => '',
        'max_length' => 255,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['modified_mobile'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Modified mobile date'))
      ->setDescription(t('Modified mobile date value.'))
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setSettings([
        'datetime_type' => 'date',
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['expired_mobile'] = BaseFieldDefinition::create('datetime')
      ->setLabel(t('Expired mobile date'))
      ->setDescription(t('Expired mobile date value.'))
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'string',
        'weight' => -6,
      ])
      ->setSettings([
        'datetime_type' => 'date',
      ])
      ->setDisplayOptions('form', [
        'type' => 'string_textfield',
        'weight' => -6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    return $fields;
  }

}

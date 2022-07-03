<?php

namespace Drupal\approval_code\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'approval Code' Block.
 *
 * @Block(
 *   id = "approval_code",
 *   admin_label = @Translation("approval Code"),
 *   category = @Translation("Custom"),
 * )
 */
class approvalCodeBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $code = _approval_values_build()['approval_code'];

    if (!empty($mobile = _approval_values_build()['approval_code_mobile'])) {
      $markup = "<span class='mobile-only'>$mobile</span><span class='desktop-only'>$code</span>";
    }
    else {
      $markup = $code;
    }
    return [
      '#markup' => $markup,
      '#cache' => ['contexts' => ['url.path', 'url.query_args']],
    ];
  }

}

<?php

namespace Drupal\approval_code\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'approval Code Date' Block.
 *
 * @Block(
 *   id = "approval_code_date",
 *   admin_label = @Translation("approval Date"),
 *   category = @Translation("Custom"),
 * )
 */
class approvalCodeDate extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $date = date('F Y', strtotime(_approval_values_build()['approval_date']));

    if (!empty($mobile_date = _approval_values_build()['approval_date_mobile'])) {
      $formatted_mobile_date = date('F Y', strtotime($mobile_date));
      $markup = "<span class='mobile-only'>$formatted_mobile_date</span><span class='desktop-only'>$date</span>";
    }
    else {
      $markup = $date;
    }
    return [
      '#markup' => $markup,
      '#cache' => ['contexts' => ['url.path', 'url.query_args']],
    ];
  }

}

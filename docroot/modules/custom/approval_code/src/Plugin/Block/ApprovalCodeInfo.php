<?php

namespace Drupal\approval_code\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'approval Code Info' Block.
 *
 * @Block(
 *   id = "approval_code_info",
 *   admin_label = @Translation("approval Code Info"),
 *   category = @Translation("Custom"),
 * )
 */
class ApprovalCodeInfo extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    list($code, $date, $approval_code_mobile, $approval_date_mobile) = array_values(_approval_values_build());
    $date = date('F Y', strtotime($date));

    if (!empty($approval_code_mobile)) {
      $approval_code_markup = "<span class='mobile-only'>$approval_code_mobile</span><span class='desktop-only'>$code</span>";
    }
    else {
      $approval_code_markup = $code;
    }
    if (!empty($approval_date_mobile)) {
      $formatted_mobile_date = date('F Y', strtotime($approval_date_mobile));
      $approval_date_markup = "<span class='mobile-only'>$formatted_mobile_date</span><span class='desktop-only'>$date</span>";
    }
    else {
      $approval_date_markup = $date;
    }

    return [
      '#theme' => 'approval_code_info',
      '#approval_date_markup' => $approval_date_markup,
      '#approval_code_markup' => $approval_code_markup,
      '#cache' => ['contexts' => ['url.path', 'url.query_args']],
    ];
  }

}

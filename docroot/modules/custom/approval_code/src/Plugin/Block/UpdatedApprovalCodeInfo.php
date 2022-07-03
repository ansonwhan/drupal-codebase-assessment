<?php

namespace Drupal\approval_code\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Render\Markup;

/**
 * Provides a 'Updated approval Code Info' Block.
 *
 * @Block(
 *   id = "updated_approval_code_info_block",
 *   admin_label = @Translation("Updated approval Code Info"),
 *   category = @Translation("Custom"),
 * )
 */
class UpdatedapprovalCodeInfo extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    list($code, $date, $approval_code_mobile, $approval_date_mobile) = array_values(_approval_values_build());
    $date = date('F Y', strtotime($date));

    if (!empty($approval_code_mobile)) {
      $approval_code_markup_html =
        "<span class='mobile-only'>{$approval_code_mobile}</span><span class='desktop-only'>{$code}</span>";
      $approval_code_markup = Markup::create($approval_code_markup_html);
    }
    else {
      $approval_code_markup = $code;
    }
    if (!empty($approval_date_mobile)) {
      $formatted_mobile_date = date('F Y', strtotime($approval_date_mobile));
      $approval_date_markup_html =
        "<span class='mobile-only'>{$formatted_mobile_date}</span><span class='desktop-only'>{$date}</span>";
      $approval_date_markup = Markup::create($approval_date_markup_html);
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

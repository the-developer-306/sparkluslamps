<?php

defined( 'ABSPATH' ) || exit;

$text_align = is_rtl() ? 'right' : 'left';

echo wp_kses_post( $order_shipment_table );
?>
<h2>[Order #1234] (Jan 1, 2021)</h2>
<div style="margin-bottom:40px">
  <table class="td" cellspacing="0" cellpadding="6" border="1" style="width:100%">
    <thead>
    <tr>
      <th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>;">Product</th>
      <th class="td" scope="col" style="text-align:<?php echo esc_attr( $text_align ); ?>;">Quantity</th>
    </tr>
    </thead>
    <tbody>
    <tr class="order_item">
      <td class="td">T-shirt</td>
      <td class="td">3</td>
    </tr>
    <tr class="order_item">
      <td class="td">Shoe</td>
      <td class="td">1</td>
    </tr>
    <tr class="order_item">
      <td class="td">Pants</td>
      <td class="td">3</td>
    </tr>
    </tbody>
  </table>
</div><p>Thanks for shopping with us.</p>

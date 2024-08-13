<?php 
if ( ! is_user_logged_in() ) {
    return;
}

if ( ! defined( 'ABSPATH' ) ) exit;

global $wp;
$current_url = home_url( add_query_arg( array(), $wp->request ) );

$current_user = wp_get_current_user(); 
?>
<div class="cits-dashbord-area dashbord-simple-area">
	<p>Hello <?php echo esc_html( $current_user->display_name ); ?></p>
	<p>
	From your account dashboard you can view your <a href="<?php echo esc_url( $current_url.'/orders' ); ?>">recent orders</a>, manage your <a href="<?php echo esc_url( $current_url.'/edit-address' ); ?>">shipping and billing addresses</a>, and <a href="<?php echo esc_url( $current_url.'/edit-account' ); ?>">edit your password and account details</a>.</p>
	
</div>

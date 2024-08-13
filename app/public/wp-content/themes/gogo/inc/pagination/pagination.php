<?php
/**
 * Add a load more button to your page
 * @param string $context
 * @param string $text. (optional) Text to display on button.
 * @param int $paged. (optional) WP query var.
 * @return void
 */
if( ! function_exists( 'gogo_load_more_button' )){
function gogo_load_more_button( $context = 'default', $text = 'More Posts', $paged = 0 ){
  if ( empty( $paged ) ){
    $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1; 
  }
  $load_more = new Gogo_Load_More_Posts();
  $load_more->gogo_load_more_buttonn( $context, $text, $paged );
 }
}
if( !class_exists( 'Gogo_Load_More_Posts' ) ) :
/**
 * Load more button functionality  
 * Uses WP pagination
 */
class Gogo_Load_More_Posts{
  /**
   * Add hooks
   */
  public function __construct(){
    add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
    add_action( 'wp_ajax_gogo_load_more_posts', array( $this, 'gogo_load_more_posts' ) );
    add_action( 'wp_ajax_nopriv_gogo_load_more_posts', array( $this, 'gogo_load_more_posts' ) );
  }
  /**
   * Enqueue the necessary assets
   */
  public function enqueue_assets(){
    wp_enqueue_script( 'load-more-posts-js', get_parent_theme_file_uri() . '/inc/pagination/js/load-more-posts.js', array( 'jquery' ), '0.1', true );
 
     wp_localize_script( 'load-more-posts-js', 'loadmore', array( 'wp_ajax_url' => admin_url( 'admin-ajax.php' ) ) );
  }
  /**
   * Spit out the button html
   * @param $text. (optional) Text to display on button
   * @param $paged. (optional) WP query var
   * @return void
   */
  public function gogo_load_more_buttonn( $context, $text, $paged ){
    global $wp_query;
    // Lets recreate the current query within our ajax call
    wp_localize_script( 'load-more-posts-js', 'load_more_data', array( 'query' => $wp_query->query ) );
    wp_nonce_field( 'load-more-posts-nonce-' . esc_attr($context), 'load-more-posts-nonce' );
    echo '<div id="load-more-posts-error" class="load-more-posts-error error">' . esc_html__( 'No More Posts', 'gogo' ) . '</div>';
    echo '<div class="gogo-load-more"><button id="load-more-posts" class="load-more-posts-button" data-context="'.esc_attr($context).'" data-paged="'.esc_attr($paged).'" data-max-pages="'. esc_attr($wp_query->max_num_pages).'">'.esc_html($text).'</button><span class="inifiniteLoader"></span></div>';
  }
  /**
   * Ajax handler for load more posts
   */
  public function gogo_load_more_posts(){
    if ( empty( $_POST['nonce'] ) || empty( $_POST['paged'] ) || ! wp_verify_nonce( $_POST['nonce'], 'load-more-posts-nonce-'  . $_POST['context'] ) ) {
       exit;
    } else {
      global $post; // required by setup post data
      $context = ( ! empty( $_POST['context'] ) ) ? sanitize_text_field( $_POST['context'] ) : 'default';
      $args = (array) $_POST['query'];
      $args['paged'] = sanitize_text_field( $_POST['paged'] );
      // A filter if you want to customize the query
      $args = apply_filters( 'load-more-posts-args-' . sanitize_text_field( $_POST['context'] ), $args );
      $query = new WP_Query( $args );
      $posts = $query->get_posts();
      foreach( $posts as $post ){
        setup_postdata( $post );
        get_template_part( 'template-parts/content', $context );
        wp_reset_postdata();
      }
    }
    exit;
  }
}
new Gogo_Load_More_Posts();
endif;
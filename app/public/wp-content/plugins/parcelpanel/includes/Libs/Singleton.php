<?php

namespace ParcelPanel\Libs;

trait Singleton
{
    /**
     * The single instance of the class.
     *
     * @var static
     */
    protected static $instance = null;

    /**
     * Constructor
     *
     * @return void
     */
    protected function __construct()
    {

    }

    /**
     * Get class instance.
     *
     * @return static Instance.
     */
    final public static function instance( ...$args )
    {
        if ( null === static::$instance ) {
            static::$instance = new static( ...$args );
        }
        return static::$instance;
    }

    /**
     * Prevent cloning.
     */
    private function __clone()
    {
    }

    /**
     * Prevent unserializing.
     */
    final public function __wakeup()
    {
        wc_doing_it_wrong( __FUNCTION__, __( 'Unserializing instances of this class is forbidden.', 'woocommerce' ), '4.6' );
        die();
    }
}

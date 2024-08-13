<?php

namespace ParcelPanel\Libs;

class HooksTracker
{
    private static $hooks = [];

    public static function init_track_hooks( $callback = null )
    {
        add_action( 'all', [ self::class, 'track_hooks' ] );
        if ( $callback ) {
            add_action( 'shutdown', $callback, PHP_INT_MAX );
        }
    }

    static function track_hooks()
    {
        global $wp_filter;
        $filter = current_filter();
        if ( ! empty( $wp_filter[ $filter ] ) ) {
            foreach ( $wp_filter[ $filter ] as $priority => $tag_hooks ) {
                foreach ( $tag_hooks as $hook ) {
                    $func = '';
                    if ( is_array( $hook[ 'function' ] ) ) {
                        if ( is_object( $hook[ 'function' ][ 0 ] ) ) {
                            $func = get_class( $hook[ 'function' ][ 0 ] ) . '->' . $hook[ 'function' ][ 1 ];
                        } elseif ( is_string( $hook[ 'function' ][ 0 ] ) ) {
                            $func = "{$hook[ 'function' ][ 0 ]}::{$hook[ 'function' ][ 1 ]}";
                        }
                    } elseif ( $hook[ 'function' ] instanceof \Closure ) {
                        $func = 'a closure';
                    } elseif ( is_string( $hook[ 'function' ] ) ) {
                        $func = $hook[ 'function' ];
                    }

                    $key = "{$filter}-{$func}";
                    if ( ! array_key_exists( $key, self::$hooks ) ) {
                        $hook_obj                = self::$hooks[ $key ] = new \stdClass();
                        $hook_obj->filter        = $filter;
                        $hook_obj->func          = $func;
                        $hook_obj->priority      = $priority;
                        $hook_obj->trigger_times = 0;
                    } else {
                        $hook_obj = self::$hooks[ $key ];
                    }
                    $hook_obj->trigger_times += 1;
                }
            }
        }
    }

    public static function get_hooks(): array
    {
        return array_values( self::$hooks );
    }
}

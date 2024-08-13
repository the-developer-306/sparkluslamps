<?php

namespace ParcelPanel\Libs;

use ArrayAccess;
use Closure;

/**
 * From Illuminate\Support\Arr
 */
class ArrUtils {
    public static function get( $array, $key, $default = null ) {
        if ( ! self::accessible( $array ) ) {
            return self::value( $default );
        }

        if ( is_null( $key ) ) {
            return $array;
        }

        if ( self::exists( $array, $key ) ) {
            return $array[ $key ];
        }

        if ( strpos( $key, '.' ) === false ) {
            return $array[ $key ] ?? self::value( $default );
        }

        foreach ( explode( '.', $key ) as $segment ) {
            if ( self::accessible( $array ) && self::exists( $array, $segment ) ) {
                $array = $array[ $segment ];
            } else {
                return self::value( $default );
            }
        }

        return $array;
    }

    public static function accessible( $value ): bool {
        return is_array( $value ) || $value instanceof ArrayAccess;
    }

    public static function exists( $array, $key ): bool {
        if ( $array instanceof ArrayAccess ) {
            return $array->offsetExists( $key );
        }

        return array_key_exists( $key, $array );
    }

    public static function value( $value, ...$args ) {
        return $value instanceof Closure ? $value( ...$args ) : $value;
    }
}

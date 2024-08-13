<?php

namespace ParcelPanel\Api;

class ApiServer
{
    /**
     * Parse an RFC3339 datetime into a MySQl datetime
     *
     * Invalid dates default to unix epoch
     *
     * @param string $datetime RFC3339 datetime
     *
     * @return string MySQl datetime (YYYY-MM-DD HH:MM:SS)
     * @since 2.1
     */
    static function parse_datetime( $datetime ): string
    {

        // Strip millisecond precision (a full stop followed by one or more digits)
        if ( strpos( $datetime, '.' ) !== false ) {
            $datetime = preg_replace( '/\.\d+/', '', $datetime );
        }

        // default timezone to UTC
        $datetime = preg_replace( '/[+-]\d+:+\d+$/', '+00:00', $datetime );

        try {

            $datetime = new \DateTime( $datetime, new \DateTimeZone( 'UTC' ) );

        } catch ( \Exception $e ) {

            $datetime = new \DateTime( '@0' );

        }

        return $datetime->format( 'Y-m-d H:i:s' );
    }

    /**
     * Format a unix timestamp or MySQL datetime into an RFC3339 datetime
     *
     * @param int|string $timestamp unix timestamp or MySQL datetime
     * @param bool       $convert_to_utc
     *
     * @return string RFC3339 datetime
     */
    static function format_datetime( $timestamp, bool $convert_to_utc = false ): string
    {
        if ( $convert_to_utc ) {
            $timezone = new \DateTimeZone( wc_timezone_string() );
        } else {
            $timezone = new \DateTimeZone( 'UTC' );
        }

        try {

            if ( is_numeric( $timestamp ) ) {
                $date = new \DateTime( "@{$timestamp}" );
            } else {
                $date = new \DateTime( $timestamp, $timezone );
            }

            // convert to UTC by adjusting the time based on the offset of the site's timezone
            if ( $convert_to_utc ) {
                $date->modify( -1 * $date->getOffset() . ' seconds' );
            }
        } catch ( \Exception $e ) {

            $date = new \DateTime( '@0' );
        }

        return $date->format( 'Y-m-d\TH:i:s\Z' );
    }
}
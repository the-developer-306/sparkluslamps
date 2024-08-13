<?php

namespace ParcelPanel\Action;

use ParcelPanel\Libs\Singleton;
use ParcelPanel\ParcelPanelFunction;

class Upload
{
    use Singleton;

    /**
     * Handles the CSV upload and initial parsing of the file to prepare for
     * displaying author import options.
     */
    function csv_handler()
    {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            exit( 'You are not allowed' );
        }

        check_ajax_referer( 'pp-upload-csv' );

        if ( ! isset( $_FILES[ 'import' ] ) ) {
            (new ParcelPanelFunction)->parcelpanel_json_response( [], __( 'File is empty. Please upload something more substantial. This error could also be caused by uploads being disabled in your php.ini or by post_max_size being defined as smaller than upload_max_filesize in php.ini.', 'parcelpanel' ), false );
        }

        if ( ! wc_is_file_valid_csv( wc_clean( wp_unslash( $_FILES[ 'import' ][ 'name' ] ) ), false ) ) {
            (new ParcelPanelFunction)->parcelpanel_json_response( [], __( 'Invalid file type. The importer supports CSV and TXT file formats.', 'parcelpanel' ), false );
        }

        $overrides = [
            'test_form' => false,
            'mimes'     => self::get_valid_csv_filetypes(),
        ];

        $import = $_FILES[ 'import' ];  // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized,WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        $upload = wp_handle_upload( $import, $overrides );

        if ( isset( $upload[ 'error' ] ) ) {
            (new ParcelPanelFunction)->parcelpanel_json_response( [], $upload[ 'error' ], false );
        }

        // Construct the object array.
        $object = [
            'post_title'     => basename( $upload[ 'file' ] ),
            'post_content'   => $upload[ 'url' ],
            'post_mime_type' => $upload[ 'type' ],
            'guid'           => $upload[ 'url' ],
            'context'        => 'import',
            'post_status'    => 'private',
        ];

        // Save the data.
        $id = wp_insert_attachment( $object, $upload[ 'file' ] );

        /*
         * Schedule a cleanup for one day from now in case of failed
         * import or missing wp_import_cleanup() call.
         */
        wp_schedule_single_event( time() + DAY_IN_SECONDS, 'importer_scheduled_cleanup', [ $id ] );

        (new ParcelPanelFunction)->parcelpanel_json_response( [
            'id'   => $id,
            'file' => $upload[ 'file' ],
        ] );
    }

    /**
     * Get all the valid filetypes for a CSV file.
     *
     * @return array
     */
    protected static function get_valid_csv_filetypes(): array
    {
        return [
            'csv' => 'text/csv',
            'txt' => 'text/plain',
        ];
    }
}

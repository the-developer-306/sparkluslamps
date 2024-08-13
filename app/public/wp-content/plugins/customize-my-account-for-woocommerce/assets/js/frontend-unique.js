var $laz = jQuery.noConflict();
(function( $laz ) {
    'use strict';

    $laz(function() {

        $laz("li.wcmamtx_menu").hover(
          function () {
            $laz(this).addClass("current-dropdown");
        },
        function () {
            $laz(this).removeClass("current-dropdown");
        }
        );

    });
})( jQuery );
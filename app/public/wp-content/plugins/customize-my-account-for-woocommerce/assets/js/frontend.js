var $vas = jQuery.noConflict();
(function( $vas ) {
    'use strict';

    $vas(function() {
        
      $vas(".wcmamtx_group").on('click',function(event) {
          event.preventDefault();

          var parentli = $vas(this).parents("li");

          if (parentli.hasClass("open")) {
             parentli.find("ul.wcmamtx_sub_level").hide();
             parentli.removeClass("open");
             parentli.addClass("closed");
             parentli.find("i.wcmamtx_group_fa").removeClass("fa-chevron-up").addClass("fa-chevron-down");

          } else if (parentli.hasClass("closed")) {

             $vas("li.wcmamtx_group2.open").find("ul.wcmamtx_sub_level").hide();
             $vas("li.wcmamtx_group2.open").find('.wcmamtx_group_fa').removeClass("fa-chevron-up").addClass("fa-chevron-down");
             $vas("li.wcmamtx_group2.open").removeClass("open").addClass("closed");
             


             parentli.find("ul.wcmamtx_sub_level").show();
             parentli.removeClass("closed");
             parentli.addClass("open");

             parentli.find("i.wcmamtx_group_fa").removeClass("fa-chevron-down").addClass("fa-chevron-up");
          }

          return false;
          
      });

        $vas(".wcmamtx_group_sub").on('click',function(event) {
          event.preventDefault();

          var parentli = $vas(this).parents("li");

          if (parentli.hasClass("open")) {
             parentli.find("ul.wcmamtx_sub_level").hide();
             parentli.removeClass("open");
             parentli.addClass("closed");
             parentli.find("i.wcmamtx_group_fa").removeClass("fa-chevron-up").addClass("fa-chevron-down");

          } else if (parentli.hasClass("closed")) {

             $vas("li.wcmamtx_group2_sub.open").find("ul.wcmamtx_sub_level").hide();
             $vas("li.wcmamtx_group2_sub.open").find('.wcmamtx_group_fa').removeClass("fa-chevron-up").addClass("fa-chevron-down");
             $vas("li.wcmamtx_group2_sub.open").removeClass("open").addClass("closed");
             


             parentli.find("ul.wcmamtx_sub_level").show();
             parentli.removeClass("closed");
             parentli.addClass("open");

             parentli.find("i.wcmamtx_group_fa").removeClass("fa-chevron-down").addClass("fa-chevron-up");
          }

          return false;
          
      });
        
    });

 
})( jQuery );
var $var = jQuery.noConflict();
(function( $var ) {
    'use strict';


    ( function( $var, undefined ) {

        $var.widget( "ab.accordion", $var.ui.accordion, {

        options: {
            sortable: false,
            handle:"",
            connectWith:""
        },

        _create: function () {

            this._super( "_create" );

            if ( !this.options.sortable ) {
                return;
            }

            if ( !this.options.handle ) {
                return;
            }

            this.headers.each( function() {
                $var( this ).next()
                     .addBack()
                     .wrapAll( "<div/>" );


            });

            this.element.sortable({
                handle: this.options.handle,
                connectWith: this.options.connectWith,
                cursor: "move",
                placeholder: "dashed-placeholder",
                stop: function( event, ui ) {

                    var $element = ui.item;
                    var $new_parent = $element.parents('li');
                    

                    if (($element.hasClass("group")) && ($new_parent.hasClass("group"))) {
                        alert(wcmamtxadmin.group_mixing_text);
                        

                        return false;
                    }

                    
                     

                    if ($new_parent.hasClass('group')) {
                        $element.find('.wcmamtx_parent_field').val($new_parent.attr("keyvalue"));
                    } else {
                        $element.find('.wcmamtx_parent_field').val("none");
                    }






                    ui.item.children( this.options.handle )
                       .triggerHandler( "focusout" );
                }
            });  

            this.element.accordion({
                 collapsible:true,
                 active:false,
                 clearStyle: true,
                 heightStyle: "content"
                
            }).show();

                  

        },

        _destroy: function () {

            if ( !this.options.sortable ) {
                this._super( "_destroy" );
                return;
            }

            this.element.sortable( "destroy" );

            this.headers.each( function () {
                $var( this ).unwrap( "<div/>" );
            });

        this._super( "_destroy" );

        }

      });

})( jQuery );

$var( function() {



    $var(".wcmamtx-accordion").accordion( { 
        sortable: true, 
        handle:"h3",
        connectWith:".wcmamtx_group_items"
       
    });

    


    $var(".wcmamtx_group_items").accordion( { 
        sortable: true, 
        handle:"h3",
        connectWith:".wcmamtx-accordion"
       
    });


    $var(".wcmamtx-accordion").find('.wcmamtx_accordion_onoff,.wcmamtx_accordion_remove').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(function() {
          this.checked = !this.checked;
      }.bind(this), 100);
    });

    
    $var(".wcmamtx_accordion_remove").on('click',function() {
        var parentkey = $var(this).attr("parentkey");
        if (!confirm(wcmamtxadmin.endpoint_remove_alert)){
          return false;
        }

        var parentitem = "li."+parentkey;
        var litype     = $var(parentitem).attr("litype");

        
        if (litype == "group") {

            var coreli = $var(parentitem).find("li.wcmamtx_endpoint.core").length;

            if (coreli == 0) {
                $var(parentitem).fadeOut('slow').remove();
            } else {
                alert(wcmamtxadmin.core_remove_alert);
            }
            
        } else {
            $var(parentitem).fadeOut('slow').remove();
        }
        
        
    });


    $var(".wcmamtx_dismiss_renew_notice").on('click',function(event) {
        
        event.preventDefault();

        $var(".wcmamtx_notice_div").remove();

        $var.ajax({
                data: {action: "wcmamtx_dismiss_renew_notice"  },
                type: 'POST',
                url: wcmamtxadmin.ajax_url,
                success: function( response ) { 
                    
                }
        });

        return false;

    });




    $var(".wcmamtx_load_elementor_template").select2({
           ajax: {
                url: wcmamtxadmin.ajax_url, // AJAX URL is predefined in WordPress admin
                dataType: 'json',
                delay: 250, // delay in ms while typing when to perform a AJAX search
                data: function (params) {
                    return {
                        q: params.term, // search query
                        action: 'get_elementor_templates' // AJAX action for admin-ajax.php
                    };
                },
                processResults: function( data ) {

                console.log(data);
                var options = [];
                if ( data ) {
 
                    // data is the array of arrays, and each of them contains ID and the Label of the option
                    $var.each( data, function( index, text ) { // do not forget that "index" is just auto incremented value
                        options.push( { id: text[0], text: text[1]  } );
                    });

                    options.push( { id: 'default', text: "Default"  } );
 
                }
                return {
                    results: options
                };
            },
            cache: true
           },allowClear: true,
           placeholder: wcmamtxadmin.chose_template,
             minimumInputLength: 3 ,
             width: "200px"// the minimum of symbols to input before perform a search
    });

    $var('.wcmamtx_accordion_onoff').click(function() {

        var parentkey = $var(this).attr("parentkey");
        
        if ($var(this).is(":checked")) {
            $var(this).parents("li."+ parentkey +"").removeClass('wcmamtx_disabled');
            $var("."+ parentkey +"_hidden_checkbox").val("yes");

        } else {
            
            $var(this).parents("li."+ parentkey +"").addClass('wcmamtx_disabled');
            $var("."+ parentkey +"_hidden_checkbox").val("no");
            
        }
    });


    $var('.show_hide_next_tr_checkbox').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var(this).closest('tr').next('tr').show();
        } else {
            $var(this).closest('tr').next('tr').hide();
        }
    });

    $var('.wcmamtx_show_nav_header_widget').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var('tr.nav_header_widget_tr').show();
        } else {
            $var('tr.nav_header_widget_tr').hide();
        }
    });

    
    


});

$var( function() {


    $var(".wcmamtx_class_input").tagEditor({
      delimiter: ', ', /* space and comma */
      placeholder: wcmamtxadmin.classplaceholder
    });

    $var("#wcmamtx_reset_tabs_button").on('click',function() {
        var result = confirm(wcmamtxadmin.restorealert);
        
        if (result == true) {
     
            $var.ajax({
                data: {action: "restore_my_account_tabs" ,nonce:wcmamtxadmin.nonce },
                type: 'POST',
                url: wcmamtxadmin.ajax_url,
                success: function( response ) { 
                     window.location.reload();
                }
            });
        }
    });


    $var("#wcmamtx_reset_order_button").on('click',function() {
        var result = confirm(wcmamtxadmin.restorealert);
        
        if (result == true) {
     
            $var.ajax({
                data: {action: "restore_my_account_order",nonce:wcmamtxadmin.nonce },
                type: 'POST',
                url: wcmamtxadmin.ajax_url,
                success: function( response ) { 
                     window.location.reload();
                }
            });
        }
    });

    
    $var('.wcmamtx_show_avatar_checkbox').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var(".wcmamtx_avatar_size_tr").show();
        } else {
            $var(".wcmamtx_avatar_size_tr").hide();
        }
    });

    $var('.override_endpoint_tr_checkbox').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var(".override_endpoint_tr").show();
        } else {
            $var(".override_endpoint_tr").hide();
        }
    });


    $var('.override_myaccount_tr_checkbox').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var(".override_myaccount_tr").show();
        } else {
            $var(".override_myaccount_tr").hide();
        }
    });


    $var('.override_cart_tr_checkbox').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var(".override_cart_tr").show();
        } else {
            $var(".override_cart_tr").hide();
        }
    });


    $var('.override_checkout_tr_checkbox').on("change",function() {
               
        if($var(this).prop("checked")) {
            $var(".override_checkout_tr").show();
        } else {
            $var(".override_checkout_tr").hide();
        }
    });


    function wcmamtx_sanitize(string) {
        const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match)=>(map[match]));
    }



    $var(".wcmamtx_new_template").on("click",function(event) {
               
        event.preventDefault();

        var evalue = $var("#wcmamtx_modal_label").val();

        if (evalue == "") {
            
            $var('.wcmamtx_enter_label_alert').html('');
            $var('<p>'+wcmamtxadmin.empty_label_notice+'</p>').appendTo('.wcmamtx_enter_label_alert');
            $var('.wcmamtx_enter_label_alert').show();
            setTimeout(function() {
                $var('.wcmamtx_enter_label_alert').hide();
                $var('.wcmamtx_enter_label_alert').html('');
            }, 2000);
        
        } else {

            var etype = $var('#wcmamtx_hidden_endpoint_type').val();
            var replacetxt = ''+wcmamtxadmin.wait_text+'';
            $var('.wcmamtx_new_end_point').text(replacetxt);
            

            $var.ajax({
                data: {
                    action    : "wcmamtxadmin_add_new_template",
                    row_type  : wcmamtx_sanitize(etype),
                    new_row   : wcmamtx_sanitize(evalue),
                    security  : wcmamtxadmin.nonce,
                    nonce     : $var('#wcmamtx_hidden_endpoint_type').attr("nonce")
                    
                },
                type: 'POST',
                url: wcmamtxadmin.ajax_url,
                success: function( response ) { 
                    var tresponse = JSON.parse(response);
                    $var('#wcmamtx_example_modal').modal('toggle');

                    var $newOption = $var("<option selected='selected'></option>").val(tresponse["id"]).text(tresponse["text"])
 
                    $var('select.'+etype+'').append($newOption).trigger('change');

                    $var('.wcmamtx_submit_button').trigger("click");
                    
                    window.open(tresponse["redirect_url"], '_blank');
                }
            });
    
               
            

        }

        return false;

    });


    $var("select.wcmamtx_value_select").on("change",function(event) {
               
        event.preventDefault();

        var evalue = $var(this).val();

        if (evalue == "customkey") {
            
            $var("tr.wcmamtx_customkey_tr").show();
        
        } else {

            
            $var("tr.wcmamtx_customkey_tr").hide();
    
       

        }

        return false;

    });








    const capitalize = (s) => {
      if (typeof s !== 'string') return ''
          return s.charAt(0).toUpperCase() + s.slice(1)
    }


    $var('#wcmamtx_example_modal,#wcmamtx_example_modal2,#wcmamtx_example_modal3').on('show.bs.modal', function (event) {
        var button = $var(event.relatedTarget) // Button that triggered the modal
        var etype = button.data('etype') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $var(this)
        modal.find('.wcmamtx_new_end_point').text("Add New "+ capitalize(etype) +"");
        modal.find('#wcmamtx_hidden_endpoint_type').val(etype);
        
        
    });



    



    $var(".wcmamtx_icon_source_radio").on("click", function (event) {
        
        var checkvalue = $var(this).val();
        
        if (checkvalue == "custom") {
            $var("tr.fa_icon_tr").show();
            $var("tr.show_dashicon_tr").hide();
            $var("tr.show_upload_tr").hide();

        } else if (checkvalue == "dashicon") {
            $var("tr.fa_icon_tr").hide();
            $var("tr.show_dashicon_tr").show();
            $var("tr.show_upload_tr").hide();

        } else if (checkvalue == "upload") {

            $var("tr.show_upload_tr").show();

             $var("tr.fa_icon_tr").hide();
            $var("tr.show_dashicon_tr").hide();

        } else {
            $var("tr.fa_icon_tr").hide();
            $var("tr.show_dashicon_tr").hide();
            $var("tr.show_upload_tr").hide();
        }
        
    });

    


    $var('.wcmamtxvisibleto').on('change',function(event){
        event.preventDefault();
        var dval = $var(this).val();

        var mkey = $var(this).attr("mkey");

        if ((dval == "specific") || (dval == "specific_exclude")) {
            $var('.wcmamtxroles_'+mkey+'').show();
            $var('.wcmamtxusers_'+mkey+'').hide();
        } else if ((dval == "specific_user") || (dval == "specific_exclude_user")) {
            $var('.wcmamtxroles_'+mkey+'').hide();
            $var('.wcmamtxusers_'+mkey+'').show();
        } else {
            $var('.wcmamtxroles_'+mkey+'').hide();
            $var('.wcmamtxusers_'+mkey+'').hide();
        }


        
        return false;
    });



    //loads Media upload for each media upload input
    $var(".image-upload-div").each(function(){
            var parentId = $var(this).closest('div').attr('idval');
                 // Only show the "remove image" button when needed
                 var srcvalue    = $var('.facility_thumbnail_id_' + parentId + '').val();

                 if ( !srcvalue ){
                    jQuery('.remove_image_button_' + parentId + ' ').hide();
                 }  
                // Uploading files
                var file_frame;

                jQuery(document).on( 'click', '.upload_image_button_' + parentId + ' ', function( event ){


                    event.preventDefault();

                    // If the media frame already exists, reopen it.
                    if ( file_frame ) {
                        file_frame.open();
                        return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.downloadable_file = wp.media({
                        title: wcmamtxadmin.uploadimage,
                        button: {
                            text: wcmamtxadmin.useimage,
                        },
                        multiple: false
                    });

                    // When an image is selected, run a callback.
                    file_frame.on( 'select', function() {
                        var attachment = file_frame.state().get('selection').first().toJSON();

                        jQuery('.facility_thumbnail_id_' + parentId + '').val( attachment.id );
                        jQuery('#facility_thumbnail_' + parentId + ' img').attr('src', attachment.url );
                        jQuery('.imagediv_' + parentId + ' img').attr('src', attachment.url );
                        jQuery('.remove_image_button_' + parentId + '').show();
                        jQuery('.wcva_imgsrc_sub_header_' + parentId + '').attr('src', attachment.url );
                    });

                    // Finally, open the modal.
                    file_frame.open();
                });

                jQuery(document).on( 'click', '.remove_image_button_' + parentId + '', function( event ){

                    jQuery('#facility_thumbnail_' + parentId + ' img').attr('src', wcmamtxadmin.placeholder );
                    jQuery('.imagediv_' + parentId + ' img').attr('src', '');
                    jQuery('.facility_thumbnail_id_' + parentId + '').val('');
                    jQuery('.remove_image_button_' + parentId + '').hide();
                    jQuery('.wcva_imgsrc_sub_header_' + parentId + '').attr('src', wcmamtxadmin.placeholder );
                    return false;
                });

     });     


    $var('.wcmamtx_roleselect').select2({
        width:"400px",
        minimumResultsForSearch: -1
    });

    

    $var('.wcmamtx_userselect').select2({

        ajax: {
                url: wcmamtxadmin.ajax_url, // AJAX URL is predefined in WordPress admin
                dataType: 'json',
                delay: 250, // delay in ms while typing when to perform a AJAX search
                data: function (params) {
                    return {
                        q: params.term, // search query
                        action: 'wcmamtxadmin_get_users_ajax' // AJAX action for admin-ajax.php
                    };
                },
                processResults: function( data ) {
                    var options = [];
                    if ( data ) {

                    

                    // data is the array of arrays, and each of them contains ID and the Label of the option
                    $var.each( data, function( index, text ) { // do not forget that "index" is just auto incremented value
                        options.push( { id: text[0], text: text[1]  } );
                    });

                }
                return {
                    results: options
                };
            },
            cache: true
        },
        minimumInputLength: 2 ,
        minimumResultsForSearch: -1,
        width: "300px"// the minimum of symbols to input before perform a search
    });


    var icons = [  { icon: 'fa fa-search' }, 
    { icon: 'fa fa-envelope-o' }, 
    { icon: 'fa fa-star' }, 
    { icon: 'fa fa-user' }, 
    { icon: 'fa fa-th-list' }, 
    { icon: 'fa fa-check' }, 
    { icon: 'fa fa-times' }, 
    { icon: 'fa fa-search-plus' }, 
    { icon: 'fa fa-search-minus' }, 
    { icon: 'fa fa-power-off' }, 
    { icon: 'fa fa-signal' }, 
    { icon: 'fa fa-cog' }, 
    { icon: 'fa fa-trash-o' }, 
    { icon: 'fa fa-home' }, 
    { icon: 'fa fa-file-o' }, 
    { icon: 'fa fa-clock-o' }, 
    { icon: 'fa fa-road' }, 
    { icon: 'fa fa-download' }, 
    { icon: 'fa fa-arrow-circle-o-down' }, 
    { icon: 'fa fa-arrow-circle-o-up' }, 
    { icon: 'fa fa-inbox' }, 
    { icon: 'fa fa-play-circle-o' },  
    { icon: 'fa fa-list-alt' }, 
    { icon: 'fa fa-qrcode' }, 
    { icon: 'fa fa-barcode' }, 
    { icon: 'fa fa-tag' }, 
    { icon: 'fa fa-tags' }, 
    { icon: 'fa fa-book' }, 
    { icon: 'fa fa-bookmark' }, 
    { icon: 'fa fa-print' }, 
    { icon: 'fa fa-camera' },  
    { icon: 'fa fa-list' }, 
    { icon: 'fa fa-adjust' }, 
    { icon: 'fa fa-tint' }, 
    { icon: 'fa fa-plus-circle' }, 
    { icon: 'fa fa-minus-circle' }, 
    { icon: 'fa fa-times-circle' }, 
    { icon: 'fa fa-check-circle' }, 
    { icon: 'fa fa-question-circle' }, 
    { icon: 'fa fa-info-circle' }, 
    { icon: 'fa fa-crosshairs' }, 
    { icon: 'fa fa-times-circle-o' }, 
    { icon: 'fa fa-check-circle-o' }, 
    { icon: 'fa fa-plus' }, 
    { icon: 'fa fa-minus' },  
    { icon: 'fa fa-eye' }, 
    { icon: 'fa fa-eye-slash' }, 
    { icon: 'fa fa-exclamation-triangle' }, 
    { icon: 'fa fa-chevron-down' },  
    { icon: 'fa fa-shopping-cart' }, 
    { icon: 'fa fa-folder' }, 
    { icon: 'fa fa-folder-open' }, 
    { icon: 'fa fa-arrows-v' }, 
    { icon: 'fa fa-arrows-h' }, 
    { icon: 'fa fa-bar-chart' }, 
    { icon: 'fa fa-twitter-square' }, 
    { icon: 'fa fa-star-half' }, 
    { icon: 'fa fa-heart-o' }, 
    { icon: 'fa fa-sign-out' },  
    { icon: 'fa fa-briefcase' }, 
    { icon: 'fa fa-arrows-alt' }, 
    { icon: 'fa fa-users' }, 
    { icon: 'fa fa-link' }, 
    { icon: 'fa fa-cloud' }, 
    { icon: 'fa fa-files-o' },  
    { icon: 'fa fa-square' }, 
    { icon: 'fa fa-bars' }, 
    { icon: 'fa fa-list-ul' }, 
    { icon: 'fa fa-list-ol' }, 
    { icon: 'fa fa-envelope' }, 
    { icon: 'fa fa-check-square' }, 
    { icon: 'fa fa-pencil-square' }, 
    { icon: 'fa fa-external-link-square' }, 
    { icon: 'fa fa-share-square' }, 
    { icon: 'fa fa-trash' }, 
    { icon: 'fa fa-whatsapp' }, 
    { icon: 'fa fa-server' }, 
    { icon: 'fa fa-user-plus' }]; 


    var itemTemplate = $var('.icon-picker-list').clone(true).html();

    $var('.icon-picker-list').html('');

    // Loop through JSON and appends content to show icons
    $var(icons).each(function(index) {
        var itemtemp = itemTemplate;
        var item = icons[index].icon;

        if (index == selectedIcon) {
            var activeState = 'active'
        } else {
            var activeState = ''
        }

        itemtemp = itemtemp.replace(/{{item}}/g, item).replace(/{{index}}/g, index).replace(/{{activeState}}/g, activeState);
    
        $var('.icon-picker-list').append(itemtemp);
    });

    // Variable that's passed around for active states of icons
    var selectedIcon = null;

    $var('.icon-class-input').each(function() {
        if ($var(this).val() != null) {
            $var(this).siblings('.demo-icon').addClass($var(this).val());
        }
    });

    // To be set to which input needs updating
    var iconInput = null;

    // Click function to set which input is being used
    $var('.picker-button').click(function() {
        // Sets var to which input is being updated
        iconInput = $var(this).siblings('.icon-class-input');
        // Shows Bootstrap Modal
        $var('#iconPicker').modal('show');
        // Sets active state by looping through the list with the previous class from the picker input
        selectedIcon = findInObject(icons, 'icon', $var(this).siblings('.icon-class-input').val());
        // Removes any previous active class
        $var('.icon-picker-list a').removeClass('active');
        // Sets active class
        $var('.icon-picker-list a').eq(selectedIcon).addClass('active');
    });

    // Click function to select icon
    $var(document).on('click', '.icon-picker-list a', function() {
        // Sets selected icon
        selectedIcon = $var(this).data('index');

        // Removes any previous active class
        $var('.icon-picker-list a').removeClass('active');
        // Sets active class
        $var('.icon-picker-list a').eq(selectedIcon).addClass('active');
    });

    // Update icon input
    $var('#change-icon').click(function() {
        iconInput.val(icons[selectedIcon].icon);
        iconInput.siblings('.demo-icon').attr('class', 'demo-icon');
        iconInput.siblings('.demo-icon').addClass(icons[selectedIcon].icon);
        $var('#iconPicker').modal('hide');
        
    });

    $var(".wcmamtx_activate_license").on('click',function(event) {

         event.preventDefault();

         var licensekey = $var(".wcmamtx_license_key_input").val();

         $var.ajax({
            data: {
                action    : "wcmamtx_activate_license",
                licensekey  : licensekey

            },
            type: 'POST',
            url: wcmamtxadmin.ajax_url,
            success: function( response ) { 
                console.log(response);
                window.location.reload();
            }
        });

         return false;

     });



    function findInObject(object, property, value) {
        for (var i = 0; i < object.length; i += 1) {
            if (object[i][property] === value) {
                return i;
            }
        }
    }


});
 
})( jQuery );
jQuery(function () {
    function set_trackingmore_tracking_provider(selected_couriers) {
        var couriers = sort_couriers(get_couriers());


        jQuery.each(couriers, function (key, courier) {
            var str = '<option ';
            str += 'value="' + courier['slug'] + '" ';
            if (selected_couriers.hasOwnProperty(courier['slug'])) {
                str += 'selected="selected"';
            }
            str += '>' + courier['name'] + '</option>';
            jQuery('#couriers_select').append(str);
        });

        jQuery('#couriers_select').val(selected_couriers);
        jQuery('#couriers_select').chosen();
	    jQuery('#couriers_select').trigger('chosen:updated');
    }

    function set_track_message_demo(){
        var html = jQuery('#track_message_1').val();
        var track_message_demo_1 = '';
        if(html != null && html != '' && html.toLowerCase().indexOf("ups") == -1) {
            track_message_demo_1 = 
            html + 'UPS' +
                '<br/>'+
            jQuery('#track_message_2').val() + '1Z97518A0341174525';
        } else {
            track_message_demo_1 = 
            html +
                '<br/>'+
            jQuery('#track_message_2').val();
        }
        jQuery('#track_message_demo_1').html(
            track_message_demo_1
        );
    }

    jQuery('#couriers_select').change(function () {
        var couriers_select = jQuery('#couriers_select').val();
        var value = (couriers_select) ? couriers_select.join(',') : '';
        jQuery('#couriers').val(value);
    });

    jQuery('#plugin').change(function () {
        if (jQuery(this).val() == 'trackingmore') {
            jQuery('#couriers').parent().parent().show();
            jQuery('#track_message_demo_1').parent().parent().show();
        } else {
            jQuery('#couriers').parent().parent().hide();
            jQuery('#track_message_demo_1').parent().parent().hide();
        }
    });

    if (jQuery('#couriers')) {
        var couriers_select = jQuery('#couriers').val();
        var couriers_select_array = (couriers_select) ? couriers_select.split(',') : [];
        set_trackingmore_tracking_provider(couriers_select_array);

        if (jQuery('#plugin').val() != 'trackingmore') {
            jQuery('#couriers').parent().parent().hide();
        }
    }

    if (jQuery('#track_message_demo_1')) {
        set_track_message_demo();

        if (jQuery('#plugin').val() != 'trackingmore') {
            jQuery('#track_message_demo_1').parent().parent().hide();
        }
    }

    jQuery('#track_message_1').keyup(function () {
        set_track_message_demo();
    });

    jQuery('#track_message_2').keyup(function () {
        set_track_message_demo();
    });
});
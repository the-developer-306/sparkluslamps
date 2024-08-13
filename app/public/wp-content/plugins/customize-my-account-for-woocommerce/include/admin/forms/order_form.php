<?php 
$advancedsettings  = (array) get_option('wcmamtx_order_settings');  
$tabs              = wcmamtx_get_account_order_items();
$core_fields       = 'order-number,order-date,order-status,order-total,order-actions';

$core_fields_array =  array(
                         'order-number'=> esc_html__( 'Order', 'woocommerce' ),
                         'order-date'=> esc_html__( 'Date', 'woocommerce' ),
                         'order-status'=> esc_html__( 'Status', 'woocommerce' ),
                         'order-total'=>esc_html__( 'Total', 'woocommerce' ),
                         'order-actions'=>'&nbsp;',
                      );

if ((sizeof($advancedsettings) != 1)) {

  foreach ($tabs as $ikey=>$ivalue) {

    $match = wcmtxka_find_string_match($ikey,$advancedsettings);

    if (!array_key_exists($ikey, $advancedsettings) && !array_key_exists($ikey, $core_fields_array) && ($match == "notfound")) {

      

      $advancedsettings[$ikey] = array(
        'show' => 'yes',
        'third_party' => 'yes',
        'endpoint_key' => $ikey,
        'wcmamtx_type' => 'endpoint',
        'parent'       => 'none',
        'endpoint_name'=> $ivalue,
      );           

    }
  }

}
      


      

      if (!isset($advancedsettings) || (sizeof($advancedsettings) == 1)) {
        ?>
        <ol class="accordion wcmamtx-accordion" style="display:none;">
            <?php
                $rownum = 0;
                foreach ($tabs as $key=>$value) {

                    if (preg_match('/\b'.$key.'\b/', $core_fields )) { 

                        $third_party = null;

                    } else {

                        $third_party = 'yes';

                    }

                    
                    
                    $this->get_order_content($key,$value,$core_fields,$value,null,$third_party); 
                    $rownum++;

                }
        ?>
        </ol><?php
      
      } else {

        ?>
        <ol class="accordion wcmamtx-accordion" style="display:none;">
            <?php
                $rownum = 0;
                foreach ($advancedsettings as $key=>$value) {

                    

                    $name = isset($value['endpoint_name']) ? $value['endpoint_name'] : "";

                    $third_party = isset($value['third_party']) ? $value['third_party'] : null;



                    if (isset($value['parent']) && ($value['parent'] == "none")) {

                        $this->get_order_content($key,$name,$core_fields,$value,null,$third_party);
                    } 
                
                    $rownum++;

                }
        ?></ol><?php
      }
    ?>
        <script>
            var wmthash=<?php echo $rownum; ?>;
        </script>
        <div id="iconPicker" class="modal fade">
              <div class="modal-dialog">
                    <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                  <h4 class="modal-title"><?php  echo esc_html__('Icon Picker','customize-my-account-for-woocommerce'); ?></h4>
                          </div>
                          <div class="modal-body">
                              <div>
                                  <ul class="icon-picker-list">
                                    <li>
                                      <a data-class="{{item}} {{activeState}}" data-index="{{index}}">
                                        <span class="{{item}}"></span>
                                         <span class="name-class">{{item}}</span>
                                      </a>
                                    </li>
                                  </ul>
                              </div>
                          </div>
                          <div class="modal-footer">
                                <button type="button" id="change-icon" class="btn btn-success">
                                  <span class="fa fa-check-circle-o"></span>
                                  <?php  echo esc_html__('Use Selected Icon','customize-my-account-for-woocommerce'); ?>
                                </button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                          </div>
                    </div>
              </div>
        </div>
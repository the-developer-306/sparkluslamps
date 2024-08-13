(($) => {
    $(() => {
        const CSV_IMPORT_ERROR_RETRY_NUM = 5

        // const $tracking_save_nonce = $('#pp-tk-tracking-save-nonce')
        //   , $tracking_form = $('#pp-tk-tracking-form')
        //   , $select_courier = $('#pp-tk-slc-courier')
        //   , $tracking_number = $('#pp-tk-ipt-tracking-number')
        //   , $fulfilled_date = $('#pp-tk-ipt-fulfilled-date')
        //   , $tracking_id = $('#pp-tk-tracking-id')
        const $btn_show_form = $('#pp-tk-btn-show-form')

            , $modal_import = $('#pp-mdl-import')
            , $modal_back = $modal_import.find('.back')

            // 文件导入面板
            , $panel_upload = $('#pp-pnl-upload')

            // 文件导入进度条
            , $progress_upload = $('#pp-upload-progress')
            , $progress_upload_percent = $progress_upload.find('.percent')
            , $progress_upload_bar = $progress_upload.find('.progress-bar')

            // 历史记录
            , $box_import_records = $panel_upload.find('.box-import-records')
            , $list_records = $panel_upload.find('.lst-records')

            // 导入记录详情面板
            , $panel_record_detail = $('#pp-pnl-record-detail')
            // 历史导入记录
            , $panel_record_detail_filename = $panel_record_detail.find('.filename')
            , $panel_record_detail_total = $panel_record_detail.find('.total')
            , $panel_record_detail_succeeded = $panel_record_detail.find('.succeeded')
            , $panel_record_detail_failed = $panel_record_detail.find('.failed')
            , $panel_record_detail_details = $panel_record_detail.find('.details')

            // 文件上传框
            , $input_file_wrapper = $panel_upload.find('.pp-ipt-upload-wrapper')
            , $input_csv_file = $('#pp-ipt-upload-file')

            // Close, Import 按钮
            , $import_modal_close = $modal_import.find('.modal-close')
            , $import_modal_button_import = $modal_import.find('.btn-import')

        // Add buttons to shop order screen.
        let $shop_order_screen = $('.edit-php.post-type-shop_order')
            , $title_action = $shop_order_screen.find('.page-title-action:first')
        let check_new = $('body').hasClass("woocommerce_page_wc-orders")
        if (check_new) {
            $shop_order_screen = $('.woocommerce_page_wc-orders')
            $title_action = $shop_order_screen.find('.page-title-action:first')
        }

        let import_record_list = []

        let is_uploading = false  // 上传状态

        let csv_import_error_num = 0

        // 插入 导入文件 按钮
        const check_show_import = window.parcelpanel_admin_wc_meta_boxes.import_type === "shop_order" || (window.parcelpanel_admin_wc_meta_boxes.import_type === "shop_order_hpos" && !window.parcelpanel_admin_wc_meta_boxes.post_id)
        if (check_show_import) {
            // 插入 导入文件 按钮
            $('<a/>', {
                class: 'page-title-action',
                href: parcelpanel_admin.urls.import_tracking_number,
                text: parcelpanel_admin.strings.import_tracking_number
            }).insertAfter($title_action)
        }

        // $select_courier.select2()


        // 数字输入组件
        const number_input_component = (v) => {
            return `<div class="pp-number-input"><input max="${v.max_value}" data-item-id="${v.id}" value="${v.value}" autocomplete="off" ${v.is_editable ? '' : 'disabled'} min="0" type="number" class="pp-number-input-input item-quantity" data-v-ubw820r6><div class="pp-number-input-suffix">of ${v.max_value}</div></div>`
// 自定义按钮
//           return `<div>
// <input type="number" min="0" max="100" value="100">
// <div>of 100</div>
// <div>
// <div onclick="this.parentNode.parentNode.querySelector('input[type=number]').stepUp()">
// <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M6.902 12h6.196c.751 0 1.172-.754.708-1.268l-3.098-3.432c-.36-.399-1.055-.399-1.416 0l-3.098 3.433c-.464.513-.043 1.267.708 1.267Z"></path></svg>
// </div>
// <div onclick="this.parentNode.parentNode.querySelector('input[type=number]').stepDown()">
// <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267Z"></path></svg>
// </div>
// </div>
// </div>`
        }

        // check hide status
        const i18n = window.parcelpanel_admin_wc_meta_boxes.i18n
        if (!i18n.show_add_status.delivered_type) {
            $('#order_status option[value="wc-delivered"]').hide();
        }     
        if (!i18n.show_add_status.shipped_type) {
            $('#order_status option[value="wc-shipped"]').hide();
        } 
        if (!i18n.show_add_status.partial_shipped_type) {
            $('#order_status option[value="wc-partial-shipped"]').hide();
        }    

        $('.select2-container').on('click', function () {

            const partially_shipped = i18n.order_status_new.partially_shipped ?? "Partially Shipped";
            const completed_text = i18n.order_status_new.completed_text ?? "Shipped";
            const shipped_text = i18n.order_status_new.shipped_text ?? "Shipped";
            const delivered_text = i18n.order_status_new.delivered_text ?? "Delivered";
            
            if (!i18n.show_add_status.delivered_type) {
                $('ul.select2-results__options li:contains("'+delivered_text+'")').hide();
            }     
            if (!i18n.show_add_status.shipped_type) {
                // hide wc-shipped
                $('ul.select2-results__options li:contains("'+shipped_text+'"):eq(1)').hide();
                $('ul.select2-results__options li:contains("'+partially_shipped+'")').show();
            } 
            if (!i18n.show_add_status.partial_shipped_type) {
                $('ul.select2-results__options li:contains("'+partially_shipped+'")').hide();
            }    
        })

        const pp_wc_shipment_tracking_items = {

            is_open_modal: false,

            order_id: 0,
            tracking_id: 0,
            tracking_number: '',
            courier_code: '',
            fulfilled_date: '',

            is_saving: false,
            line_items: [],
            shipments: [],
            has_full_shipped: false,

            /** 保存成功后刷新页面 */
            refresh_page_after_saved: false,

            /**
             * init Class
             */
            init: function () {
                $('#pp-wc-shop_order-shipment-tracking')
                    .on('click', '.delete-tracking', this.delete_tracking)
                    .on('click', '#pp-tk-btn-show-form', this.show_form_click)
                    // .on('click', '#pp-tk-btn-save-form', this.save_form)
                    // .on('click', '#pp-tk-btn-cancel-form', this.hide_form)
                    .on('click', '.edit-tracking', this.edit_tracking)

                $shop_order_screen
                    .on('click', '.parcelpanel_add_tracking', this.handle_admin_order_actions_add_track_click)
            },

            // /**
            //  * 录入新单号
            //  */
            // save_form: function () {
            //   let error
            //
            //   if ($tracking_number.val() === '') {
            //     showerror($tracking_number)
            //     error = true
            //   } else {
            //     hideerror($tracking_number)
            //   }
            //
            //   if ($fulfilled_date.val() === '') {
            //     showerror($fulfilled_date)
            //     error = true
            //   } else {
            //     hideerror($fulfilled_date)
            //   }
            //
            //   // if ($select_courier.val() === '') {
            //   //     showerror($select_courier.siblings('.select2-container').find('.select2-selection'));
            //   //     error = true;
            //   // } else {
            //   //     hideerror($select_courier.siblings('.select2-container').find('.select2-selection'));
            //   // }
            //
            //   if (true === error) {
            //     return false
            //   }
            //
            //   const tracking_id = $tracking_id.val()
            //
            //   $tracking_form.block({
            //     message: null,
            //     overlayCSS: {
            //       background: '#fff',
            //       opacity: 0.6,
            //     },
            //   })
            //
            //
            //   let checked = ''
            //
            //   if ($('input#pp-tk-chk-order-completed').is(':checked')) {
            //     checked = '1'
            //   }
            //
            //   let fulfilled_date = new Date($fulfilled_date.val()).toISOString()
            //
            //   let data = {
            //     action: 'pp_tracking_save_form',
            //     order_id: woocommerce_admin_meta_boxes.post_id,
            //     tracking_id: tracking_id,
            //     courier: $select_courier.val(),
            //     tracking_number: $tracking_number.val(),
            //     fulfilled_date: fulfilled_date,
            //     pp_order_completed: checked,
            //     _ajax_nonce: $tracking_save_nonce.val(),
            //   }
            //
            //   $.ajax({
            //     url: woocommerce_admin_meta_boxes.ajax_url,
            //     data: data,
            //     type: 'POST',
            //     success: function (resp) {
            //       $tracking_form.unblock()
            //
            //       pp_wc_shipment_tracking_items.hide_form()
            //
            //       if (resp.success) {
            //         if (tracking_id) {
            //           const $tracking_item = $(`#pp-tracking-item-${ tracking_id }`)
            //           $tracking_item.replaceWith(resp.data)
            //         } else {
            //           $('#pp-tk-tracking-items').append(resp.data)
            //         }
            //
            //         if ('1' === checked) {
            //           $('#order_status').val('wc-completed').trigger('change')
            //           $('#post').before('<div id="order_updated_message" class="updated notice notice-success is-dismissible"><p>Order updated.</p><button type="button" class="notice-dismiss update-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>')
            //         }
            //       } else {
            //         $('#pp-tk-tracking-items').append(resp.data)
            //       }
            //     },
            //     error() {
            //       $.toastr.error('Server error, please try again or refresh the page')
            //     },
            //   })
            //
            //   return false
            // },

            handle_admin_order_actions_add_track_click: function (e) {
                e.preventDefault()
                if (!e.target || e.target.getAttribute('disabled')) {
                    return
                }
                const order_id = parseInt((e.target.href || '').split('#')[1])
                if (!order_id) {
                    return
                }
                $shop_order_screen.find('.parcelpanel_add_tracking')
                    .attr('disabled', 'disabled')
                pp_wc_shipment_tracking_items.refresh_page_after_saved = true
                pp_wc_shipment_tracking_items.tracking_id = 0
                pp_wc_shipment_tracking_items.tracking_number = ''
                pp_wc_shipment_tracking_items.courier_code = ''
                pp_wc_shipment_tracking_items.fulfilled_date = ''
                pp_wc_shipment_tracking_items.order_id = order_id
                pp_wc_shipment_tracking_items.show_form()
                    .finally(() => {
                        $shop_order_screen.find('.parcelpanel_add_tracking')
                            .removeAttr('disabled')
                    })
            },

            /**
             * 编辑单号
             */
            edit_tracking: function () {
                const $tracking_item = $(this).closest('li.tracking-item')
                const tracking_id = $tracking_item.data('tracking-id')

                // 单号
                const number = $tracking_item.find('.number').text()
                // $tracking_number.val(number)

                // 运输商
                const courier = $tracking_item.find('.courier').data('value')
                // $select_courier.val(courier).trigger('change')

                // 发货日期
                const fulfilled_date = $tracking_item.data('fulfilled-date')
                // $fulfilled_date.val(fulfilled_date)

                // Tracking ID
                // $tracking_id.val(tracking_id)

                // console.log('tracking_id', tracking_id)

                pp_wc_shipment_tracking_items.tracking_id = tracking_id
                pp_wc_shipment_tracking_items.tracking_number = number
                pp_wc_shipment_tracking_items.courier_code = courier
                pp_wc_shipment_tracking_items.fulfilled_date = fulfilled_date
                pp_wc_shipment_tracking_items.order_id = parseInt(parcelpanel_admin_wc_meta_boxes.post_id)
                pp_wc_shipment_tracking_items.show_form()
            },

            show_form_click: function () {
                $btn_show_form.attr('disabled', 'disabled').addClass('is-busy')
                pp_wc_shipment_tracking_items.tracking_id = 0
                pp_wc_shipment_tracking_items.tracking_number = ''
                pp_wc_shipment_tracking_items.courier_code = ''
                pp_wc_shipment_tracking_items.fulfilled_date = ''
                pp_wc_shipment_tracking_items.order_id = parseInt(parcelpanel_admin_wc_meta_boxes.post_id)
                pp_wc_shipment_tracking_items.show_form()
                    .finally(() => {
                        $btn_show_form.removeAttr('disabled').removeClass('is-busy')
                    })
            },

            req_get_tracking_items: () => {
                const URL_GET_TRACKING_ITEMS = `${ajaxurl}?action=pp_get_tracking_items&order_id=${pp_wc_shipment_tracking_items.order_id}&_ajax_nonce=${parcelpanel_admin_wc_meta_boxes.get_shipment_item_nonce}`
                return fetch(URL_GET_TRACKING_ITEMS)
                    .then(res => res.json())
                    .catch((e) => {
                        // console.error(e)
                        $.toastr.error('Server error, please try again or refresh the page')

                        return e
                    })
            },

            /**
             * 刷新 Meta box 的 Shipments
             */
            refresh_meta_box_shipments() {
                // parcelpanel_admin_wc_meta_boxes_shipments这个参数只在meta box中存在，其他地方暂时没有异步刷新单号列表这个功能
                if (!window.parcelpanel_admin_wc_meta_boxes_shipments) return
                pp_wc_shipment_tracking_items.req_get_tracking_items()
                    .then(res => {
                        // console.log(res)
                        window.parcelpanel_admin_wc_meta_boxes_shipments.shipments = res.data.shipments
                        pp_wc_shipment_tracking_items.render_shipment_items()

                        return res
                    })
            },

            /**
             * 显示单号录入的表单
             */
            show_form: function () {
                return pp_wc_shipment_tracking_items.req_get_tracking_items()
                    .then(res => {
                        // console.log(res)
                        pp_wc_shipment_tracking_items.line_items = res.data.line_items
                        pp_wc_shipment_tracking_items.shipments = res.data.shipments
                        pp_wc_shipment_tracking_items.order_number = res.data.order_number

                        if (window.parcelpanel_admin_wc_meta_boxes_shipments) {
                            window.parcelpanel_admin_wc_meta_boxes_shipments.shipments = res.data.shipments
                            pp_wc_shipment_tracking_items.render_shipment_items()
                        }

                        pp_wc_shipment_tracking_items.render_add_tracking_modal()

                        return res
                    })
            },

            render_shipment_items: function () {
                const dom = window.parcelpanel_admin_wc_meta_boxes_shipments.shipments.map((v, i) => {
                    return `<li class="tracking-item" data-fulfilled-date="${v.fulfilled_date}" data-tracking-id="${v.id}" id="pp-tracking-item-${v.id}"><div style="display:flex;margin-bottom:8px;justify-content:space-between;"><div>Shipment ${i + 1}</div><div><a class="edit-tracking">Edit</a><a class="delete-tracking">Delete</a></div></div><div class="tracking-content"><div class="tracking-number"><strong class="courier" data-value="${v.courier_code}">${v.courier_name}</strong> - <a class="number" href="${v.tracking_url}" target="_blank" title="Tracking order">${v.tracking_number}</a></div><div class="tracking-status"><span class="pp-tracking-icon icon-${v.shipment_status_label}">${v.shipment_status_text}</span></div><div class="tracking-info"></div></div><p class="meta"><span class="fulfilled_on">${v.shipped_on_text}</span></p></li>`
                })
                $('#pp-tk-tracking-items').html(dom.join(''))
                // 设为可用状态
                $btn_show_form.removeAttr('disabled')
            },

            render_add_tracking_modal: function () {

                // console.log('----------render_add_tracking_modal------------')

                if (pp_wc_shipment_tracking_items.is_open_modal) {
                    return
                }
                pp_wc_shipment_tracking_items.is_open_modal = true

                const i18n = window.parcelpanel_admin_wc_meta_boxes.i18n
                const line_items = pp_wc_shipment_tracking_items.line_items

                let item_id = pp_wc_shipment_tracking_items.tracking_id
                // 是否存在订单级别的发货
                const has_full_shipped = pp_wc_shipment_tracking_items.shipments.some(v => v.ship_type === 1)
                const is_editing = !!item_id

                // todo 待测试
                const skip_item_ids = new Set(
                    pp_wc_shipment_tracking_items.shipments
                        .map(({line_items}) => line_items
                            .filter(({quantity}) => !quantity)
                            .map(({id}) => id)
                        )
                        .flat()
                )

                // 找到当前处理的shipment，编辑时才有，增加时是找不到的
                const shipment_item = pp_wc_shipment_tracking_items.shipments.find(v => v.tracking_id === item_id) || {}

                const {
                    ship_type = 0,
                } = shipment_item

                // 根据操作状态展示不同的文本
                const title = item_id ? i18n.edit_tracking : i18n.add_tracking
                const ok_text = item_id ? i18n.save : i18n.add
                const order_number = pp_wc_shipment_tracking_items.order_number

                const usage = {}
                shipment_item.line_items?.forEach(item => {
                    usage[item.id] = (usage[item.id] ?? 0) + item.quantity
                })

                // console.log(usage, 'usage')

                // const is_fulfill_disabled = ship_type !== 0
                const is_fulfill_disabled = ship_type === 1
                // 是否允许修改商品数量；false：隐藏商品数量编辑版块，true：显示商品数量编辑版块
                // console.log(is_fulfill_disabled, 'is_fulfill_disabled')

                const _line_items = line_items
                    .map(v => {
                        let max = v.remain_quantity
                        // 总购买数量
                        let item_quantity = is_editing ? (usage[v.id] ?? 0) : max
                        if (is_editing) {
                            // 编辑模式下 max 的值为 剩余数量 + 当前发货数量
                            max += (usage[v.id] ?? 0)
                        }
                        // todo 待优化
                        if (usage[v.id] !== 0 && !max) {
                            return
                        }

                        return {
                            ...v,
                            value: usage[v.id] === 0 ? v.quantity : item_quantity,
                            max_value: usage[v.id] === 0 ? v.quantity : max,
                            is_editable: !skip_item_ids.has(v.id), // 是否可调整数量
                        }
                    })
                    .filter(_ => _)
                // 排除不允许调整数量的项
                // .filter(({id}) => !skip_item_ids.has(id))

                // console.log(_line_items, '_line_items')

                const get_items_dom = () => {
                    return _line_items
                        .map((v) => (
                            // `<tr><td><div class="thumb">${ v.image_url ? `<img src="${ v.image_url }" alt>` : '' }</div></td><td class="column-name">${ v.name }</td><td>${ number_input_component() }<input type="number" min="0" max="${ v.max_value }" data-item-id="${ v.id }" class="item-quantity" value="${ v.value }" autocomplete="off" ${ v.is_editable ? '' : 'disabled' }></td></tr>`
                            `<tr><td><div class="thumb">${v.image_url ? `<img src="${v.image_url}" alt>` : ''}</div></td><td class="column-name" style="    overflow: hidden;"><div class="pp-product-show-text">${v.name}</div>${v.sku ? `<div class="pp-product-show-text" style="color:#757575;font-size:12px;">${i18n.sku} ${v.sku}</div>` : ``}</td><td>${number_input_component(v)}</td></tr>`
                        ))
                        .join('')
                }

                const get_couriers_list = () => {
                    return (window.parcelpanel_courier_list || {}).map(v => {
                        return {
                            id: v.code,
                            text: v.name,
                            selected: v.code === shipment_item.courier_code,
                        }
                    })
                }

                const get_couriers_list_enabled = () => {
                    return (window.parcelpanel_courier_list_enabled || {}).map(v => {
                        return {
                            id: v.code,
                            text: v.name,
                            selected: v.code === shipment_item.courier_code,
                        }
                    })
                }
                

                let {
                    tracking_number,
                    courier_code,
                    fulfilled_date,
                } = pp_wc_shipment_tracking_items

                // 是否已全部发货
                const is_shipped_all = has_full_shipped || !_line_items.length

                const ok_button_is_disabled = !item_id && is_shipped_all

                // 渲染 items 部分
                let item_block_markup = !is_fulfill_disabled
                    ? (
                        !is_shipped_all
                            ? `<table class="pp-items"><tbody>${get_items_dom()}</tbody></table>`
                            : `<div class="fulfilled-tip">${i18n.items_has_fulfilled}</div>`
                    )
                    : ''
                if (item_block_markup) {
                    item_block_markup += '<hr class="pp-divider">'
                }

                $(document.body).append(`<div id="PP-Modal-UVSNWm" class="components-modal__screen-overlay pp-modal">
<style>
.pp-items{display:grid;text-align:left;grid-template-columns:auto 1fr auto;column-gap:10px;row-gap:8px}
.pp-items thead,.pp-items tbody,.pp-items tr{display:contents;}
.pp-items th{margin-bottom:8px;}
.pp-items th.column-items{grid-column:1/span 2}
.pp-items .column-name{align-self:center}
.pp-items .thumb{position:relative;display:block;width:40px;height:40px;border:0px solid #e8e8e8;background:#f8f8f8;color:#ccc;text-align:center;font-size:21px}
.pp-items .thumb:before{position:absolute;top:0;left:0;display:block;margin:0;width:100%;height:100%;content:"\\f128";text-align:center;text-indent:0;text-transform:none;font-weight:400;font-variant:normal;font-family:Dashicons;line-height:40px;speak:never;-webkit-font-smoothing:antialiased}
.pp-items .thumb img{position:relative;margin:0;padding:0;width:100%;height:100%}
.pp-modal th:last-child,.pp-modal td:last-child{text-align:right;}

.pp-divider{margin:16px 0;height:0;border:solid #ddd;border-width:0 0 1px;}

.pp-input-box{display:grid;color:#3c434a;column-gap:20px;grid-template-columns:1fr 1fr;row-gap:12px}
.pp-input-box label{display:flex;flex-direction:column;}

.fulfilled-tip{color:#999c9f;text-align:center;font-size:16px}

.pp-number-input{display:inline-flex;overflow:hidden;border:1px solid #8c8f94;border-radius:4px;background:#f1f1f1;align-items:center}
input.pp-number-input-input[data-v-ubw820r6]{margin:0;padding:0 0 0 8px;width:100%;outline:0!important;border:0!important;border-radius:0;box-shadow:none!important}
.pp-number-input-suffix{margin:0 8px;color:#646970;flex:0 0 auto}
@-moz-document url-prefix() {
.pp-number-input{background:0 0}
}

.pp-input-box-new{display:grid;color:#3c434a;column-gap:20px;row-gap:12px;margin-bottom:16px;}
.pp-input-box-new label{display:flex;flex-direction:column;}
.pp-input-title-style{margin-bottom: 4px;}
.pp-cursor{cursor: pointer;}
#PP-click-status input {vertical-align: sub;}

.pp-tracking-number-tip{display: none;align-items: center;margin-top: 4px;color:#CC1818;}

.pp-product-show-text{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.pp-modal .components-modal__header {height: 60px;font-size:16px}
.pp-modal .components-modal__header .components-modal__header-heading {font-size:16px;line-height: 24px;font-weight: 600;}
.pp-modal .components-modal__content {display:flex;flex-direction:column;margin-top: 60px;}

</style>
<div role="dialog" tabindex="-1" class="components-modal__frame" style="border-radius: 2px;">
  <div role="document" class="components-modal__content">
    <div class="components-modal__header">
      <div class="components-modal__header-heading-container"><h1 class="components-modal__header-heading">#${order_number} ${title}</h1></div>
      <button type="button" id="pp-tk-modal-close" aria-label="Close dialog" class="components-button has-icon" style="position:unset;margin-right:-8px;width:36px;">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path></svg>
      </button>
    </div>
    <div class="pp-modal-body">
${item_block_markup}

<div class="pp-input-box-new">
<div><label><div class="pp-input-title-style">${i18n.tracking_number}</div><input placeholder="${i18n.tracking_number_eg}" type="text" id="pp-tk-ipt-tracking-number" value="${tracking_number}"></label><div class="pp-tracking-number-tip"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 13V7H13V13H11Z" fill="#CC1818"/>
<path d="M11 15V17H13V15H11Z" fill="#CC1818"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12ZM12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25Z" fill="#CC1818"/>
</svg>
<span style="margin-left: 4px;">${i18n.tracking_number_tip}</span></div></div>
</div>

<div class="pp-input-box">
<div><label><div class="pp-input-title-style">${i18n.courier}</div><select id="pp-tk-slc-courier"><option value>${i18n.auto_matching}</option></select></label></div>
<div><label><div class="pp-input-title-style">${i18n.date_shipped}</div><input type="text" id="pp-tk-ipt-date-shipped" class="date-picker-field" value="${fulfilled_date}" placeholder="${window.parcelpanel_admin_wc_meta_boxes.today}"></label></div>
</div>

<hr class="pp-divider">

<div style="margin-bottom: 4px;">${i18n.order_status_options}</div> 

<div style="display: flex;${i18n.threeShow}" id="PP-click-status">
    <span class="pp-cursor">
        <input name="_shipStatus" value="${i18n.order_status_new.do_not_change_status}" type="radio" class="select short" style="" ${i18n.order_status_new.no_check}>
        <span>${i18n.order_status_new.do_not_change}</span>
    </span>

    <span class="pp-cursor" style="${i18n.hiddenCheckStatus}">
        <input name="_shipStatus" value="${i18n.order_status_new.partially_shipped_status}" type="radio" class="select short" style="" ${i18n.order_status_new.partially_shipped_check}>
        <span>${i18n.order_status_new.partially_shipped}</span>
    </span>

    <span class="pp-cursor" style="${i18n.order_status_new.show_completed}">
        <input name="_shipStatus" value="${i18n.order_status_new.completed_status}" type="radio" class="select short" style="" ${i18n.order_status_new.completed_check}>
        <span>${i18n.order_status_new.completed_text}</span>
    </span>

    <span class="pp-cursor" style="${i18n.order_status_new.show_shipped}">
        <input name="_shipStatus" value="${i18n.order_status_new.shipped_status}" type="radio" class="select short" style="" ${i18n.order_status_new.shipped_check}>
        <span>${i18n.order_status_new.shipped_text}</span>
    </span>
    
</div>

    </div>
  </div>

<div class="components-modal__footer">
<button type="button" class="components-button pp-button button" id="pp-tk-btn-cancel">
<span>${i18n.cancel}</span>
</button>
<button type="button" class="components-button pp-button is-primary" id="pp-tk-btn-ok" ${ok_button_is_disabled ? 'disabled' : ''}>
<span>${ok_text}</span>
</button>
</div>

</div>
</div>`)

                $('#PP-click-status span').click((event) => {
                    // 找到相邻的 input 元素
                    var input = $(event.target).prev();

                    // 触发 input 元素的点击事件
                    input.click();
                });

                // console.log(parcelpanel_admin);
                let frequently_used_carriers = window.parcelpanel_admin.strings.frequently_used_carriers ?? 'FREQUENTLY USED CARRIERS'
                let other_carriers = window.parcelpanel_admin.strings.other_carriers ?? 'OTHER CARRIERS'

                $('#PP-Modal-UVSNWm #pp-tk-slc-courier').append('<option value disabled>'+frequently_used_carriers+'</option>');
                $('#PP-Modal-UVSNWm #pp-tk-slc-courier').selectWoo({data: get_couriers_list_enabled(), width: 'auto'})
                $('#PP-Modal-UVSNWm #pp-tk-slc-courier').append('<option value="new-category" disabled>'+other_carriers+'</option>');
                $('#PP-Modal-UVSNWm #pp-tk-slc-courier').selectWoo({data: get_couriers_list(), width: 'auto'})

                // $('#PP-Modal-UVSNWm #pp-tk-slc-mark-order-as').selectWoo({
                //     data: window.parcelpanel_admin_wc_meta_boxes.mark_order_as_select_list,
                //     width: 'auto'
                // })
                $(document.body).trigger('wc-init-datepickers')

                $('#PP-Modal-UVSNWm')
                    // .on('click', '#pp-tk-btn-shipped-label-toggle', () => {
                    //   /* 切换 completed/shipped 的点击事件 */
                    //
                    //   const {
                    //     mark_order_as_select_list,
                    //     save_shipped_label_nonce,
                    //     options,
                    //   } = window.parcelpanel_admin_wc_meta_boxes
                    //
                    //   // 查询到 completed 项
                    //   const completed_item = mark_order_as_select_list.find(v => v.id === 'completed')
                    //   // 按钮文本
                    //   let btn_text = ''
                    //   // 当前是否启用 Shipped 标签
                    //   const is_shipped_label = options.status_shipped
                    //
                    //   if (is_shipped_label) {
                    //     /* 当前是 shipped label */
                    //
                    //     completed_item.text = i18n.order_status.completed
                    //     btn_text = i18n.rename_to_shipped
                    //   } else {
                    //     /* 当前是 completed label */
                    //
                    //     completed_item.text = i18n.order_status.shipped
                    //     btn_text = i18n.revert_to_completed
                    //   }
                    //
                    //   options.status_shipped = !is_shipped_label
                    //
                    //   const URL_SAVE_SHIPPED_LABEL = `${ ajaxurl }?action=pp_save_shipped_label&_ajax_nonce=${ save_shipped_label_nonce }`
                    //   fetch(URL_SAVE_SHIPPED_LABEL, {
                    //     method: 'POST',
                    //     headers: {
                    //       'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({
                    //       status_shipped: !is_shipped_label,
                    //     }),
                    //   })
                    //
                    //   // 需要先 empty() 再重新赋值 data，否则不会生效，就是调用后会自动帮你选第一项。如果还有更好的做法，可以迭代一下
                    //   $('#PP-Modal-UVSNWm #pp-tk-slc-mark-order-as').select2().empty().select2({data: mark_order_as_select_list})
                    //   $('#pp-tk-btn-shipped-label-toggle').text(btn_text)
                    //   // 修改订单状态下拉选项文本
                    //   $('option[value=wc-completed]').text(is_shipped_label ? i18n.order_status.completed : i18n.order_status.shipped)
                    //   $('#order_status').select2().trigger('change')
                    // })
                    .on('click', '#pp-tk-modal-close', pp_wc_shipment_tracking_items.close_add_tracking_modal)
                    .on('click', '#pp-tk-btn-cancel', pp_wc_shipment_tracking_items.close_add_tracking_modal)
                    .on('click', '#pp-tk-btn-ok', () => {

                        const {
                            save_shipment_item_nonce,
                        } = window.parcelpanel_admin_wc_meta_boxes

                        const {
                            order_id,
                        } = pp_wc_shipment_tracking_items

                        const $tracking_number_tips = $('.pp-tracking-number-tip')
                        const $tracking_number = $('#pp-tk-ipt-tracking-number')
                        const $fulfilled_date = $('#pp-tk-ipt-date-shipped')
                        const $select_courier = $('#pp-tk-slc-courier')
                        // const $select_mark_order_as = $('#pp-tk-slc-mark-order-as')
                        const $select_mark_order_as = $('#PP-click-status input[name="_shipStatus"]:checked');

                        let error = false
                        if ($tracking_number.val() === '') {
                            showerror($tracking_number)
                            showerrorTip($tracking_number_tips)
                            error = true
                        } else {
                            hideerror($tracking_number)
                            hideerrorTip($tracking_number_tips)
                        }
                        if (error) return


                        const line_items = []

                        if (ship_type !== 1) {
                            // todo
                            $('.item-quantity').each((i, v) => {
                                const id = parseInt($(v).data('item-id'))
                                const quantity = parseInt($(v).val())
                                if (id && quantity > 0) {
                                    line_items.push({id, quantity})
                                }
                            })

                            if (!line_items.length) {
                                $.toastr.warning('Empty line items')
                                return
                            }
                        }

                        const currentDate = $fulfilled_date.datepicker('getDate') || new Date()
                            , day = currentDate.getDate()
                            , month = currentDate.getMonth() + 1
                            , year = currentDate.getFullYear()


                        // console.log(currentDate, currentDate.getTime(), new Date().getTime(), 11111)

                        const _data = {
                            order_id,
                            mark_order_as: $select_mark_order_as.val(),
                            tracking_id: item_id,
                            tracking_number: $tracking_number.val(),
                            courier_code: $select_courier.val(),
                            fulfilled_date: `${year}-${month}-${day}`,
                            line_items,
                        }

                        // console.log(_data['mark_order_as'], 11111, i18n.order_status_new)

                        let mark_order_as = _data['mark_order_as'] ?? ''
                        i18n.order_status_new.partially_shipped_check = ''
                        i18n.order_status_new.completed_check = ''
                        i18n.order_status_new.shipped_check = ''
                        i18n.order_status_new.no_check = ''
                        if (mark_order_as == 'partial-shipped') {
                            i18n.order_status_new.partially_shipped_check = 'checked="checked"'
                        } else if (mark_order_as == 'completed') {
                            i18n.order_status_new.completed_check = 'checked="checked"'
                        }  else if (mark_order_as == 'shipped') {
                            i18n.order_status_new.shipped_check = 'checked="checked"'
                        } else {
                            i18n.order_status_new.no_check = 'checked="checked"'
                        }

                        const nullable_fields = ['mark_order_as', 'tracking_id', 'courier_code']
                        nullable_fields.map(v => {
                            _data[v] = _data[v] || undefined
                        })

                        const URL_SHIPMENT_ITEM_SAVE = `${ajaxurl}?action=pp_shipment_item_save&_ajax_nonce=${save_shipment_item_nonce}`

                        if (pp_wc_shipment_tracking_items.is_saving) return
                        pp_wc_shipment_tracking_items.is_saving = true
                        $('#pp-tk-btn-ok').attr('disabled', 'disabled').addClass('is-busy')

                        fetch(URL_SHIPMENT_ITEM_SAVE, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(_data),
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (!res.success) {
                                    $.toastr.warning(res.msg || 'Unknown error!')
                                    return
                                }

                                /** 保存成功 */

                                $.toastr.success('Saved successfully')

                                if (pp_wc_shipment_tracking_items.refresh_page_after_saved) {
                                    window.location.reload()
                                    return
                                }

                                pp_wc_shipment_tracking_items.refresh_meta_box_shipments()

                                pp_wc_shipment_tracking_items.close_add_tracking_modal()

                                // 更新前端订单状态
                                if (['completed', 'partial-shipped', 'shipped'].includes($select_mark_order_as.val())) {
                                    $('#order_status').val(`wc-${$select_mark_order_as.val()}`).trigger('change')
                                    $('#post').before('<div id="order_updated_message" class="updated notice notice-success is-dismissible"><p>Order updated.</p><button type="button" class="notice-dismiss update-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>')
                                }

                            })
                            .catch(() => {
                                $.toastr.error('Server error, please try again or refresh the page')
                            })
                            .finally(() => {
                                $('#pp-tk-btn-ok').removeAttr('disabled').removeClass('is-busy')
                                pp_wc_shipment_tracking_items.is_saving = false
                            })
                    })
            },

            // /**
            //  * 隐藏单号录入的表单
            //  */
            // hide_form: function () {
            //   $tracking_form.hide()
            //   $btn_show_form.show()
            //
            //   // 清除表单
            //   $tracking_id.val('')
            //   $tracking_number.val('')
            //   // $select_courier.val('').trigger('change');
            //   // $fulfilled_date.val('');
            //
            //   hideerror($tracking_number)
            //   hideerror($fulfilled_date)
            // },

            close_add_tracking_modal: () => {
                $('#PP-Modal-UVSNWm').remove()
                pp_wc_shipment_tracking_items.is_open_modal = false
            },

            /**
             * 删除单号
             */
            delete_tracking: function () {
                const $tracking_item = $(this).closest('li.tracking-item')
                const tracking_id = $tracking_item.data('tracking-id')

                confirm(
                    parcelpanel_admin_wc_meta_boxes.i18n_delete_tracking,
                    'Delete tracking number',
                    res => {
                        if (!res) {
                            return
                        }
                        $tracking_item.block({
                            message: null,
                            overlayCSS: {
                                background: '#fff',
                                opacity: 0.6,
                            },
                        })

                        const {
                            post_id,
                            delete_shipment_item_nonce,
                        } = window.parcelpanel_admin_wc_meta_boxes

                        const data = {
                            action: 'pp_delete_tracking_item',
                            order_id: post_id,
                            tracking_id: tracking_id,
                            _ajax_nonce: delete_shipment_item_nonce,
                        }

                        $.post(woocommerce_admin_meta_boxes.ajax_url,
                            data,
                            res => {
                                $tracking_item.unblock()
                                pp_wc_shipment_tracking_items.order_id = post_id
                                pp_wc_shipment_tracking_items.refresh_meta_box_shipments()
                                if (res.success) {
                                    $tracking_item.remove()
                                    $.toastr.success(res.msg)
                                } else {
                                    $.toastr.error(res.msg)
                                }
                            })
                    })

                return false
            },

            // refresh_items: function () {
            //     var data = {
            //         action: 'wc_shipment_tracking_get_items',
            //         order_id: woocommerce_admin_meta_boxes.post_id,
            //         security: $('#wc_shipment_tracking_get_nonce').val()
            //     };
            //
            //     $('#woocommerce-shipment-tracking').block({
            //         message: null,
            //         overlayCSS: {
            //             background: '#fff',
            //             opacity: 0.6
            //         }
            //     });
            //
            //     $.post(woocommerce_admin_meta_boxes.ajax_url, data, function (response) {
            //         $('#woocommerce-shipment-tracking').unblock();
            //         if (response != '-1') {
            //             $('#woocommerce-shipment-tracking #tracking-items').html(response);
            //         }
            //     });
            // },
        }

        pp_wc_shipment_tracking_items.init()
        if (window.parcelpanel_admin_wc_meta_boxes_shipments) {
            pp_wc_shipment_tracking_items.render_shipment_items()
        }

        // window.wc_shipment_tracking_refresh = wc_shipment_tracking_items.refresh_items;

        $('.pp-tips').tipTip()

        // $('.pp-btn-import-tracking-number').on('click', () => {
        //   // open_import_modal()
        //   window.location.href = parcelpanel_admin.urls.import_tracking_number
        // })

        // 点击导入按钮
        $import_modal_button_import.on('click', () => {
            // 上传文件
            file_upload($input_csv_file[0])
        })

        // 点击 Close 按钮
        $import_modal_close.on('click', () => {
            // 关闭导入模态框
            close_import_modal()
        })

        // 点击 Back 按钮
        $modal_back.on('click', () => {
            // 显示上传面板
            show_panel_upload()
        })

        $list_records.on('click', '.view', function () {
            const id = parseInt($(this).data('id'))

            const detail = import_record_list.find(v => {
                return v.id === id
            })

            if (detail) {
                render_upload_detail(detail)
            }
        })

        $(window).bind('beforeunload', () => {
            if (is_uploading) {
                return true
            }
        })

        /**
         * 开启导入面板
         */
        function open_import_modal() {
            if (!import_record_list.length) {
                // 读取历史列表
                get_history_upload_records()
            }
            show_panel_upload()
            $modal_import.show()
        }

        /**
         * 关闭导入面板
         */
        function close_import_modal() {
            $modal_import.hide()
        }

        /**
         * 更新进度条
         */
        function update_progress(percent) {
            $progress_upload.show()
            $progress_upload_percent.html(`${percent}%`)
            $progress_upload_bar.css('width', `${percent}%`)

            $input_file_wrapper.hide()
        }

        /**
         * 隐藏进度条
         */
        function hide_progress() {
            $progress_upload.hide()

            $input_file_wrapper.show()
        }

        /**
         * 切换至 上传记录详情 面板
         */
        function show_panel_upload_detail() {
            $panel_upload.hide()
            $panel_record_detail.show()
            // 隐藏按钮
            $import_modal_button_import.hide()
        }

        /**
         * 切换至 上传 面板
         */
        function show_panel_upload() {
            $panel_upload.show()
            $panel_record_detail.hide()
            // 显示按钮
            $import_modal_button_import.show()
        }

        function csv_check(file) {
            const file_name = file.value
            const index = file_name.lastIndexOf('.')
            const ext = file_name.substr(index + 1)

            return 'csv' === ext
        }

        /**
         * csv文件上传
         */
        function file_upload(file) {
            if (is_uploading) {
                $.toastr.warning('Importing')
                return
            }

            if (!csv_check(file)) {
                $.toastr.error('Please choose a CSV file')
                return
            }

            is_uploading = true

            update_progress(1)

            const form_data = new FormData()
            form_data.append('action', 'pp_upload_csv')
            form_data.append('import', file.files[0])
            form_data.append('_ajax_nonce', pp_upload_nonce)

            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: form_data,
                cache: false,
                processData: false,
                contentType: false,
                success: res => {
                    if (false === res.success) {
                        is_uploading = false
                        hide_progress()
                        $.toastr.error(res.msg || 'Upload failed! Unknown error')
                        return
                    }

                    $input_csv_file.val('')

                    // 重置错误次数
                    csv_import_error_num = 0

                    file_import(res.data.file)
                },
                error() {
                    $.toastr.error('Server error, please try again or refresh the page')
                },
            })
        }


        /**
         * 导入文件
         */
        function file_import(file, id = 0, pos = 0) {
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data: {
                    _ajax_nonce: pp_import_nonce,
                    action: 'pp_import_csv',
                    file: file,
                    id: id,
                    position: pos,
                },
                success: res => {
                    // 重置错误次数
                    csv_import_error_num = 0

                    update_progress(res.data.percentage)

                    if (res.data.percentage < 100) {
                        file_import(file, res.data.id, res.data.position)
                    } else {
                        is_uploading = false
                        get_history_upload_records()
                        setTimeout(() => {
                            hide_progress()
                            render_upload_detail(res.data)
                        }, 1e3)
                    }
                },
                error: () => {
                    if (csv_import_error_num < CSV_IMPORT_ERROR_RETRY_NUM) {
                        csv_import_error_num++
                        // 2秒后重试
                        setTimeout(() => file_import(file, id, pos), 2e3)
                    } else {
                        $.toastr.error('Server error, please try again or refresh the page')
                    }
                },
            })
        }


        /**
         * 获取历史上传数据
         */
        function get_history_upload_records() {
            const data = {
                action: 'pp_tracking_number_import_record',
                _ajax_nonce: pp_get_history_nonce,
            }
            $.ajax({
                type: 'GET',
                url: ajaxurl,
                data: data,
                success: res => {
                    render_upload_records(res.data)
                },
            })
        }

        /**
         * 渲染上传详情信息面板数据
         */
        function render_upload_detail(data, show = true) {
            $panel_record_detail_filename.html(data.filename)
            $panel_record_detail_total.html(data.total)
            $panel_record_detail_succeeded.html(data.succeeded)
            $panel_record_detail_failed.html(data.failed)
            $panel_record_detail_details.html(data.details.join('<br/>'))

            if (show) {
                show_panel_upload_detail()
            }
        }

        /**
         * 渲染上传记录列表
         */
        function render_upload_records(data) {
            import_record_list = data

            const html = []

            data.forEach(v => {
                const str = parcelpanel_admin.strings.import_records
                    .replace('${date}', v.date)
                    .replace('${filename}', v.filename)
                    .replace('${total}', v.total)
                    .replace('${failed}', v.failed)

                html.push(`<p>${str} <a class="view" data-id="${v.id}">view details.</a></p>`)
            })

            $list_records.html(html.join(''))
            $box_import_records.show()
        }
    })

    function showerror(element) {
        element.css('border-color', 'red')
    }

    function hideerror(element) {
        element.css('border-color', '')
    }

    function showerrorTip(element) {
        element.css('display', 'flex')
    }

    function hideerrorTip(element) {
        element.css('display', 'none')
    }

    $.fn.pp_snackbar = (msg) => {
        if (!$('body > .pp-snackbars').length) {
            $('body').append('<div class=pp-snackbars></div>')
        }

        const el = `<div class=components-snackbar><div class=components-snackbar__content>${msg}</div></div>`

        const snackbar = $(el)

        $('.pp-snackbars').append(snackbar)

        setTimeout(() => snackbar.remove(), 5000)

        return this
    }

    function confirm(msg, title, callback) {
        const id = Math.ceil(Math.random() * 10000)

        const i18n = window.parcelpanel_admin_wc_meta_boxes.i18n

        const tmpl = `
<style> 
.pp-modal .components-modal__header {height: 60px;font-size:16px}
.pp-modal .components-modal__header .components-modal__header-heading {font-size:16px;line-height: 24px;font-weight: 600;}
.pp-modal .components-modal__content {display:flex;flex-direction:column;margin-top: 60px;}
</style>        
<div class="components-modal__screen-overlay pp-modal" id="pp-modal-${id}">
<div role="dialog" tabindex="-1" class="components-modal__frame" style="border-radius: 2px;">
<div role="document" class="components-modal__content">
  <div class="components-modal__header">
    <div class="components-modal__header-heading-container"><h1 class="components-modal__header-heading">${title}</h1></div>
    <button type="button" aria-label="Close dialog" class="components-button has-icon btn-close" style="position: unset; margin-right: -8px;">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path>
      </svg>
    </button>
  </div>
  <div class="pp-modal-body"><p>${msg}</p></div>
</div>
<div class="components-modal__footer">
  <button type="button" class="components-button pp-button is-secondary"><span>${i18n.cancel}</span></button>
  <button type="button" class="components-button pp-button is-primary is-destructive"><span>${i18n.save}</span></button>
</div>
</div>
</div>
`
        $('body').append(tmpl)

        const $modal = $(`#pp-modal-${id}`)

        $modal
            .on('click', '.is-primary', function () {
                $modal.remove()
                callback(true)
            })
            .on('click', '.is-secondary', function () {
                $modal.remove()
                callback(false)
            })
            .on('click', '.btn-close', function () {
                $modal.remove()
                callback(false)
            })
    }
})(jQuery)

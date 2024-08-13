<?php
global $post;

?>
<style>
    #woocommerce-trackingmore .inside{margin: 0;padding: 0}
    /*  meta box  */
    .tm-shop-module{border-bottom: 1px solid #dcdfe6;padding: 12px;font-size: 14px}
    .tm-shop-module a,.tm-shop-module a:focus{color:#2271b1;cursor: pointer;text-decoration: none;box-shadow:none}
    .tm-shop-module .tm-shop-operate a:nth-child(2){color: #ff1414}
    .tm-shop-module-operate{display: flex;align-items:center;justify-content: space-between;margin-bottom: 4px}
    .tm-shop-serial{font-weight: 600}
    .tm-shop-operate{font-size: 12px;text-decoration: none}
    .tm-shop-operate a{cursor: pointer}
    .tm-shop-operate-del{margin-left: 12px;}
    .tm-shop-operate-del:hover{color: #ff1414}
    .tm-shop-track-num{text-overflow: ellipsis;overflow: hidden;word-break: keep-all;margin-bottom: 2px;}
    .tm-shop-track-courier{flex-shrink: 0;word-break: break-all;font-weight: 600;}

    .tm-btn{border:none;border-radius:3px;background-color:#ff6700;color:#fff;font-size:13px;min-height:36px;cursor:pointer;width:100%;}
    .tm-btn:hover{opacity: .8}

    .tm-overHide{overflow: hidden!important;}

    /*tracking select model*/
    .tm-modal-container{position: fixed;top: 0;right: 0;bottom: 0;left: 0;background-color: rgba(43,45,47,.6);z-index: 2000;display: flex;animation: edit-post__fade-in-animation .2s ease-out 0s;animation-fill-mode: forwards;}

    .tm-modal-container .tm-components-modal__frame {position: static;display: flex;width: 620px;flex-direction: column;transform: translateY(0);animation: none;overflow: hidden;border-radius: 2px;box-shadow: 0 10px 10px rgb(0 0 0 / 25%);background: #fff;}
    .tm-modal-container .tm-components-modal__content {flex: 1;padding: 0;display: flex;flex-direction: column;overflow: hidden;}
    .tm-modal-container .tm-components-modal__header{box-sizing: border-box;padding: 0 20px;display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 64px;width: 100%;z-index: 10;}
    .tm-modal-container .tm-modal-body {padding: 20px;font-size: 14px;line-height: 20px;overflow: auto;border-top: 1px solid #ddd;}

    .tm-modal-container .tm-components-modal__footer {width: 100%;height: 64px;padding: 16px 20px;box-sizing: border-box;border-top: 1px solid #eee;text-align: right;}

    .tm-modal-container .tm-input-box{color: #3c434a;column-gap: 20px;grid-template-columns: 1fr 1fr;row-gap: 12px;display: flex;flex-direction: column;}
    .tm-modal-container .tm-input-box label{display: flex;flex-direction: column;}

    /* button */
    .tm-components-button{display: inline-flex;text-decoration: none;font-family: inherit;font-weight: 400;font-size: 13px;margin: 0;border: 0;cursor: pointer;-webkit-appearance: none;background: none;transition: box-shadow .1s linear;height: 36px;align-items: center;box-sizing: border-box;padding: 6px 12px;border-radius: 2px;color: #1e1e1e;}
    .tm-components-button.tm-has-icon{padding: 6px;min-width: 36px;justify-content: center;}
    .tm-has-icon:hover{background: #e8e8e8;}

    .tm-modal-tips{color: #ff3636;font-size: 12px}

    @media (min-width: 600px) {
        .tm-modal-container .tm-components-modal__frame {margin: auto;max-height: calc(100% - 120px);max-width: calc(100% - 32px);min-width: 360px;animation: components-modal__appear-animation .1s ease-out;animation-fill-mode: forwards;}
        .tm-modal-container .tm-input-box{display: grid;}
    }
    @media (min-width: 960px) {
        .tm-modal-container .tm-components-modal__frame {max-height: 70%;}
    }
    @media (max-width: 425px) {
        .tm-modal-container{top:46px}
    }

    .tm-modal-container .el-input__inner{background-color:transparent!important;}
    .tm-couriers-select,.tm-country-select{z-index: 100000 !important;}
    .tm-notify-toastr-container{display: flex;align-items:center;}

    .tm-modal-container .tm-btn-cancel:focus, .tm-modal-container .tm-btn-cancel:hover{color: #ff6700;border-color: #ff6700;background-color: #fff}
    .tm-modal-container .tm-btn-submit{background-color:#ff6700;border-color: #ff6700;color:#fff}
    .tm-modal-container .tm-btn-submit:focus, .tm-modal-container .tm-btn-submit:hover, .tm-modal-container .tm-btn-submit:active{opacity: .8;background-color:#ff6700;border-color: #ff6700;color:#fff}
    .tm-modal-container .tm-btn-submit[disabled]{opacity: .6;cursor: not-allowed;}

    /*tdesign css*/
    .tm-modal-container input,.tm-modal-container input:focus,.tm-modal-container input:hover{border:none!important;box-shadow:none!important;padding:0!important;}
    .t-notification__show--top-right .t-notification__content{margin-top:0}
</style>

<div id="trackingmore-app">

    <!-- meta box -->
    <div>
        <div>
            <div class="tm-shop-module" v-if="trackDetail.tracking_number">
                <div class="tm-shop-module-operate">
                    <div class="tm-shop-serial">Shipment</div>
                    <div class="tm-shop-operate">
                        <a @click="tmDetailModel.detail">Edit</a>
                        <a @click="tmDelModal.toggle(trackDetail)" class="tm-shop-operate-del">Delete</a>
                    </div>
                </div>

                <div style="background: #f6f6f6;padding: 12px">
                    <div class="tm-shop-track-num"><a :href="'https://www.trackingmore.com/track/en/' + trackDetail.tracking_number + '?express=' + trackDetail.slug" target="_blank" :title="trackDetail.tracking_number">{{ trackDetail.tracking_number }}</a></div>
                    <div class="tm-shop-track-courier">
                        {{ trackDetail.name }}
                    </div>
                </div>
            </div>
        </div>
        <div style="padding: 12px" v-if="!trackDetail.tracking_number"><button class="tm-btn" id="tm-btn-show-form" @click="tmDetailModel.detail" type="button"><span>Add tracking number</span></button></div>
    </div>

    <!-- tracking select model -->
    <div id="TM-Modal" class="tm-modal-container" v-show="tmDetailModel.open" style="display: none">
        <div role="dialog" tabindex="-1" class="tm-components-modal__frame">
            <div role="document" class="tm-components-modal__content">
                <div class="tm-components-modal__header">
                    <div class="tm-components-modal__header-heading-container"><h1 class="tm-components-modal__header-heading">Add shipment - Order #<?php echo $post->ID?></h1></div>
                    <button type="button" id="tm-modal-close" @click="tmDetailModel.toggle" class="tm-components-button tm-has-icon" style="position:unset;margin-right:-8px;width:36px;">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path></svg>
                    </button>
                </div>

                <div class="tm-modal-body">
                    <div class="tm-input-box">
                        <div>
                            <label>Tracking number:
                                <t-input v-model="form.tracking_number" placeholder=""></t-input>
                                <span class="tm-modal-tips" v-html="error.num"></span>
                            </label>
                        </div>

                        <div>
                            <label>Carrier:
                                <t-select filterable v-model="form.slug" @change="changeSelectCourier" placeholder="" empty="No data">
                                    <t-option v-for="item in tmCouriersList" :value="item.slug" :label="item.name" :key="item.slug"></t-option>
                                </t-select>
                                <span class="tm-modal-tips" v-html="error.express"></span>
                            </label>
                            <a style="font-size:12px;" href="options-general.php?page=trackingmore-setting-admin">Update carrier list</a>
                        </div>

                        <div v-if="specialField.postal_code">
                            <label>Tracking postal code:
                                <t-input v-model="form.postal_code" placeholder="Enter postal code, e.g. 600100"></t-input>
                                <span class="tm-modal-tips" v-html="error.postal"></span>
                            </label>
                        </div>
                        <div v-if="specialField.destination_country">
                            <label>Tracking destination country:
                                <t-select v-model="form.destination_country" filterable placeholder="Select destination country" empty="No data">
                                    <t-option v-for="item in tmCountryRegion" :key="item.slug" :label="item.name" :value="item.slug"></t-option>
                                </t-select>
                                <span class="tm-modal-tips" v-html="error.country"></span>
                            </label>
                        </div>
                        <div v-if="specialField.origin_country">
                            <label>Tracking origin country:
                                <t-select v-model="form.origin_country" filterable placeholder="Select origin country" empty="No data">
                                    <t-option v-for="item in tmCountryRegion" :key="item.slug" :label="item.name" :value="item.slug"></t-option>
                                </t-select>
                                <span class="tm-modal-tips" v-html="error.or_country"></span>
                            </label>
                        </div>
                        <div v-if="specialField.ship_date">
                            <label>Tracking ship date:
                                <t-input v-model="form.ship_date" placeholder="Enter ship date, format: YYYYMMDD"></t-input>
                                <span class="tm-modal-tips" v-html="error.ship"></span>
                            </label>
                        </div>
                        <div v-if="specialField.account_number">
                            <label>Tracking courier account:
                                <t-input v-model="form.account_number" placeholder="Enter courier account, e.g. 12345"></t-input>
                                <span class="tm-modal-tips" v-html="error.account"></span>
                            </label>
                        </div>
                        <div v-if="specialField.key">
                            <label>Tracking key:
                                <t-input v-model="form.key" placeholder="Enter tracking key, e.g. 12345"></t-input>
                                <span class="tm-modal-tips" v-html="error.key"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tm-components-modal__footer">
                <t-button :disabled="disabled" :loading="tmDetailModel.loading" @click="submitTrack">{{ tmDetailModel.text }}</t-button>
            </div>

        </div>
    </div>

    <!-- tracking delete model -->
    <div class="tm-modal-container" v-show="tmDelModal.open" style="display: none">
        <div role="dialog" tabindex="-1" class="tm-components-modal__frame">
            <div role="document" class="tm-components-modal__content">
                <div class="tm-components-modal__header">
                    <div class="tm-components-modal__header-heading-container"><h1 class="tm-components-modal__header-heading">Delete shipments</h1></div>
                    <button type="button" @click="tmDelModal.toggle" class="tm-components-button tm-has-icon" style="position:unset;margin-right:-8px;width:36px;">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path></svg>
                    </button>
                </div>
                <div class="tm-modal-body">
                    <span>Are you sure you want to delete the selected tracking number.</span>
                </div>
            </div>
            <div class="tm-components-modal__footer">
                <t-button theme="default" @click="tmDelModal.toggle">Cancel</t-button>
                <t-button theme="danger" :loading="tmDelModal.loading" @click="tmDelModal.delete">Delete</t-button>
            </div>
        </div>
    </div>

</div>
<script>
    TMVue.use(TDesign)
    let app = new TMVue({
        el: "#trackingmore-app",
        data: function() {
            return {
                pattern: {
                    tracking_number: /^[0-9a-zA-Z-_]{5,50}$/,
                    postal_code: /^[\s|\w|+|-]{0,50}$/,
                    ship_date: /^[0-9]{8}$/,
                    account_number: /^.{0,50}$/,
                    key: /^[\s|\w|.|_|-]{0,50}$/,
                },
                tmTrackBtnText: "Add tracking number",
                tmAllCouriers: [],
                tmCountryRegion: [],
                tmCouriersList: [],
                form: {
                    tracking_number: "",
                    slug: "",
                    account_number: "",
                    destination_country: "",
                    origin_country: "",
                    postal_code: "",
                    ship_date: "",
                    key: "",
                },
                trackDetail: {},
                specialField: {
                    postal_code: false,
                    destination_country: false,
                    origin_country: false,
                    ship_date: false,
                    account_number: false,
                    key: false,
                },
                error: {
                    num: '',
                    express: '',
                    postal: '',
                    country: '',
                    or_country: '',
                    ship: '',
                    account: '',
                    key: '',
                },
                tmDetailModel: {
                    open: false,
                    loading: false,
                    text: 'Add',
                    toggle: () => {
                        this.tmDetailModel.open = !this.tmDetailModel.open
                        if (this.tmDetailModel.open) {
                            jQuery("body").addClass("tm-overHide")
                        } else {
                            jQuery("body").removeClass("tm-overHide")
                        }
                    },
                    detail: () => {
                        this.initField()
                        let that = this
                        that.tmDetailModel.text = that.form.tracking_number ? 'Save' : 'Add'

                        that.tmCouriersList = JSON.parse(JSON.stringify(that.tmTempCouriersList))
                        let select_courier = '<?php echo $GLOBALS['trackingmore']->couriers;?>'
                        let find_selected_provider = select_courier.indexOf( that.form.slug ) != -1;
                        if (!find_selected_provider && that.form.slug) {
                            jQuery.each(that.tmAllCouriers, function ( i, c ) {
                                if ( c.slug === that.form.slug ) {
                                    that.tmCouriersList.push(c);
                                }
                            })
                        }
                        this.checkSpecialField()
                        this.getTrackSingleDetail(true)
                    },
                },
                tmDelModal: {
                    open: false,
                    loading: false,
                    item: {},
                    toggle: (e) => {
                        this.tmDelModal.item = e
                        this.tmDelModal.open = !this.tmDelModal.open
                        if (this.tmDelModal.open) {
                            jQuery("body").addClass("tm-overHide")
                        } else {
                            jQuery("body").removeClass("tm-overHide")
                        }
                    },
                    delete: () => {
                        if ( this.tmDelModal.item === {} ) {
                            this.$notify.error({
                                title: 'Operation failed',
                                offset: [16,45],
                            })
                            return false
                        }
                        this.deleteTrack()
                    }
                }
            }
        },
        watch: {
            'form.tracking_number': {
                handler(v) {
                    if (!v) return this.error.num = "Tracking number format error"
                    return this.pattern.tracking_number.test(v) ? this.error.num = "" : this.error.num = "Tracking number format error"
                }
            },
            'form.slug': {
                handler(v) {
                    return v ? this.error.express = "" : this.error.express = "Please select courier"
                }
            },
            'form.postal_code': {
                handler(v) {
                    if (!this.specialField.postal_code) return this.error.postal = ""
                    return this.pattern.postal_code.test(v) ? this.error.postal = "" : this.error.postal = "Please enter the correct tracking postal code"
                }
            },
            'form.ship_date': {
                handler(v) {
                    if (!this.specialField.ship_date) return this.error.ship = ""
                    return this.pattern.ship_date.test(v) ? this.error.ship = "" : this.error.ship = "Please enter the correct tracking ship date"
                }
            },
            'form.account_number': {
                handler(v) {
                    if (!this.specialField.account_number) return this.error.account = ""
                    return this.pattern.account_number.test(v) ? this.error.account = "" : this.error.account = "Please enter the correct tracking courier account"
                }
            },
            'form.key': {
                handler(v) {
                    if (!this.specialField.key) return this.error.key = ""
                    return this.pattern.key.test(v) ? this.error.key = "" : this.error.key = "Please enter the correct tracking key"
                }
            },
        },
        computed: {
            disabled() {
                let isDisabled = false
                Object.keys(this.error).some((v) => {
                    if (this.error[v]) {
                        return isDisabled = true
                    }
                })
                if (isDisabled) return true

                if (!this.pattern.tracking_number.test(this.form.tracking_number)) {
                    this.error.num = "Tracking number format error"
                    return true
                }

                if (this.specialField.ship_date) {
                    if (!this.pattern.ship_date.test(this.form.ship_date)) return true
                }
                if (this.specialField.account_number) {
                    if (!this.form.account_number) return true
                    if (!this.pattern.account_number.test(this.form.account_number)) return true
                }
                if (this.specialField.postal_code) {
                    if (!this.form.postal_code) return true
                    if (!this.pattern.postal_code.test(this.form.postal_code)) return true
                }
                if (this.specialField.key) {
                    if (!this.form.key) return true
                    if (!this.pattern.key.test(this.form.key)) return true
                }
                if (this.specialField.destination_country) {
                    if (!this.form.destination_country) return true
                }
                if (this.specialField.origin_country) {
                    if (!this.form.origin_country) return true
                }

                return !(this.form.tracking_number && this.form.slug);
            }
        },
        created() {
            this.tmInit()
        },
        methods: {
            deleteTrack() {
                this.tmDelModal.loading = true
                let security = jQuery("#trackingmore_delete_nonce").val()
                jQuery.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: {
                        action: "trackingmore_delete_single_tracking",
                        order_id: <?php echo $post->ID?>,
                        security: security
                    },
                    success: res => {
                        this.tmDelModal.loading = false
                        this.tmDelModal.toggle()
                        if ( res.code !== 200 ) {
                            this.$notify.error({
                                title: 'Operation failed',
                                offset: [16,45],
                            })
                            return false
                        }
                        this.form = this.trackDetail =  {}
                        this.$notify.success({
                            title: 'Successful operation',
                            offset: [16,45],
                        })
                    }
                })
            },
            submitTrack() {
                this.tmDetailModel.loading = true
                let security = jQuery("#trackingmore_create_nonce").val()
                jQuery.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: {
                        action: "trackingmore_save_single_tracking",
                        order_id: <?php echo $post->ID?>,
                        slug: this.form.slug,
                        tracking_number: this.form.tracking_number,
                        key: this.form.key,
                        account_number: this.form.account_number,
                        destination_country: this.form.destination_country,
                        origin_country: this.form.origin_country,
                        postal_code: this.form.postal_code,
                        ship_date: this.form.ship_date,
                        security: security
                    },
                    success: res => {
                        this.tmDetailModel.loading = false
                        this.getTrackSingleDetail()
                        this.tmDetailModel.toggle()
                        if ( res.code !== 200 ) {
                            this.$notify.error({
                                title: 'Operation failed',
                                offset: [16,45],
                            })
                            return false
                        }
                        this.$notify.success({
                            title: 'Successful operation',
                            offset: [16,45],
                        })
                    }
                })
            },
            getTrackSingleDetail(Op) {
                let security = jQuery("#trackingmore_get_nonce").val()
                jQuery.ajax({
                    url: ajaxurl,
                    type: 'GET',
                    data: { action: 'trackingmore_get_single_tracking', security: security, order_id:<?php echo $post->ID?>},
                    success: res => {
                        if ( res.code === 200 ) {
                            this.form = res.data.trackings
                            this.trackDetail = JSON.parse( JSON.stringify( this.form ) )
                            if (Op) {
                                this.tmDetailModel.toggle()
                            }
                        }
                    }
                })
            },
            changeSelectCourier(slug){
                this.initField()
                this.checkSpecialField(slug)
            },
            checkSpecialField(slug) {
                let that = this

                if (slug) {
                    that.tmCouriersList = JSON.parse(JSON.stringify(that.tmTempCouriersList))
                    let select_courier = '<?php echo $GLOBALS['trackingmore']->couriers;?>'
                    let find_selected_provider = select_courier.indexOf(slug) != -1;
                    if (!find_selected_provider && slug) {
                        jQuery.each(that.tmAllCouriers, function ( i, c ) {
                            if ( c.slug === slug ) {
                                that.tmCouriersList.push(c);
                            }
                        })
                    }
                }

                if (that.form.slug) {
                    let c = that.tmCouriersList.find(item => item.slug === that.form.slug)
                    if ( c ) {
                        jQuery.each( c.required_fields, function ( k, v ) {
                            if ( v === "tracking_postal_code" ) {
                                that.specialField.postal_code = true
                            } else if ( v === "tracking_destination_country" ) {
                                that.specialField.destination_country = true
                            } else if ( v === "tracking_origin_country" ) {
                                that.specialField.origin_country = true
                            } else if ( v === "tracking_ship_date" ) {
                                that.specialField.ship_date = true
                            } else if ( v === "tracking_account_number" ) {
                                that.specialField.account_number = true
                            } else if ( v === "tracking_key" ) {
                                that.specialField.key = true
                            }
                        })
                    }
                }
            },
            // 初始化字段
            initField() {
                this.specialField = {
                    postal_code: false,
                    destination_country: false,
                    origin_country: false,
                    ship_date: false,
                    account_number: false,
                    key: false,
                }

                this.form.account_number = ""
                this.form.destination_country = ""
                this.form.origin_country = ""
                this.form.postal_code = ""
                this.form.ship_date = ""
                this.form.key = ""

                this.error = {
                    num: '',
                    express: '',
                    postal: '',
                    country: '',
                    or_country: '',
                    ship: '',
                    account: '',
                    key: '',
                }
            },
            tmInit() {
                let security = jQuery("#trackingmore_get_nonce").val()
                jQuery.ajax({
                    url: ajaxurl,
                    type: 'GET',
                    data: { action: 'trackingmore_get_order_init', security: security, order_id:<?php echo $post->ID?>},
                    success: res => {
                        if ( res.code === 200 ) {
                            this.tmAllCouriers = res.data.couriers
                            this.tmCouriersList = this.tmTempCouriersList = res.data.couriers_list
                            this.tmCountryRegion = res.data.country_region
                            this.form = res.data.trackings
                            this.trackDetail = JSON.parse( JSON.stringify( this.form ) )
                        }
                    }
                })
            },
        }
    })
</script>

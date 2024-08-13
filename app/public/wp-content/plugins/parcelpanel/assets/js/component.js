// 防抖函数
function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


/** Page of import tracking number */
PPVue.component('pp-page-import-tracking', {
  data() {
    return {
      step: 0,
      button1IsDisabled: false, // is uploading
      button2IsDisabled: false, // is importing

      isImportModalOpen: false,

      isShowAdvancedOptions: false,

      // isCSVFile: false, // 是否是 csv 文件
      filePath:'', // 文件在服务器中的路径
      csvDelimiter: '', // csv 分隔符
      isMapPreferences: false, // 是否使用上一次的映射
      fields: {}, // 导入字段
      headers: [], // 表头
      requiredFields: [], // 必须的字段
      mappedItems: [], // 映射字段

      CSV_IMPORT_ERROR_RETRY_NUM: 5, // 导入失败最大重试次数
      csvImportErrorNum: 0, // CSV 导入错误计数

      percentage: 0, // 导入进度
      importResult: {}, // 导入结果

      historyRecords: [], // 历史导入记录
      isOpenModal: false, // view details 模态框打开控制
      recordDetail: {}, // 历史导入详情
    }
  },
  created() {
    window.addEventListener('beforeunload', (event) => {
      if (this.button2IsDisabled) {
        event.preventDefault()
        event.returnValue = ''
      }
    })

    this.getHistoryUploadRecords()
  },
  // watch: {
  //   step(step) {
  //     console.log('step', step)
  //   },
  // },
  methods: {
    handleViewInstructionClick() {
      this.isImportModalOpen = true
    },
    handleContinueClick() {
      this.uploadFile()
    },
    /** 获取文件数据 */
    handleFileChange(data) {
      const fileName = data.target.files[0]?.name
      if (fileName?.length && !this._checkIsCsv(fileName)) {
        jQuery.toastr.warning('Sorry, this file type is not permitted!')
      }
    },
    _checkIsCsv(fileName = '') {
      let index = fileName.lastIndexOf('.')
      let ext = fileName.substring(index)
      return ext === '.csv'
    },
    /** csv文件上传 */
    uploadFile() {
      const file = this.$refs.fileRef.files[0]
      // if (this.showProgress) {
      //   jQuery.toastr.warning('Importing')
      //   return
      // }
      // todo 20220621 新版校验是否是 csv 文件的方式，其他上传框还没有修改
      if (!this._checkIsCsv(file?.name)) {
        jQuery.toastr.warning('Please choose a CSV file')
        return
      }
      // this.showProgress = true
      this.button1IsDisabled = true
      let formdata = new FormData()
      formdata.append('action', 'pp_upload_csv')
      formdata.append('import', file)
      formdata.append('_ajax_nonce', window.pp_param.upload_nonce)
      jQuery.ajax({
        type: 'POST',
        url: ajaxurl,
        data: formdata,
        cache: false,
        processData: false,
        contentType: false,
        complete() {
          // this.button1IsDisabled = false
        },
        success: res => {
          if (false === res.success) {
            // this.showProgress = false
            this.button1IsDisabled = false
            jQuery.toastr.error(res.msg || 'Upload failed! Unknown error')
            return
          }
          this.$refs.fileRef.value = ''
          this.filePath = res.data.file
          this.getMappingItems()
        },
        error() {
          this.button1IsDisabled = false
          jQuery.toastr.error('Server error, please try again or refresh the page')
        },
      })
    },
    getMappingItems() {
      const data = {
        action: 'pp_mapping_items_csv',
        _ajax_nonce: window.pp_param.import_nonce,
        file: this.filePath,
        delimiter: this.csvDelimiter,
        map_preferences: this.isMapPreferences,
      }
      jQuery.ajax({
        type: 'GET',
        url: ajaxurl,
        data,
        complete: () => {
          this.button1IsDisabled = false
        },
        success: res => {
          if (false === res.success) {
            jQuery.toastr.error(res.msg || 'Upload failed! Unknown error')
            return
          }
          this.fields = res.data.fields
          this.headers = res.data.headers.map(v => ({label: v, value: v}))
          this.headers.unshift({label: 'Select a column title', value: ''})
          this.requiredFields = res.data.required_fields
          this.mappedItems = res.data.mapped_items
          this.step = this.step + 1
        },
        error() {
          jQuery.toastr.error('Server error, please try again or refresh the page')
        },
      })
    },

    /** 获取历史上传数据 */
    getHistoryUploadRecords() {
      const data = {
        action: 'pp_tracking_number_import_record',
        _ajax_nonce: window.pp_param.get_history_nonce,
      }
      jQuery.ajax({
        type: 'GET',
        url: ajaxurl,
        data,
        success: res => {
          this.historyRecords = res.data
        },
      })
    },
    handleMapSelectChange(val, key) {
      this.mappedItems[key] = val
    },
    handleCsvDelimiterChange(val) {
      this.csvDelimiter = val
    },
    handleImportClick() {
      const isPass = this._checkRequiredFields()
      if (!isPass) return false
      this.step = this.step + 1
      this.button2IsDisabled = true
      // 重置错误次数
      this.csvImportErrorNum = 0
      this._importFile(this.filePath)
    },
    handleViewOrdersButtonClick() {
      window.location.href = window.pp_param.shipments_page_link
    },
    handleUploadAgainButtonClick() {
      this.step = 0
    },
    handleBackButtonClick() {
      window.location.href = window.location.href.replace(/#.*/, '')
    },

    handleShowAdvancedOptionsButtonClick() {
      this.isShowAdvancedOptions = !this.isShowAdvancedOptions
    },

    /** 关闭导入文件弹出层 */
    handleImportModalClose() {
      this.isImportModalOpen = false
    },

    /** 校验映射选项 */
    _checkRequiredFields() {
      const empty_required_fields = []
      this.requiredFields.forEach(field => {
        if (!this.mappedItems[field]) {
          empty_required_fields.push(this.fields[field])
        }
      })
      if (empty_required_fields.length) {
        if (empty_required_fields.length === 1) {
          jQuery.toastr.warning(empty_required_fields[0] + ' is required to map')
          // alert(empty_required_fields[0] + ' is required to map')
        } else {
          jQuery.toastr.warning('These fields are required to map: ' + empty_required_fields.join(', '))
          // alert('These fields are required to map: ' + empty_required_fields.join(', '))
        }
        return false
      }
      return true
    },

    /** 导入文件 */
    _importFile(file, id = 0, pos = 0) {
      const data = {
        file: file,
        id: id,
        delimiter: this.csvDelimiter,
        map_from: this.mappedItems,
        position: pos,
      }
      jQuery.ajax({
        type: 'POST',
        url: `${ ajaxurl }?action=pp_import_csv&_ajax_nonce=${ window.pp_param.import_nonce }`,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: res => {
          this.percentage = res.data.percentage
          if (res.data.percentage < 100) {
            this._importFile(file, res.data.id, res.data.position)
          } else {
            // 重置错误次数
            this.csvImportErrorNum = 0
            this.importResult = res.data
            this.getHistoryUploadRecords()
            setTimeout(() => {
              // 上传成功
              this.step = this.step + 1
              this.button2IsDisabled = false
              this.percentage = 0
            }, 1e3)
          }
        },
        error: () => {
          if (this.csvImportErrorNum < this.CSV_IMPORT_ERROR_RETRY_NUM) {
            this.csvImportErrorNum++
            // 2秒后重试
            setTimeout(() => this._importFile(file, id, pos), 2e3)
          } else {
            this.button2IsDisabled = false
            this.step = this.step - 1
            jQuery.toastr.error('Server error, please try again or refresh the page')
          }
        },
      })
    },

    showRecordDetail(val) {
      this.recordDetail = val
      this.isOpenModal = true
    },
  },
  template: `<div id="pp-page-import-tracking" class="pp-wrap">
<div style="margin-top:20px"><a class="pp-btn-back" @click="handleBackButtonClick">back</a></div>
<h2>Import tracking number</h2>
<div class="woocommerce-progress-form-wrapper">
<pp-steps :active="step">
<pp-step title="Upload CSV file"/>
<pp-step title="Column mapping"/>
<pp-step title="Import"/>
<pp-step title="Done!"/>
</pp-steps>

<div v-if="step === 0">
<div class="pp-card" style="margin:0;">
<div class="pp-card-header" style="flex-direction:column;align-items:flex-start;">
<h3>Select CSV file to import</h3>
<p class="pp-m-t-2 pp-m-b-1 pp-text-subdued">Your CSV file should have following columns:</p>
<p class="pp-text-subdued"><b>Required:</b> Order number, Tracking number</p>
<p class="pp-text-subdued"><b>Optional:</b> Courier, SKU, Qty, Date shipped, Mark order as Completed</p>
<div class="pp-m-t-2 pp-text-subdued" style="display:flex">
<p>Note:&nbsp;</p>
<ol style="position:relative;left:16px;margin:0;line-height:20px">
<li style="margin:0">Product sku and quantity are required if you need to ship the items in one order into multiple packages. <a href="https://docs.parcelpanel.com/woocommerce/article/how-to-import-tracking-number-with-a-csv-file/" target="_blank">Learn more</a>.</li>
<li style="margin:0">If the total quantity shipped exceeds the total quantity of items in an order, the system will automatically adjust to the maximum shippable quantity of the items.</li>
</ol>
</div>
</div>
<div class="pp-card-body" style="padding-bottom:0;box-shadow:inset 0 -1px 0 #ddd">
<table class="form-table pp-importer-options">
<tr>
<th class="row">
<span class="pp-label">Choose a local file</span>
</th>
<td>
<input type="file" ref="fileRef" accept=".csv" @change="handleFileChange"/>
</td>
</tr>
<tr>
<th><span class="pp-label">Mapping preferences</span><br></th>
<td>
<checkbox-control v-model="isMapPreferences" label="Enable this feature to save previous column mapping settings automatically"/>
</td>
</tr>
<tr v-show="isShowAdvancedOptions">
<th><span class="pp-label">CSV Delimiter</span><br></th>
<td>
<div style="display:flex">
  <inputtext w="68px" minw="68px" h="32px" pvalue="" :showtext="false" placeholder="," :input-value="csvDelimiter" @change_value="handleCsvDelimiterChange" style="width:auto"/>
  <p style="margin:0 0 0 8px">This sets the separator of your CSV files to separates the data in your file into distinct fields</p>
</div>
</td>
</tr>
</table>
</div>
<div class="pp-card-body">
<pp-stack style="align-items:center;">
<pp-stack-item>
<a @click="handleShowAdvancedOptionsButtonClick">{{ isShowAdvancedOptions ? 'Hide advanced options' : 'Show advanced options' }}</a>
</pp-stack-item>
<pp-stack-item fill/>
<pp-stack-item>
<pp-button variant="primary" :isBusy="button1IsDisabled" :disabled="button1IsDisabled" @click="handleContinueClick">Continue</pp-button>
</pp-stack-item>
</pp-stack>
</div>
</div>
<p style="margin:4px 0 0;font-size:14px">You can also copy or download a sample template to import tracking numbers. <a @click="handleViewInstructionClick">View instruction</a></p>
</div>

<div v-if="step === 1">
<div class="pp-card">
<div class="pp-card-header" style="flex-direction:column;align-items:flex-start;">
<h3>Map CSV fields to orders</h3>
<p class="pp-text-subdued pp-m-t-1">Select fields from your CSV file to map against orders fields.</p>
</div>
<div style="margin:-16px 0 0;">

<table class="pp-importer-mapping-table">
<thead>
<tr>
<th width="50%">Column name</th>
<th>Map to field</th>
</tr>
</thead>

<tbody>
<tr v-for="(val, key) in fields">
<td class="wc-importer-mapping-table-name">
<select-control :def="mappedItems[key] || ''" :list="headers" @change_value="handleMapSelectChange($event, key)"/>
</td>
<td>
{{ val }}
<strong v-if="requiredFields.includes(key)">(*Required)</strong>
<template v-else>(Optional)</template>
</td>
</tr>
</tbody>
</table>

</div>
<div class="pp-card-body" style="border-top:1px solid #ddd;">
<pp-stack>
<pp-stack-item fill/>
<pp-stack-item>
<pp-button variant="primary" :isBusy="button2IsDisabled" :disabled="button2IsDisabled" @click="handleImportClick">Import</pp-button>
</pp-stack-item>
</pp-stack>
</div>
</div>
</div>

<div v-if="step === 2">
<div class="pp-card">
<div class="pp-card-header" style="flex-direction:column;align-items:flex-start;">
<h3>Importing</h3>
<p class="pp-text-subdued pp-m-t-1">Your orders are now being imported…</p>
</div>
<div class="pp-card-body">
  <div class="pp-m-t-4" style="width: 100%">
    <div class="pp-m-b-1" style="display:flex">
      <div><p>Uploading:</p></div>
      <div style="flex: 1;text-align: right;"><p>{{ percentage }}%</p></div>
    </div>
    <pp-progress :w="percentage"></pp-progress>

    <p class="pp-m-t-1"><strong>Please DO NOT close or refresh this page before it was completed.</strong></p>
  </div>
</div>
</div>
</div>

<div v-if="step === 3">
<div class="pp-card">
<div class="pp-card-body" style="box-shadow:rgb(221 221 221) 0 -1px 0 inset">
<div style="text-align:center">
  <span style="display:inline-block;width:72px;vertical-align:top;fill:var(--wp-admin-theme-color);"><svg style="display:block;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 10a10 10 0 1 0 20 0 10 10 0 0 0-20 0zm15.2-1.8a1 1 0 0 0-1.4-1.4l-4.8 4.8-2.3-2.3a1 1 0 0 0-1.4 1.4l3 3c.4.4 1 .4 1.4 0l5.5-5.5z"/></svg></span>
  <p style="margin-top:8px;color:var(--wp-admin-theme-color);font-weight:600;font-size:16px;line-height:24px;">Import Completed</p>
  <div style="display:inline-block;margin-top:20px;text-align:left">
    <p><span style="margin-top:1px;margin-right:4px;display:inline-block;width:16px;fill:#00d2af;vertical-align:top;"><svg style="display:block;" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 10a10 10 0 1 0 20 0 10 10 0 0 0-20 0zm15.2-1.8a1 1 0 0 0-1.4-1.4l-4.8 4.8-2.3-2.3a1 1 0 0 0-1.4 1.4l3 3c.4.4 1 .4 1.4 0l5.5-5.5z"/></svg>
</span><span>{{ importResult.succeeded }} tracking numbers imported successfully</span></p>
    <p class="pp-m-t-1"><span style="margin-top:1px;margin-right:4px;display:inline-block;width:16px;fill:#ff4c36;vertical-align:top;"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10-10-4.486-10-10zm7.707-3.707a1 1 0 0 0-1.414 1.414l2.293 2.293-2.293 2.293a1 1 0 1 0 1.414 1.414l2.293-2.293 2.293 2.293a1 1 0 0 0 1.414-1.414l-2.293-2.293 2.293-2.293a1 1 0 0 0-1.414-1.414l-2.293 2.293-2.293-2.293z"/></svg>
</span><span>{{ importResult.failed }} tracking numbers imported failed, <a @click="showRecordDetail(importResult)">view details</a></span></p>
  </div>
  <div class="pp-m-t-5">
  <pp-stack style="justify-content:center;">
    <pp-stack-item><pp-button variant="primary" @click="handleViewOrdersButtonClick">View shipments</pp-button></pp-stack-item>
    <pp-stack-item><pp-button variant="primary" @click="handleUploadAgainButtonClick">Upload again</pp-button></pp-stack-item>
  </pp-stack>
  </div>
</div>
</div>
<div class="pp-card-body">
<div style="margin-bottom:10px"><h4 style="margin:0">Import records</h4></div>
<p v-for="val in historyRecords" class="pp-m-t-1">{{ val.date }} Uploaded {{ val.filename }}, {{ val.total }} tracking numbers, failed to upload {{ val.failed }}, <a @click="showRecordDetail(val)">view details.</a></p>
</div>
</div>
</div>

</div>

<modal @cancel="isOpenModal=false" :open="isOpenModal" title="View details" cancel="Close">
<div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Import file name:</div>
    <div>{{ recordDetail.filename }}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Total tracking numbers:</div>
    <div>{{ recordDetail.total }}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Succeeded:</div>
    <div>{{ recordDetail.succeeded }}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Failed:</div>
    <div>{{ recordDetail.failed }}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Details:</div>
    <div>
      <p v-for="(val, index) in recordDetail.details" :key="index" class="pp-m-t-1">{{ val }}</p>
    </div>
  </div>
</div>
</modal>
  
<pp-import-tracking-modal :open="isImportModalOpen" @close="handleImportModalClose"/>

<pp-popup-pic></pp-popup-pic>
</div>`,
})


PPVue.component('pp-import-tracking-modal', {
  props: {
    open: Boolean,
  },
  data() {
    return {
      CSV_IMPORT_ERROR_RETRY_NUM: 5,
      pageParam: window.pp_param,
      isOpenModal: false, // 模态框
      isExporting: false, // 导出中
      percentage: 0, // 进度条百分比
      fileFlow: [], // 文件
      isShowDetails: false, // 是否显示详情页
      showProgress: false, // 是否显示进度条
      Details: {}, // modal 详情页
      HistoryRecords: [], // 历史上传记录
      isCSVFile: false,
      isOpened: false, // 是否打开过
    }
  },
  created() {
    window.addEventListener('beforeunload', (e) => {
      if (this.showProgress) {
        e.preventDefault()
        e.returnValue = ''
      }
    })

    this.getHistoryUploadRecords()
  },
  watch: {
    open(open) {
      this.isOpenModal = open
    },
  },
  methods: {
    /** 获取文件数据 */
    getFile(data) {
      this.fileFlow = data.target.files
      let fileName = this.fileFlow[0].name
      let index = fileName.lastIndexOf('.')
      let ext = fileName.substr(index + 1)
      if (ext !== 'csv') {
        this.isCSVFile = false
        jQuery.toastr.warning('Sorry, this file type is not permitted!')
      } else {
        this.isCSVFile = true
      }
    },

    /** csv文件上传 */
    uploadFile(data) {
      if (this.showProgress) {
        jQuery.toastr.warning('Importing')
        return
      }
      if (!this.isCSVFile) {
        jQuery.toastr.error('Please choose a CSV file')
        return
      }
      this.showProgress = true
      this.percentage = 1
      let fileFlow = this.fileFlow[0]
      let formdata = new FormData()
      formdata.append('action', 'pp_upload_csv')
      formdata.append('import', fileFlow)
      formdata.append('_ajax_nonce', window.pp_param.upload_nonce)
      jQuery.ajax({
        type: 'POST',
        url: ajaxurl,
        data: formdata,
        cache: false,
        processData: false,
        contentType: false,
        success: res => {
          if (false === res.success) {
            this.showProgress = false
            jQuery.toastr.error(res.msg || 'Upload failed! Unknown error')
            return
          }
          this.jQueryrefs.iptFile.value = ''
          // 重置错误次数
          this.csvImportErrorNum = 0
          this.importFile(res.data.file)
        },
        error() {
          jQuery.toastr.error('Server error, please try again or refresh the page')
        },
      })
    },

    /** 导入文件 */
    importFile(file, id = 0, pos = 0) {
      jQuery.ajax({
        type: 'POST',
        url: ajaxurl,
        data: {
          _ajax_nonce: window.pp_param.import_nonce,
          action: 'pp_import_csv',
          file: file,
          id: id,
          position: pos,
        },
        success: res => {
          this.percentage = res.data.percentage
          if (res.data.percentage < 100) {
            this.importFile(file, res.data.id, res.data.position)
          } else {
            // 重置错误次数
            this.csvImportErrorNum = 0
            this.Details = res.data
            this.getHistoryUploadRecords()
            setTimeout(() => {
              this.isShowDetails = true
              this.percentage = 0
              this.showProgress = false
            }, 1e3)
          }
        },
        error: () => {
          if (this.csvImportErrorNum < CSV_IMPORT_ERROR_RETRY_NUM) {
            this.csvImportErrorNum++
            // 2秒后重试
            setTimeout(() => this.importFile(file, id, pos), 2e3)
          } else {
            jQuery.toastr.error('Server error, please try again or refresh the page')
          }
        },
      })
    },


    /** 获取历史上传数据 */
    getHistoryUploadRecords() {
      let newData = {
        action: 'pp_tracking_number_import_record',
        _ajax_nonce: window.pp_param.get_history_nonce,
      }
      jQuery.ajax({
        type: 'GET',
        url: ajaxurl,
        data: newData,
        success: res => {
          this.HistoryRecords = res.data
        },
      })
    },

    /** 隐藏 or 显示 details 页面 */
    isShowDetailView(val) {
      this.isShowDetails = !this.isShowDetails
      if (this.isShowDetails) {
        this.Details = val
      }
    },

    handleModalCancel() {
      this.$emit('close')
      this.isOpenModal = false
    },
  },
  template: `<modal @ok="uploadFile" @cancel="handleModalCancel" :open="isOpenModal" title="Import tracking number" cancel="Close" :confirm="isShowDetails ? null : 'Import'">
<div v-show="!isShowDetails">
  <div>
    <p class="pp-m-y-0">Step 1: Copy the <a href="https://docs.google.com/spreadsheets/d/1NEJqC-yS0GoAkFx5jCqyVstP-tDgPvqle_hbksFWZ4g/copy" target="_blank">sample template</a> on Google Sheets(strongly recommend) or download
      <a :href="pageParam.import_template_file_link" target="_blank">this CSV file</a>.</p>
    <p class="pp-m-t-4">Step 2: Fill in the data following the <a href="https://docs.parcelpanel.com/woocommerce/article/57" target="_blank">Import Template Instructions</a>. Tracking number that do not comply with the instructions will not be imported.</p>
    <p class="pp-m-t-4">Step 3: Download the file in a CSV format and upload it.</p>
  </div>

  <div v-show="!showProgress" class="pp-m-t-4"><input type="file" ref="iptFile" @change="getFile" accept=".csv" style="padding:0;height:36px;line-height:36px"></div>
  <div v-show="showProgress" class="pp-m-t-4" style="width: 100%">
    <div class="pp-m-b-1" style="display:flex">
      <div><p>Uploading:</p></div>
      <div style="flex: 1;text-align: right;"><p>{{percentage}}%</p></div>
    </div>
    <pp-progress :w="percentage"></pp-progress>

    <p class="pp-m-t-1"><strong>Please DO NOT close or refresh this page before it was completed.</strong></p>
  </div>

  <div class="pp-m-t-5" style="margin-bottom: 10px"><h4 style="margin: 0">Import records</h4></div>
  <p v-for="val in HistoryRecords" class="pp-m-t-1">{{ val.date }} Uploaded {{ val.filename }}, {{ val.total }} tracking numbers, failed to upload {{ val.failed }}, <a @click="isShowDetailView(val)">view details.</a></p>
</div>
<div v-show="isShowDetails">
  <div class="pp-m-b-3">
    <a @click="isShowDetailView" class="pp-btn-back">back</a>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Import file name:</div>
    <div>{{Details.filename}}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Total tracking numbers:</div>
    <div>{{Details.total}}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Succeeded:</div>
    <div>{{Details.succeeded}}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Failed:</div>
    <div>{{Details.failed}}</div>
  </div>
  <div class="pp-import-record-detail-row pp-m-t-1">
    <div>Details:</div>
    <div>
      <p v-for="(val, index) in Details.details" :key="index" class="pp-m-t-1">{{val}}</p>
    </div>
  </div>
</div>
</modal>`,
})

PPVue.component('pp-stack', {
  template: `<div class="pp-stack"><slot/></div>`,
})
PPVue.component('pp-stack-item', {
  props: {
    fill: Boolean,
  },
  template: `<div class="pp-stack__item" :class="{ 'pp-stack__item--fill': fill }"><slot/></div>`,
})


/** 步骤条组件 */
PPVue.component('pp-steps', {
  props: {
    active: Number,
    finishStatus: {
      type: String,
      default: 'done',
    },
    processStatus: {
      type: String,
      default: 'active',
    },
  },
  data() {
    return {
      steps: [],
    }
  },
  watch: {
    // active(newVal, oldVal) {
    //   this.$emit('change', newVal, oldVal);
    // },
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index
      })
    },
  },
  template: `<ol class="pp-progress-steps"><slot/></ol>`,
})

/** 步骤条节点组件 */
PPVue.component('pp-step', {
  props: {
    title: String,
  },
  data() {
    return {
      index: -1,
      lineStyle: {},
      internalStatus: '',
    };
  },
  beforeCreate() {
    this.$parent.steps.push(this)
  },
  beforeDestroy() {
    const steps = this.$parent.steps
    const index = steps.indexOf(this)
    if (index >= 0) {
      steps.splice(index, 1)
    }
  },
  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, {immediate: true})
      // this.$watch('$parent.processStatus', () => {
      //   const activeIndex = this.$parent.active
      //   this.updateStatus(activeIndex)
      // }, {immediate: true})
      unwatch()
    })
  },
  methods: {
    updateStatus(val) {
      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus
      } else if (val === this.index) {
        this.internalStatus = this.$parent.processStatus
      } else {
        this.internalStatus = 'wait'
      }
    },
  },
  template: '<li :class="`is-${internalStatus}`">{{ title }}</li>',
})

// 开关组件
PPVue.component('toggle-control', {
  model: {
    event: 'change',
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  template: `<div>
<span class="components-form-toggle" :class="{'is-checked': value, 'is-disabled': disabled}">
  <input @change="$emit('change', $event.target.checked)" v-model="value" :disabled="disabled" class="components-form-toggle__input" type="checkbox">
  <span class="components-form-toggle__track"></span>
  <span class="components-form-toggle__thumb"></span>
</span>
</div>`,
})

// 复选框组件
PPVue.component('checkbox-control', {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    label: String,
    checked: Boolean,
    id: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e.target.checked, this.id)
      // 兼容旧版本 TODO 后期考虑全部转到新事件上
      this.$emit('get_id', this.id, e.target.checked)
    },
  },
  template: `<label class="PP-Choice components-checkbox-control__label"><span class="components-checkbox-control__input-container">
<input v-model="checked" @change="handleChange" type="checkbox" class="components-checkbox-control__input"/>
<!--复选框需要有这个才会显示图标，具体我也不知道为啥-->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" class="components-checkbox-control__checked" aria-hidden="true" focusable="false"><path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 1.2 5.8 4.3 9.3-12.6z"></path></svg>
</span><span class="PP-Choice__Label">{{label}}</span></label>`,
})

// 面板折叠框组件
PPVue.component('panel-toggle', {
  data: () => {
    return {
      open: false,
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '默认标题',
    },
  },
  mounted() {
    if (this.isOpen !== this.open) {
      this.open = this.isOpen
    }
  },
  template: `<div class="components-panel__body" :class="{'is-opened': open}">
  <div class="components-panel__body-title" @click="open = !open">
    <slot name="title" v-if="$slots.title"></slot><span v-else>{{title}}</span>
    <svg v-if="open" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="components-panel__arrow" role="img" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>
    <svg v-else width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="components-panel__arrow" role="img" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>
  </div>
  <!-- 显示的内容 -->
  <div v-if="open">
    <slot></slot>
  </div>
</div>`,
})

// 多选框组件
PPVue.component('select-control', {
  props: {
    label: {
      type: String,
    },
    helpText: {
      type: String,
    },
    list: {
      type: Array,
      default() {
        return [
          {
            label: '第1个选项',
            value: '1',
            disabled: true,
          },
          {
            label: '第2个选项',
            value: '2',
            disabled: false,
          },
        ]
      },
    },
    def: {
      type: String,
      default: '1',
    },
  },
  methods: {
    change(e) {
      // console.log(e.target.value)
      let val = e.target.value
      this.$emit('change_value', val, this.pvalue)
    },
  },
  template: `<div  class="components-base-control">
<div class="components-base-control__field">
  <div data-wp-component="Flex"
       class="components-flex components-select-control">
    <div v-if="label" data-wp-component="FlexItem"
         class="components-flex-item">
      <label data-wp-component="Text"
        class="components-truncate components-text components-input-control__label"
        >{{label}}</label>
    </div>

    <div class="components-input-control__container">
      <select 
        v-model="def"
        class="components-select-control__input" 
        style="height:36px "
        @input="change($event)"
      >
        <option 
          v-for="(item, index) in list" 
          :key="index" 
          :disabled="item.disabled" 
          :value="item.value"
        >
          {{item.label}}
        </option>
      </select>
      <div aria-hidden="true" class="components-input-control__backdrop"></div>
    </div>
  </div>
</div>

<p v-if="helpText" class="components-base-control__help">{{helpText}}</p>
</div>`,
})

// 弹窗组件
PPVue.component('modal', {
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    open: Boolean,
    cancel: {
      type: String,
      default: 'Cancel',
    },
    confirm: String,
    okType: String,
  },
  mounted() {
    if (this.isOpen !== this.open) {
      this.isOpen = this.open
    }
  },
  watch: {
    open(newValue) {
      this.isOpen = newValue
    },
  },
  methods: {
    onCancel() {
      this.isOpen = false
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('ok')
    },
  },
  template: `<div v-if="isOpen" class="components-modal__screen-overlay pp-modal">
    <div class="components-modal__frame" role="dialog" tabindex="-1">
      <div class="components-modal__content" style="display:flex;flex-direction:column;" role="document">
        <div class="components-modal__header">
          <!--标题-->
          <div class="components-modal__header-heading-container">
            <h1 class="components-modal__header-heading">{{title}}</h1>
          </div>

          <!--关闭按钮-->
          <button @click="onCancel" type="button" class="components-button has-icon" style="position: unset;margin-right:-8px;" aria-label="Close dialog">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"/></svg>
          </button>
        </div>

        <div class="pp-modal-body">
          <slot></slot>
        </div>
      </div>
      <div class="components-modal__footer">
        <slot name="footer"></slot>
        <pp-button v-show="cancel" variant="secondary" @click="onCancel">{{cancel}}</pp-button>
        <pp-button v-show="confirm" variant="primary" :is-destructive="'destructive' === okType" @click="onConfirm">{{confirm}}</pp-button>
      </div>
    </div>
  </div>`,
})

// 按钮
PPVue.component('pp-button', {
  props: {
    loading: Boolean,  // loading 和 is-busy 都可以做加载状态样式
    isBusy: Boolean,
    isLink: Boolean,
    disabled: Boolean,
    isDestructive: Boolean,
    variant: String,
  },
  methods: {
    submit(e) {
      if (this.loading || this.disabled || this.isBusy) {
        e.preventDefault()
        return
      }
      this.$emit('click')
    },
  },
  computed: {
    className: {
      get() {
        const pre = 'pp-button'
        return {
          'components-button': true,
          [`${ pre }`]: true,
          [`is-${ this.variant }`]: this.variant,
          'is-destructive': this.isDestructive,
          'is-busy': this.isBusy,
          'is-link': this.isLink,
          [`${ pre }-loading`]: this.loading,
          'has-icon': !!this.$slots.icon,
        }
      },
    },
  },
  template: `
<button
  type="button"
  :class="className"
  :disabled="disabled"
  @click="submit"
>
  <span v-if="loading" role="img" aria-label="loading" class="icon icon-loading"><svg focusable="false" class="icon-spin" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg></span>
  <slot name="icon"></slot>
  <span><slot></slot></span>
</button>`,
})


// icon按钮
PPVue.component('pp-icon-button', {
  data() {
    return {
      buttonClassList: ['is-primary', 'is-secondary', 'is-destructive', 'is-primary is-destructive'], // 按钮样式
    }
  },
  props: {
    id: {
      type: String,
      default: '0', // 按钮样式 0123   
    },
  },
  methods: {
    submit() {
      // console.log(this.id)
      this.$emit('click')
    },
  },
  template: `
<button 
  type="button" 
  class="components-button pp-button"
  :class="buttonClassList[id]"
  @click="submit"
>
  <slot></slot>
</button>`,
})


// inputText组件
PPVue.component('inputtext', {
  data() {
    return {}
  },
  props: {
    showtext: { // 是否打开input组件上方文字
      type: Boolean,
      default: true,
    },
    pvalue: {
      type: String,
      default: 'text', // 组件上方文本
    },
    minw: {
      type: String,
      default: '200px', // 最小宽度
    },
    h: {
      type: String,
      default: '36px', // 长度
    },
    maxw: {
      type: String,
      default: '100%', // 最大宽度
    },
    w: {
      type: String,
      default: '36px', // 宽度
    },
    placeholder: String,  // placeholder
    inputValue: String,  // inputvalue
    disabled: Boolean,
  },
  methods: {
    change(e) {
      // console.log(e.target.value);
      let val = e.target.value
      this.$emit('change_value', val, this.pvalue)
    },
  },
  template: `
<div style="height: 100%; width: 100%">
  <p v-show="showtext" class="pp-m-b-1">{{pvalue}}</p>
  <input
    id="theme-container-width"
    class="components-placeholder__input"
    :style="{height: h, width: w, maxWidth: maxw, minWidth: minw}"
    style="border-radius: 2px; margin: 0;"
    type="text" 
    :placeholder="placeholder" 
    :value="inputValue"
    :disabled="disabled"
    @input="$emit('change_value', $event.target.value)"
  />
</div>
`,
})


// area-control组件
PPVue.component('text-area-control', {
  data() {
    return {}
  },
  props: {
    labeltext: {
      type: String,
      default: 'text', // 组件上方文本
    },
    message: {
      type: String,
      default: 'init Text',
    },
    placeholder: String,
  },
  methods: {
    change(e) {
      // console.log(e.target.value);
      let val = e.target.value
      this.$emit('change_value', val)
    },
  },

  template: `<div class="components-base-control__field">
<label class="components-base-control__label">{{labeltext}}</label>
<textarea 
  class="components-textarea-control__input" 
  rows="4" 
  aria-describedby="inspector-textarea-control-5__help"
  style="width:100%;height:100px;border-radius:2px"
  v-model="message"
  @input="change($event)"
  :placeholder="placeholder"
></textarea></div>`,
})


// tab组件
PPVue.component('select-tab', {
  props: {
    bool: {
      type: Boolean,
      default: true,
    },
    tab1Text: String,
    tab2Text: String,
  },
  data() {
    return {
      bool: this.$props.bool,  // 默认为激活状态
    }
  },
  methods: {
    toggleTabs: function (b) {
      this.bool = b
      this.$emit('enabled', b)
    },
  },
  template: `
<div class="my-tab-panel">
  <ul class="components-tab-panel__tabs pp-m-t-0 pp-m-b-0" style="border-bottom: 1px solid #F0F0F0;">
    <li class="components-button components-tab-panel__tabs-item tab-one" :class="{'is-active':!bool}" @click="toggleTabs(false)">{{tab1Text}}</li>
    <li class="components-button components-tab-panel__tabs-item tab-one" :class="{'is-active':bool}" @click="toggleTabs(true)">{{tab2Text}}</li>
  </ul>
</div>`,
})


// 进度条组件
PPVue.component('pp-progress', {
  data() {
    return {}
  },
  props: {
    w: {
      type: Number,
      default: 20, // 进度条进度
    },
  },
  methods: {},
  template: `
<div style="width: 100%;height: 20px;border-radius: 3px;overflow: hidden;background-color: #e0e1e3;">
  <div style="height: 100%; background-color: rgb(1, 103, 162); transition: all .3s;" :style="{width: w+'%'}"></div>
</div>
`,
})


// 搜索框组件
PPVue.component('pp-search', {
  data() {
    return {}
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {},
  template: `
  <div>
    <div class="components-base-control components-search-control">
      <div class="components-base-control__field">
        <div class="components-search-control__input-wrapper">
          <input class="components-search-control__input" id="components-search-control-0" type="search" placeholder="Search" autocomplete="off" value="">
            <div class="components-search-control__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false">
                <path d="M13.5 6C10.5 6 8 8.5 8 11.5c0 1.1.3 2.1.9 3l-3.4 3 1 1.1 3.4-2.9c1 .9 2.2 1.4 3.6 1.4 3 0 5.5-2.5 5.5-5.5C19 8.5 16.5 6 13.5 6zm0 9.5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z">
                </path>
              </svg>
            </div>
        </div>
      </div>
    </div>
  </div>
  `,
})


// Radio
PPVue.component('pp-radio-button', {
  data() {
    return {}
  },
  props: {
    id: String,
    disabled: Boolean,
    submit: Boolean,
    selected: Boolean,
  },
  methods: {
    onClick(e) {
      if (this.disabled) {
        return
      }

      if (this.submit) {
        return true
      }

      this.$emit('click', e)
    },
    onFocus(e) {
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.$emit('blur', e)
    },
  },
  computed: {
    isDisabled() {
      return this.disabled
    },
    classes() {
      return {
        'components-button': true,
        'is-secondary': !this.selected,
        'is-primary': this.selected,
      }
    },
  },
  template: `<button
  type="button"
  :id="id"
  :class="classes"
  role="radio"
  :disabled="isDisabled"
  @click="onClick"><slot></slot></button>`,
})


// Radio Group
PPVue.component('pp-radio-group', {
  data() {
    return {}
  },
  props: {},
  methods: {},
  template: `<div role="radiogroup" class="components-button-group" aria-label="options"><slot></slot></div>`,
})


// Vue Select
PPVue.component('pp-select', VueSelect.VueSelect)


// Code Mirror
PPVue.component('pp-codemirror', {
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default() {
        return {
          mode: 'text/javascript',
          lineNumbers: true,
          lineWrapping: true,
        }
      },
    },
  },
  data() {
    return {
      skipNextChangeEvent: false,
    }
  },
  ready() {
    this.editor = wp.CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
    this.editor.setValue(this.value)
    this.editor.on('change', cm => {
      if (this.skipNextChangeEvent) {
        this.skipNextChangeEvent = false
        return
      }
      this.value = cm.getValue()
      if (!!this.$emit) {
        this.$emit('change', cm.getValue())
      }
    })
  },
  mounted() {
    this.editor = wp.CodeMirror.fromTextArea(this.$el.querySelector('textarea'), this.options)
    this.editor.setValue(this.value)
    this.editor.on('change', cm => {
      if (this.skipNextChangeEvent) {
        this.skipNextChangeEvent = false
        return
      }
      if (!!this.$emit) {
        this.$emit('change', cm.getValue())
        this.$emit('input', cm.getValue())
      }
    })
  },
  watch: {
    value(newVal, oldVal) {
      const editorValue = this.editor.getValue()
      if (newVal !== editorValue) {
        this.skipNextChangeEvent = true
        const scrollInfo = this.editor.getScrollInfo()
        this.editor.setValue(newVal)
        this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
      }
    },
    options(newOptions, oldVal) {
      if (typeof newOptions === 'object') {
        for (const optionName in newOptions) {
          if (newOptions.hasOwnProperty(optionName)) {
            this.editor.setOption(optionName, newOptions[optionName])
          }
        }
      }
    },
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.toTextArea()
    }
  },
  template: `<div class="vue-codemirror-wrap"><textarea></textarea></div>`,
})

PPVue.component('pp-notice', {
  props: {
    status: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['info', 'success', 'warning', 'error'].indexOf(value) !== -1
      },
    },
  },
  computed: {
    getStatus() {
      return `notice-${ this.status }`
    },
  },
  template: `<div class="notice" :class="getStatus" style="position:relative;margin-left: 0;margin-right: 0;">
<slot></slot>
<a class="notice-dismiss" style="text-decoration: none" @click="$emit('close')"></a>
</div>`,
})

// Vue Slider
PPVue.component('vue-slider', window['vue-slider-component'])


PPVue.component('pp-post-layer', {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    template: {
      type: Number,
      default: 'info',
    },
    userName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isLoadIntercom: false,
    }
  },

  created() {

    const observer = new MutationObserver(mutations => {
      mutations.forEach(({addedNodes, previousSibling}) => {
        addedNodes.forEach((node) => {
          if ('intercom-lightweight-app' === node.className && 'intercom-frame' === previousSibling?.id) {
            // 启动了 Intercom
            this.isLoadIntercom = true
          } else if (node.children?.['intercom-borderless-frame']) {
            /* 显示了消息会话窗口 */
            this.closeHandle()
          }
        })
      })
    })

    observer.observe(document.body, {childList: true, subtree: true})
  },

  mounted() {
    // 如果打开了，就主动关闭 POST
    window.PPLiveChat('onShow', () => {
      this.$emit('show', false)
    })

    // 自定义的 intercom 占位符存在了, 也可以算是 isLoadIntercom
    if (jQuery('.pp-intercom-loader-placeholder').length) {
      this.isLoadIntercom = true
    }
  },

  methods: {
    closeHandle() {
      this.$emit('show', false)
    },

    newMsgHandle() {
      this.showNewMessage()
    },

    showNewMessage() {
      this.closeHandle()
      window.PPLiveChat('showNewMessage', '')
    },
  },

  // 【注意】模板内谨慎换行，换行会影响 inline-block 内部元素的间距
  template: `<transition name="slide-fade">
<div class="pp-post-layer" v-show="isLoadIntercom && isShow" @click.stop="newMsgHandle">
<header class="pp-post-layer-header"><div class="logo"><img src="https://static.intercomassets.com/avatars/3673103/square_128/Screenshot_2021-10-29_104652-1635475918.png?1635475918" alt="Lexie profile"></div><div class="title"><div><span class="pp-post-layer-nickname">Lexie </span>from Parcel Panel</div><div><span class="badge"></span>Active</div></div><span class="close" @click.stop="closeHandle"></span></header>

<!-- 打招呼 -->
<template v-if="template === 2">
  <post-layer-template-greet-post/>
</template>

<!-- 订单页面需要帮助显示的 -->
<template v-if="template === 3">
  <post-layer-template-order-message-post/>
</template>

<div class="pp-post-layer-footer" @click="showNewMessage">
  <div class="pp-post-layer-input">
    <input type="text" placeholder="Live chat with us">

    <div class="pp-post-layer-button-group">
      <button class="pp-post-layer-button-item svg-btn">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 29 18"><g fill-rule="evenodd"><path d="M9 1a8 8 0 1 0 0 16h11a8 8 0 1 0 0-16H9zm0-1h11a9 9 0 0 1 0 18H9A9 9 0 0 1 9 0z" fill-rule="nonzero"></path><path d="M6.561 9.337c0-2.277 1.683-3.795 3.773-3.795 1.298 0 2.2.572 2.849 1.375l-.726.451c-.462-.594-1.243-1.012-2.123-1.012-1.606 0-2.827 1.232-2.827 2.981 0 1.738 1.221 2.992 2.827 2.992.88 0 1.606-.429 1.969-.792v-1.496H9.784v-.814h3.432v2.651a3.822 3.822 0 0 1-2.882 1.265c-2.09 0-3.773-1.529-3.773-3.806zM14.701 13V5.663h.913V13h-.913zm2.629 0V5.663h4.807v.814h-3.894v2.365h3.817v.814h-3.817V13h-.913z"></path></g></svg>
      </button><button class="pp-post-layer-button-item svg-btn">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 18 18"><path d="M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm0 1C4.589 1 1 4.589 1 9s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM5 6.999a1 1 0 1 1 2.002.004A1 1 0 0 1 5 6.999zm5.999 0a1.002 1.002 0 0 1 2.001 0 1 1 0 1 1-2.001 0zM8.959 13.5c-.086 0-.173-.002-.26-.007-2.44-.132-4.024-2.099-4.09-2.182l-.31-.392.781-.62.312.39c.014.017 1.382 1.703 3.37 1.806 1.306.072 2.61-.554 3.882-1.846l.351-.356.712.702-.35.356c-1.407 1.427-2.886 2.15-4.398 2.15z" fill-rule="evenodd"></path></svg>
      </button><button class="pp-post-layer-button-item svg-btn">
        <svg focusable="false" aria-hidden="true" viewBox="0 0 16 18"><path d="M14.154 6.918l-.004.003.001-.004-3.287 3.286-.006-.005-3.574 3.574c-.016.017-.03.036-.048.053l-.05.047-.043.041v-.002c-1.167 1.07-2.692 1.331-3.823.2-1.13-1.13-.89-2.677.18-3.843l-.005-.004.074-.073.016-.018c.006-.005.012-.009.017-.016l6.053-6.053.761.76-6.053 6.054-.029.028v.001l-.005.004-.073.074c.011-.01.025-.018.035-.03-.688.75-.93 1.636-.21 2.356.72.72 1.583.456 2.333-.232l-.03.034.04-.042.01-.008.008-.009.033-.03.031-.034.01-.009.007-.009 5.004-5.003.005.006 1.858-1.859c1.223-1.218 1.51-2.913.291-4.132C12.462.806 10.414.74 9.195 1.958L2.248 8.905c.003 0 .006-.002.008-.004-1.625 1.667-1.542 4.43.103 6.074 1.646 1.646 4.474 1.795 6.141.17-.003.002-.004.008-.008.012l.047-.047 6.053-6.054.042-.042.743.78-.025.021.001.002-6.05 6.05-.002.002-.002.001-.046.046h-.002c-2.094 2.04-5.578 1.894-7.652-.18-2.049-2.049-2.15-5.407-.183-7.505l-.006-.005h-.002l.076-.078 6.943-6.944.003-.002.004-.005c1.641-1.64 4.367-1.574 6.008.066 1.64 1.642 1.353 4.014-.288 5.655z" fill-rule="evenodd"></path></svg>
      </button>
    </div>
  </div>
</div>
</div>
</transition>`,
})

// 打招呼
PPVue.component('post-layer-template-greet-post', {
  template: `<div>
<div class="pp-post-layer-title">Welcome to ParcelPanel 🎉</div>
<div class="pp-post-layer-body">
  <p>Hello 😀 ,</p>
  <p>We’re so glad you’re here, let us know if you have any questions.</p>
</div>
</div>`,
})

// 订单页面需要帮助显示的
PPVue.component('post-layer-template-order-message-post', {
  template: `<div class="pp-post-layer-body">
<p>Any questions about orders sync, courier matching or tracking update?</p>
</div>`,
})


// Estimated delivery time Range slider
PPVue.component('pp-edt-time-slider', {
  props: {
    value: {
      type: Array,
      default: [10, 20]
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 90,
    },
  },
  methods: {
    change(value) {
      this.$emit('input', value)
    },
  },
  template: `<div>
<div>Estimated delivery time: {{value[0]}} - {{value[1]}}(d)</div>
<vue-slider :value="value" @change="change" tooltip="hover" :min="min" :max="max" dot-size="20" class="pp-m-t-2"></vue-slider>
</div>`
})

PPVue.component('pp-new-badge', {
  props: {
    endTime: Number,
  },
  data() {
    const isShow = new Date().getTime() < this.endTime
    return {
      isShow
    }
  },
  // template: `<div style="position:relative"><div v-if="isShow" style="position:absolute;top:0;left:0;height:36px;user-select:none;pointer-events:none"><i style="position:absolute;top:0;left:0;display:block;width:0;height:0;border:18px solid #ff1500;border-right-color:transparent;border-bottom-color:transparent"/><span style="position:absolute;bottom:0;left:0;display:block;width:36px;height:36px;color:rgb(255 255 255);text-align:center;font-size:12px;transform:rotate(-45deg)">NEW</span></div><slot/></div>`,
  template: `<span v-if="isShow" class="parcelpanel-new-badge"></span>`,
})


// template 开发时手动格式化，开发完后手动压缩
PPVue.component('pp-popup-pic', {
  template: `<div v-if="isShow" class="pp-popup-pic"><div v-show="!isOpened" class="pp-popup-pic-pendant" @click="handlePendantClick"></div><div v-if="isOpened" class="pp-popup-pic-modal-container"><div class="pp-popup-pic-modal"><div class="pp-popup-pic-modal-body" @click="handleModalClick"><div><img src="https://cdn.parcelpanel.com/wc/assets/popup/imgs/heading2.png" alt width="100%" height="auto"></div><div class="pp-popup-pic-p2">Offer Will Expire Soon <span class="pp-countdown">{{ countdown }}</span></div><div><img src="https://cdn.parcelpanel.com/wc/assets/popup/imgs/section2.png" alt width="100%" height="auto"></div></div><button @click="handleCloseButtonClick" class="modal-close-button"><svg viewBox="0 0 20 20" focusable="false" aria-hidden="true"><path d="m11.414 10 6.293-6.293a1 1 0 1 0-1.414-1.414l-6.293 6.293-6.293-6.293a1 1 0 0 0-1.414 1.414l6.293 6.293-6.293 6.293a1 1 0 1 0 1.414 1.414l6.293-6.293 6.293 6.293a.998.998 0 0 0 1.707-.707.999.999 0 0 0-.293-.707l-6.293-6.293z"></path></svg></button></div></div></div>`,

  data() {
    return {
      // 是否显示
      isShow: false,

      // 弹出版本，内容或者功能发生了修改可以在此调整版本号
      version: '1.0',

      // 首次弹窗开始于
      openedAt: 0,

      // 本地时间与服务器时间时差
      timeDiff: 0,
      // 定时器
      timer: void 0,
      // 倒计时 剩余秒数
      remainTime: 0,
      // 是否展示弹窗
      isOpened: false,
    }
  },

  created() {
    this.openedAt = window.parcelpanel_param.popup.opened_at
    this.timeDiff = new Date().getTime() / 1000 - window.parcelpanel_param.popup.server_time
    this.isShow = window.parcelpanel_param.popup.is_show
  },

  mounted() {
    if (!this.isShow) {
      return
    }
    if (window.parcelpanel_param.popup.last_popup_date !== this.getNowDate()) {
      // 防止单页页面中路由切换后重复弹窗(导入单号)
      window.parcelpanel_param.popup.last_popup_date = this.getNowDate()
      this.modalAutoOpen()
    }
  },

  methods: {
    updateCountdown() {
      // todo 用setTimeout还是setInterval？
      // this.timer = setTimeout(() => {
      //   this.updateCountdown()
      // }, 100)
      // 倒计时 总秒数
      const totalSeconds = 2592e3
      // 计算方法：
      // 剩余秒数 = 总秒数 - 已消耗秒数 - 1
      // 已消耗秒数 = (当前时间 - 首次弹出时间) % 2592000
      // -1 是为了能显示最后的 0 秒，下一轮倒计时时间从 23:59:59 开始
      this.remainTime = Math.ceil(totalSeconds - (new Date().getTime() / 1000 - this.timeDiff - this.openedAt) % totalSeconds - 1)
    },

    modalAutoOpen() {
      this.reqPopupAction('open:1')
      this.modalOpen()
    },

    /** 悬浮挂件点击事件 */
    handlePendantClick() {
      this.reqPopupAction('open:2')
      this.modalOpen()
    },

    /** 模态框点击事件 */
    handleModalClick(e) {
      this.reqPopupAction('close:3')
      this.intercomNewMessage()
      this.modalClose()
    },

    /** 关闭按钮点击事件 */
    handleCloseButtonClick() {
      this.reqPopupAction('close:4')
      this.modalClose()
    },

    modalOpen() {
      if (!this.timer) {
        this.updateCountdown()
        this.timer = setInterval(() => {
          this.updateCountdown()
        }, 100)
      }

      this.isOpened = true
    },
    modalClose() {
      this.isOpened = false

      if (this.timer) {
        clearInterval(this.timer)
        this.timer = void 0
      }
    },

    intercomNewMessage() {
      window.PPLiveChat('showNewMessage', 'Hi support, I would like to free upgrade to the Unlimited plan.')
    },

    reqPopupAction(action) {
      const data = {
        action,
        date: this.getNowDate(),
        v: this.version,
        t: new Date().toString(),
        url: location.href,
        referrer: document.referrer,
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      }
      fetch(`${ ajaxurl }?action=pp_popup_action&_ajax_nonce=${ window.parcelpanel_param.popup.nonce }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
    },

    formatTimeDisplay(text) {
      return `${ text < 10 ? `0${ text }` : text }`
    },

    getNowDate() {
      const $date = new Date()
      return `${ $date.getFullYear() }-${ $date.getMonth() + 1 }-${ $date.getDate() }`
    },
  },

  computed: {
    countdown() {
      const days = Math.floor(this.remainTime / 86400)
      const hours = Math.floor(this.remainTime / 3600 % 24)
      const minutes = Math.floor(this.remainTime / 60 % 60)
      const seconds = Math.floor(this.remainTime % 60)

      return `${ days > 0 ? `${ days }${ days === 1 ? 'day' : 'days' } ` : '' }${ this.formatTimeDisplay(hours) }:${ this.formatTimeDisplay(minutes) }:${ this.formatTimeDisplay(seconds) }`
    },
  },
})

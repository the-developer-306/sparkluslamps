jQuery(($) => {
  (() => {
    if (typeof window.PPLiveChat === 'function') {
      return
    }

    /**
     * 隐私政策确认弹窗
     */
    const confirmModal = (() => {
      let confirmModalIsCreated = false
      let $modal
      let confirmEvent

      return (...t) => {
        if (t[0] === 'show') {
          // 目前只能存储1个回调函数, 要存储多个的话就弄个栈
          confirmEvent = t[1]

          if (!confirmModalIsCreated) {
            const html = `<div id="pp-modal-intercom-confirm" class="components-modal__screen-overlay pp-modal"><div role="dialog" tabindex="-1" class="components-modal__frame"><div role="document" class="components-modal__content" style="display: flex; flex-direction: column;"><div class="components-modal__header"><div class="components-modal__header-heading-container"><h1 class="components-modal__header-heading">Start Live Chat</h1></div><button type="button" aria-label="Close dialog" class="components-button has-icon btn-close" style="position: unset; margin-right: -8px;"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"></path></svg></button></div><div class="pp-modal-body"><p>When you click the confirm button, we will open our live chat widget, where you can chat with us in real-time to solve your questions, and also potentially collect some personal data.</p><p class="pp-m-t-4">Learn more about our <a href="https://www.parcelpanel.com/privacy-policy/" target="_blank">Privacy Policy</a>.</p><p class="pp-m-t-4">Don't want to use live chat? Contact us via email: <a href="mailto:support@parcelpanel.org" target="_blank">support@parcelpanel.org</a></p></div></div><div class="components-modal__footer"><button type="button" class="components-button pp-button is-secondary"><span>Cancel</span></button><button type="button" class="components-button pp-button is-primary pp-m-l-1"><span>Confirm</span></button></div></div></div>`
            $modal = $(html)
            $('body').append($modal)
            $modal
              .on('click', '.btn-close,.is-secondary', () => {
                $modal.hide()
              })
              .on('click', '.is-primary', async () => {
                $modal.find('.is-primary').addClass('is-busy').attr('disabled', 'disabled')
                await confirmEvent?.()
                $modal.find('.is-primary').removeClass('is-busy').removeAttr('disabled')
                $modal.hide()
              })

            confirmModalIsCreated = true
          } else {
            $modal.show()
          }
        }
      }
    })()

    /**
     * 加载 Intercom 实例, 执行1次即可
     */
    const loadIntercomInstance = () => {
      var w = window
      var ic = w.Intercom
      if (typeof ic === 'function') {
        ic('reattach_activator')
        ic('update', w.intercomSettings)
      } else {
        var i = function () {
          i.c(arguments)
        }
        i.q = []
        i.c = function (args) {
          i.q.push(args)
        }
        w.Intercom = i
      }
    }

    /**
     * 加载 Intercom 插件
     */
    const loadIntercomScript = (() => {
      // 控制只能加载一个 script
      let isScriptLoaded = false
      return () => {
        if (isScriptLoaded) {
          return
        }
        isScriptLoaded = true

        var w = window
        var d = document
        var l = function () {
          var s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = 'https://widget.intercom.io/widget/t6tndyrj'
          var x = d.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
        }
        if (document.readyState === 'complete') {
          l()
        } else if (w.attachEvent) {
          w.attachEvent('onload', l)
        } else {
          w.addEventListener('load', l, false)
        }
      }
    })()

    const waitForLoad = (() => {
      const requestIdleCallback = typeof window !== 'undefined' ? window.requestIdleCallback : null

      return (check, callback) => {
        let elapsedTime = 0
        // If the provider fails to load we don't want to keep checking continuously
        // therefore we set a max duration we're willing to wait before executing the callback
        const maxWaitDuration = 10000
        // If the browser does not support requestIdleCallback we'll wait the fallback duration
        // before executing the callback
        const fallbackDuration = 1000

        const scheduleLoad = (deadline) => {
          if (check() || elapsedTime >= maxWaitDuration) {
            callback()
            return
          }

          elapsedTime += deadline.timeRemaining()
          requestIdleCallback?.(scheduleLoad)
        }

        if (requestIdleCallback) {
          requestIdleCallback(scheduleLoad)
        } else {
          setTimeout(callback, fallbackDuration)
        }
      }
    })()

    /**
     * 检测 Intercom 是否已经启动, 并在启动后移除占位符
     */
    const checkIntercomBooted = () => {
      waitForLoad(
        () => window.Intercom.booted,
        () =>
          setTimeout(() => {
            $('.pp-intercom-loader-placeholder').remove()
          }, 2000)
      )
    }

    /**
     * 一键启动 Intercom
     */
    const bootIntercom = () => {
      // 载入 Intercom 脚本
      loadIntercomScript()
      window.Intercom('boot', pp_intercom_settings)
      checkIntercomBooted()
    }

    let isLoadIntercomScript = false
    let liveChatEnabled = parcelpanel_param.live_chat.enabled
    const hasIntercomSettings = ('undefined' !== typeof pp_intercom_settings)

    // 挂载 window.Intercom 实例(必须在最头部执行, 可以防止代码调用一个不存在的实例而出现异常)
    loadIntercomInstance()

    if (hasIntercomSettings) {
      if (liveChatEnabled) {
        // 已经同意过隐私政策的就可以直接启动了
        bootIntercom()
      } else {
        // 否则加载一个占位符, 点击后弹出隐私政策确认弹窗
        const $dom = $(`<div class="pp-intercom-loader-placeholder" style="position: fixed;z-index: 99999;width: 0;height: 0;font-family: intercom-font, &quot;Helvetica Neue&quot;, &quot;Apple Color Emoji&quot;, Helvetica, Arial, sans-serif;"><div role="button" aria-label="Load Chat" aria-live="polite" style="position: fixed;z-index: 2147483003;border: none;bottom: 20px;right: 40px;max-width: 60px;width: 60px;max-height: 60px;height: 60px;border-radius: 50%;background: #ff6c22;cursor: pointer;box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);transition: transform 167ms cubic-bezier(0.33, 0.00, 0.00, 1.00);box-sizing: content-box;padding: 0 !important;margin: 0 !important;"><div style="display: flex;align-items: center;justify-content: center;position: absolute;top: 0;left: 0;width: 60px;height: 60px;transition: transform 100ms linear, opacity 80ms linear;opacity: 1;transform: rotate(0deg) scale(1);"><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 28 32" style="width: 28px;height: 32px;"><path d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z" style="fill: rgb(255, 255, 255);"></path></svg></div><div style="display: flex;align-items: center;justify-content: center;position: absolute;top: 0;left: 0;width: 60px;height: 60px;transition: transform 100ms linear, opacity 80ms linear;opacity: 0;transform: rotate(-60deg) scale(0);"><svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z" fill="white" style="fill: rgb(255, 255, 255);"></path></svg></div></div></div>`)
        $dom.on('click', () => {
          window.PPLiveChat('show')
        })
        $('body').append($dom)
      }
    }

    window.PPLiveChat = (...t) => {
      // 监听类型的操作直接放入 Intercom 执行队列即可
      if (['onShow'].includes(t[0])) {
        window.Intercom(...t)
        return
      }

      // pp_intercom_settings 不存在
      if (!hasIntercomSettings) {
        confirmModal('show', () => {
          $.toastr.error('Server error, please try again or refresh the page')
        })
        return
      }

      // 判断用户是否接受了隐私政策
      if (!liveChatEnabled) {
        // 未通过隐私政策, 显示弹框
        confirmModal('show', async () => {
          // 标记变量
          liveChatEnabled = true

          bootIntercom()

          window.Intercom(...t)
          await fetch(`${ ajaxurl }?action=pp_live_chat_connect&_ajax_nonce=${ parcelpanel_param.live_chat.nonce }`)
        })
        return
      }

      // 已通过隐私政策, 转发参数给 intercom
      window.Intercom(...t)
    }
  })()

  function checkSiteConnectStatus() {
    const is_connected = window.parcelpanel_param.site_status.is_connected
    if (!is_connected) {
      connectPP()
    }
    return is_connected
  }

  function connectPP() {
    $.post(ajaxurl, {
      action: 'pp_connect',
      _ajax_nonce: parcelpanel_param.connect_server_nonce,
    }, (res) => {
      if (!res.success) {
        $.toastr.error(res.msg || 'Failed to connect to ParcelPanel.', {time: 5e3})
        // 连接失败，等待一段时间后继续检测
        setTimeout(connectPP, 15e3)
      } else if (!res.data.is_connected) {
        // 循环检测连接状态，但不能太快
        setTimeout(connectPP, 8e3)
      } else {
        // reportSiteInfoToServer()
      }
    })
  }

  function reportSiteInfoToServer() {
    $.post(ajaxurl, {
      action: 'pp_version_upgrade',
      _ajax_nonce: parcelpanel_param.version_upgrade_nonce,
    })
  }

  if (!window.parcelpanel_param?.site_status?.is_offline_mode) {
    const is_connected = checkSiteConnectStatus()
    const is_upgraded = window.parcelpanel_param.site_status.is_upgraded

    // 连接成功后判断是否需要报告网站信息
    if (is_connected && !is_upgraded) {
      reportSiteInfoToServer()
    }
  }
})

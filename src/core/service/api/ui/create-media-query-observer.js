import createCallbacks from 'uni-helpers/callbacks'

import {
  getCurrentPageVm
} from '../../platform'

const createMediaQueryObserverCallbacks = createCallbacks('requestMediaQueryObserver')

class ServiceMediaQueryObserver {
  constructor (component, options) {
    this.pageId = component.$page.id
    this.component = component._$id || component // app-plus 平台传输_$id
    this.options = options
  }

  observe (options, callback) {
    if (typeof callback !== 'function') {
      return
    }
    this.options = options

    this.reqId = createMediaQueryObserverCallbacks.push(callback)

    UniServiceJSBridge.publishHandler('requestMediaQueryObserver', {
      reqId: this.reqId,
      component: this.component,
      options: this.options
    }, this.pageId)
  }

  disconnect () {
    UniServiceJSBridge.publishHandler('destroyMediaQueryObserver', {
      reqId: this.reqId
    }, this.pageId)
  }
}

export function createMediaQueryObserver (context, options) {
  if (!context._isVue) {
    options = context
    context = null
  }
  if (context) {
    return new ServiceMediaQueryObserver(context, options)
  }
  return new ServiceMediaQueryObserver(getCurrentPageVm('createMediaQueryObserver'), options)
}

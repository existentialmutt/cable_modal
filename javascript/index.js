import buildObserver from "./buildObserver.js"
import Bootstrap from "./bootstrap"

const CableModal = {
  start(plugin) {
    this.observer = new CableModalObserver(this)
    this.plugin = plugin
    this.connect = plugin.connect.bind(this)
    this.disconnect = plugin.disconnect.bind(this)
    CableReady.operations.openModal = plugin.openModal.bind(this)
    CableReady.operations.updateModal = plugin.updateModal.bind(this)
    CableReady.operations.closeModal = plugin.closeModal.bind(this)
  },

  stop() {
    this.plugin = undefined
    this.observer.disconnect()
    this.observer = undefined
  }
}

export { CableModal }




import CableReady from "cable_ready"


export default class CableModal extends HTMLElement {
  /*
    Example usage

    import {CableModal, Bootstrap} from "cable_modal"
    import {Modal} from "bootstrap"
    CableModal.use(new Bootstrap(Modal))

    <cable-modal></cable-modal>

    -------------------------

    Define your own Plugin:
    {
      connect() {},
      disconnect() {},
      openModal() {},
      closeModal() {},
      updateModal() {},
      defaultContent:
    }

    all methods will run bound to the <cable-modal></cable-modal> custom element
  */
  static use(plugin) {
    this.plugin = plugin
  }

  constructor() {
    super()
    this.plugin = this.constructor.plugin
  }

  connectedCallback() {
    const {
      plugin: {
        connect,
        openModal,
        closeModal,
        updateModal,
        defaultContent
      } } = this

    this.innerHTML || (this.innerHTML = defaultContent)
    CableReady.operations.openModal = openModal.bind(this)
    CableReady.operations.updateModal = updateModal.bind(this)
    CableReady.operations.closeModal = closeModal.bind(this)
    connect.bind(this)()
  }

  disconnectedCallback() {
    const { plugin: { disconnect } } = this
    disconnect.bind(this)()
    CableReady.operations.openModal = undefined
    CableReady.operations.closeModal = undefined
    CableReady.operations.updateModal = undefined
  }
}

customElements.define('cable-modal', CableModal);

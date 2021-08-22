export default class Bootstrap {
  constructor(Modal) {
    this.Modal = Modal
  }

  connect() {
    this.modal = new this.constructor.plugin.Modal(this.querySelector('[slot="modal"]'))
  }

  disconnect() {
    this.modal.hide()
    this.modal.dispose()
  }

  openModal(_operation) {
    this.modal.show()
  }

  closeModal(_operation) {
    this.modal.hide()
  }

  updateModal(operation) {
    this.querySelector('[slot="content"]').innerHTML = operation.html
    this.modal.handleUpdate()
  }

  get defaultContent() {
    return `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" slot="modal">
      <div class="modal-dialog">
        <div class="modal-content" slot="content">
        </div>
      </div>
    </div>`
  }
}

CableModal.operations.openModal = operation => {
  this.modal.show()
}

CableModal.operations.updateModal = operation => {
  this.contentTarget.innerHTML = operation.html
  this.modal.handleUpdate()
}

CableModal.operations.closeModal = operation => {
  this.modal.hide()
}

export const Bootstrap = {
  connect(target) {
    this.modalInstance = new Modal(this.element)
    this.modalElement = target
  },

  disconnect(target) {
    this.modalInstance.dispose()
    this.modalInstance = undefined
    this.modalElement = undefined
  },

  openModal(operation) {
    this.modalInstance.show()
  },
  updateModal(operation) {
    const contentElement = this.modalElement.querySelector("[data-cable-modal-content]")
    contentElement.innerHTML = operation.html
    this.modalInstance.handleUpdate()
  },
  closeModal(operation) {
    this.modalInstance.hide()
  },
}

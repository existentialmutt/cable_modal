// import 'bootstrap/dist/css/bootstrap.min.css'
import CableReady from "cable_ready"
import mrujs, { CableCar } from "mrujs"


mrujs.start({
  plugins: [
    new CableCar(CableReady)
  ]
})

import { CableModal, Bootstrap } from "../../../../../javascript/index"
import { Modal } from "bootstrap"
CableModal.use(new Bootstrap(Modal))

// TODO can remove once 5.0.0-pre.3 is out
CableReady.operations.redirectTo = (operation) => {
  let { url, action } = operation
  action = action || 'advance'
  if (window.Turbo) window.Turbo.visit(url, { action })
  if (window.Turbolinks) window.Turbolinks.visit(url, { action })
  if (!window.Turbo && !window.Turbolinks) window.location.href = url
}

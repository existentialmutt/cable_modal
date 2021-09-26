import 'bootstrap/dist/css/bootstrap.min.css';

import CableReady from "cable_ready"
import mrujs from "mrujs"
import { CableCar } from "mrujs/plugins"


mrujs.start({
  plugins: [
    new CableCar(CableReady)
  ]
})

import { CableModal, Bootstrap } from "../../../../../javascript/index"
import { Modal } from "bootstrap"
CableModal.use(new Bootstrap(Modal))

# CableModal
This plugin facilitates creating server-rendered modal workflows in Rails using [CableReady](https://cableready.stimulusreflex.com) custom operations.  A plugin system is provided to allow you to use your modal provider of choice.  A plugin for Bootstrap 5 is provided and used in these examples.

The plugin provides a `<cable-modal>` web component and a set of custom CableReady operations for controlling it.  Once the `<cable-modal>` element is on the page, you can control it with the following operations:

- `openModal()`
- `closeModal()`
- `updateModal({html: "HTML string for modal content"})`

![Demo screencast](/demo.gif)

## Installation
First install the gem

```bash
$ bundle add cable_modal
```

Next install the cable_modal NPM package (+ cable_ready if you don't have it already)

```bash
$ yarn add cable_modal cable_ready
```

Finally, run the generator
```bash
$ bin/rails g cable_modal:install
```

The generator does three things:

1. installs a `<cable-modal>` web component into your `application.html.erb` layout
3. installs a `cable_modal.html.erb` template into `app/views/layouts`.  Use this layout to assist with rendering modal content.
2. adds intialization code to `application.js`

## Usage with Mrujs / CableCar

This gem adds 3 custom operations you can use anywhere you use CableReady:
- openModal
- closeModal
- updateModal

A great way to to use these to control the custom modal is with [mrujs](https://mrujs.com) and the [cable_car feature](https://cableready.stimulusreflex.com/v/v5/cable-car) added in CableReady 5.  Here's an example.

First you'll want to set up mrujs with the CableCar plugin.  Follow the [instructions in the mrujs docs](https://mrujs.com/how-tos/integrate-cablecar).

Now you can add `data-remote` to any links or forms you want to use to control the modal.

```html
  <a href="/confirmations/new" data-remote>Open Confirmation in Modal</a>

  <!-- OR -->

  <form action="/confirmations" data-remote>
    <button>Submit form and process result in modal</button>
  </form>
```

Then in your controllers, process the request and use `render operations:` to send CableReady operations back to the client.

```ruby
  # confirmations_controller.rb

  def new
    @confirmation = Confirmation.new
    render operations: cable_car
      .update_modal(
        html: self.class.render(
          template: "confirmations/new",
          assigns: {confirmation: @confirmation},
          layout: "cable_modal",
        ))
      .open_modal
  end

  def create
    @confirmation = Confirmation.new(confirmation_params)
    if @confirmation.save
      render operations: cable_car.close_modal
    else
      render operations: cable_car.update_modal(
        html: self.class.render(
          template: "confirmations/new",
          assigns: {confirmation: @confirmation},
          layout: "cable_modal",
        ))
    end
  end
```

There's a full reference implementation in [/test/dummy](/test/dummy) of this repo.

## Customization

If you don't want to use Bootstrap's modals, you can write your own plugin and then pass it to `CableModal.use(plugin)` in your javascript initializion.

Plugins are plain javascript objects with the following properties:

```javascript
  {
    connect() {}, // runs when the <cable-modal> component is added
    disconnect() {}, // runs when the <cable-modal> component is removed
    openModal: (operation) -> {}, // open the modal
    closeModal: (operation) -> {}, // close the modal
    updateModal: (operation) -> {}, // update the modal's content
    defaultContent: string // default innerHTML of the <cable-modal> component
  }
```

Note that all functions will run bound to the `<cable-modal>` DOM node.  You can access the original plugin object inside these bound functions by calling `this.plugin`.

## Contributing
Issues and pull requests are welcome.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

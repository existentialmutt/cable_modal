require "cable_ready"

module CableModal
  class Engine < ::Rails::Engine
    initializer "cable_modal.operations" do
      CableReady.configure do |config|
        config.add_operation_name :open_modal
        config.add_operation_name :update_modal
        config.add_operation_name :close_modal
      end
    end
  end
end

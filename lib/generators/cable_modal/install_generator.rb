class CableModal::InstallGenerator < Rails::Generators::Base
  class_option :skip_application_layout, type: "boolean", default: false, desc: "Don't modify application layout"
  class_option :skip_javascript, type: "boolean", default: false, desc: "Don't modify application javascript"
  class_option :skip_modal_layout, type: "boolean", default: false, desc: "Don't install a custom layout for your modal content"
  class_option :application_layout, type: "string", default: "app/views/layouts/application.html.erb", desc: "Specify a custom layout install target"
  class_option :javascript, type: "string", default: "app/javascript/packs/application.js", desc: "Specify a custom javascript install target"
  class_option :plugin, type: "string", default: "bootstrap", desc: "Specify your modal provider plugin.  Currently bootstrap (5) is the only provided option. You can always configure custom plugins in your application scripts."

  source_root File.expand_path("../templates", __FILE__)

  def install
    install_application_layout unless options.skip_application_layout?
    install_modal_content_layout unless options.skip_modal_layout?
    install_javascript unless options.skip_javascript?
  end

  private

  def install_application_layout
    insert_into_file options.application_layout, "  <cable-modal></cable-modal>\n  ", before: "</body>"
  end

  def install_javascript
    append_to_file "app/javascript/packs/application.js", File.read(javascript_template)
  end

  def install_modal_content_layout
    copy_file modal_layout_template, "app/views/layouts/cable_modal.html.erb"
  end

  def javascript_template
    case options.plugin
    when "bootstrap" then File.expand_path("../templates/init_bootstrap.js", __FILE__)
    else raise "Unrecognized plugin `#{options.plugin}`"
    end
  end

  def modal_layout_template
    case options.plugin
    when "bootstrap" then "layouts/cable_modal/bootstrap.html.erb"
    else raise "Unrecognized plugin `#{options.plugin}`"
    end
  end
end

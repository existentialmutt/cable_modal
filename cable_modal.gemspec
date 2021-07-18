require_relative "lib/cable_modal/version"

Gem::Specification.new do |spec|
  spec.name = "cable_modal"
  spec.version = CableModal::VERSION
  spec.authors = ["Rafe Rosen"]
  spec.email = ["rafe@existentialmutt.com"]
  spec.homepage = "https://github.com/existentialmutt/cable_modal"
  spec.summary = "Modal form workflows, powered by CableReady operations and mrujs"
  spec.description = "This library provides controller and front-end code to facilitate modal workflows in Ruby on Rails.  Right now it provides an adapter for Bootstrap 5. Other versions and libraries may be added in the future. Behind the scenes it uses CableReady's cable_car operation serializer and mrujs."
  spec.license = "MIT"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = "https://github.com/existentialmutt/cable_modal/releases"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", "~> 6.1.4"
  spec.add_dependency "cable_ready", "5.0.0pre1"
  spec.add_development_dependency "rubocop"
  spec.add_development_dependency "standard"
end

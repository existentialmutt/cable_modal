Rails.application.routes.draw do
  resources :confirmations
  root to: redirect("/confirmations")
end

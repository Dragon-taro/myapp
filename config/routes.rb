Rails.application.routes.draw do
  root 'home#index'
  match '*any' => 'application#options', :via => [:options]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

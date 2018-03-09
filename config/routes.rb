Rails.application.routes.draw do
  root 'home#index'
  resources :pictures, only: [:create, :index]
  resources :converted_pictures, only: [:create]
  resources :abouts, only: [:index]
  match '*any' => 'application#options', :via => [:options]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

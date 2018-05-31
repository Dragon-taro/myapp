Rails.application.routes.draw do
  devise_for :users, controllers: { :omniauth_callbacks => "omniauth_callbacks" }
  root 'home#index'
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  resources :users, only: [:show, :update]
  resources :follows, only: [:create, :update]
  get 'masters' => 'users#index'
  get 'masters/search' => 'users#search'
end

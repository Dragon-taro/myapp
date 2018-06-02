Rails.application.routes.draw do
  devise_for :users, controllers: { :omniauth_callbacks => "omniauth_callbacks" }
  root 'home#index'
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  resources :users, only: [:show, :update]
  resources :follows, only: [:create]
  resources :messages, only: [:create, :index]
  get 'messages/masters' => 'messages#masters'
  get 'messages/disciples' => 'messages#disciples'
  put 'follows/update' => 'follows#update'
  get 'masters' => 'users#index'
  get 'mypage' => 'users#mypage'
  get 'masters/search' => 'users#search'
end

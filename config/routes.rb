Rails.application.routes.draw do
  devise_for :users
  get 'results/index'
  root to: "results#index"
  resources :users, only: [:edit, :update]
end

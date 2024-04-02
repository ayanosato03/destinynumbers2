Rails.application.routes.draw do
  devise_for :users
  get 'results/index'
  root to: "results#index"
  resources :users, only: [:edit, :update]
  get '/result1', to: 'results#result1', as: 'result1'
  resources :results, only: [:index, :create, :show]
end

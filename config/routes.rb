Rails.application.routes.draw do
  devise_for :users
  get 'results/index'
  root to: "results#index"
  resources :users, only: [:show, :edit, :update]
  get '/result1', to: 'results#result1', as: 'result1'
  resources :results, only: [:index, :create, :show]
  get '/calculation_results', to: redirect('/')  # リダイレクトルーティング
  get '/result.js', to: 'results#javascript_response'
  resources :life_pass_numbers, only: [:index, :show]
end

Rails.application.routes.draw do
  devise_for :users
  get 'results/index'
  root to: "results#index"
  resources :users, only: [:show, :edit, :update]
  get '/result1', to: 'results#result1', as: 'result1'
  resources :results, only: [:index, :create, :show]
  get '/calculation_results', to: redirect('/')  # リダイレクトルーティング
  get '/result.js', to: 'results#javascript_response'
  resources :life_pass_numbers, only: [:index] do
   collection do
    (1..9).each do |n|
      get "numbers#{n}"
    end
    [11, 22, 33].each do |n|
      get "numbers#{n}"
    end
    end
  end
end

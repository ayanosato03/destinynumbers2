Rails.application.routes.draw do
  devise_for :users
  get 'results/index'
  root to: "results#index"
end

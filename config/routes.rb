Rails.application.routes.draw do
  get 'results/index'
  root to: "results#index"
end

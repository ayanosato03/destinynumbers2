class LifePassNumbersController < ApplicationController
  def index
  end

  def show
    @number = LifePassNumber.find(params[:id])
  end

end


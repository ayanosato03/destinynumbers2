class ResultsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    @results = Result.all
    @result = Result.new
  end

  def new
    @result = Result.new
  end
  
  def create
    @result = Result.new(result_params)
    if @result.save
      redirect_to '/'
    else
      render :index, status: :unprocessable_entity
    end
  end
  
  def show
    @fortune_number = params[:id].to_i

    # 1〜9, 11, 22, 33 の範囲外は404エラーにする
    unless (1..9).include?(@fortune_number) || [11, 22, 33].include?(@fortune_number)
      render file: Rails.root.join('public/404.html'), status: 404, layout: false, content_type: 'text/html'
    end

    render template: "results/result#{@fortune_number}"
  end

  private
  def result_params
    params.require(:result).permit(:name, :birthday, :calculation_result)
  end

end
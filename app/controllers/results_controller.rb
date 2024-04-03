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
    @result =  current_user.results.build(result_params)
    calculation_result = params[:calculation_result].present? ? params[:calculation_result].to_i : nil
    @result.calculation_result = calculation_result

    puts "Current user: #{current_user.inspect}"
    puts "Result user: #{@result.user.inspect}"
    puts "calculation_result: #{calculation_result}" 

    if @result.save
      render json: { success: true, result: @result }, status: :ok
      puts "データが保存されました"
      puts "Received calculation_result: #{params[:calculation_result]}"
      redirect_to '/'
    else
      puts "データの保存に失敗しました"
      puts @result.errors.full_messages
      render json: { success: false, errors: @result.errors.full_messages }, status: :unprocessable_entity    
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
    params.require(:result).permit(:name, :birthday,:calculation_result)
  end
end

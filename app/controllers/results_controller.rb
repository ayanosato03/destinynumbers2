class ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:javascript_response]
  before_action :authenticate_user!, except: [:index, :javascript_response]

  def index
    @results = Result.all
    @result = Result.new
  end

  def new
    @result = Result.new
  end

  def create
    @result = current_user.results.build(result_params)
    @result.calculation_result = params[:result][:calculation_result]

    if @result.save
      render json: { success: true, result: @result, calculation_result: @result.calculation_result }, status: :ok
      puts 'データが保存されました'
      puts "Received calculation_result: #{params[:calculation_result]}"
    else
      puts 'データの保存に失敗しました'
      puts @result.errors.full_messages
      render json: { success: false, errors: @result.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @fortune_number = params[:id].to_i

    # 1〜9, 11, 22, 33 の範囲外は404エラーにする
    unless (1..9).include?(@fortune_number) || [11, 22, 33].include?(@fortune_number)
      render file: Rails.root.join('public/404.html'), status: 404, layout: false, content_type: 'text/html'
      return # レンダリング後に return を追加してアクションを終了させる
    end

    render template: "results/result#{@fortune_number}"
  end

  def javascript_response
    # result.jsファイルを直接レスポンスとして返す
    respond_to do |format|
      format.js { render file: Rails.root.join('app', 'javascript', 'result.js'), content_type: 'text/javascript' }
    end
  end

  private

  def result_params
    params.require(:result).permit(:name, :birthday, :calculation_result)
  end
end

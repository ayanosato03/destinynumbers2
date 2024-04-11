class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update]

  def new
    @user = User.new
  end

  def edit
    @user = current_user
    @results = @user.results
  end

  def update
    @user = current_user
    return unless @user.update_with_password(user_params)

    bypass_sign_in(@user)
    redirect_to root_path, notice: 'Profile was successfully updated.'
  end

  def show
    return unless params[:id] != 'edit' && params[:id] != 'sign_in'

    if user_signed_in?
      @user = User.find(params[:id])
      @results = @user.results
      @nickname = @user.nickname
    else
      redirect_to new_user_session_path, alert: 'ログインしてください'
    end
  end

  private

  def user_params
    params.require(:user).permit(:nickname, :email, :password, :password_confirmation, :current_password)
  end
end

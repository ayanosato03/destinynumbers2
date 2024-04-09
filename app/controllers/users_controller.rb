class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update]

  def edit
    @user = current_user
    redirect_to root_path, alert: 'ログインしてください' unless @user
  end

  def update
    @user = current_user
    if @user.update_with_password(user_params)
      bypass_sign_in(@user)
      redirect_to root_path, notice: 'Profile was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def show
  @user = User.find(params[:id])
  @results = @user.results 
  @nickname = @user.nickname 
 end


  private

  def user_params
    params.require(:user).permit(:nickname, :email, :password, :password_confirmation, :current_password)
  end
end

class UsersController < ApplicationController

  before_action :set_user
  before_action :set_is_current_user

  def show
    gon.user_id = @user.id
    respond_to do |format|
      format.html
      format.json {}
    end
  end

  def update
    @user.update(user_params)
    render 'users/show.json.jbuilder'
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def set_is_current_user
    @is_current_user = current_user?(@user)
  end
end

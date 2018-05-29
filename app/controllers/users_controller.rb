class UsersController < ApplicationController

  before_action :set_user

  def show
    @is_edit = current_user?(@user)
    respond_to do |format|
      format.html
      format.json {}
    end
  end

  def edit
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
end

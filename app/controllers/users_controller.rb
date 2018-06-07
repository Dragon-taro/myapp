class UsersController < ApplicationController

  before_action :redirect_login, only: [:show, :update, :mypage]
  before_action :set_user, only: [:show, :update]
  before_action :set_is_current_user

  def index
    @top_users = User.joins(:follows_to).group(:id).order('count(to_user_id) DESC').where(is_master: true).limit(3)
    @users = User.all.order('updated_at DESC').where(is_master: true).limit(10)
  end

  def show
    gon.user_id = @user.id
    gon.current_user_id = current_user.id
  end

  def update
    if @user == current_user
      @user.update(user_params)
    end
    render 'users/show.json.jbuilder'
  end

  def search
    @users = User.where(is_master: true)
    @users = @users.where(id: params[:id]) if params[:id].present?
    @users = @users.where('users.name like ?', "%#{params[:name]}%") if params[:name].present?
    @users = @users.where(id: Skill.where(language: params[:skill]).pluck(:user_id)) if params[:skill].present?
  end

  def mypage
    gon.user_id = current_user.id
  end

  def admin
  end

  def terms
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :description, :is_master, :goal, skills_attributes: [:id, :description, :language, :_destroy])
  end

  def set_is_current_user
    @is_current_user = current_user?(@user)
  end
end

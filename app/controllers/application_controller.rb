class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user?(user)
    current_user == user
  end

  def redirect_login
    unless current_user.present?
      redirect_to new_user_session_path
    end
  end
end

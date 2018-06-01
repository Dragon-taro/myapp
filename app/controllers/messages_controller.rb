class MessagesController < ApplicationController

  before_action :set_users
  before_action :set_follows
  before_action :set_opponent_user, only: [:masters, :disciples]

  def index
    render 'messages/index.json.jbuilder'
  end

  def create
    if Message.create!(message_params)
      render 'messages/index.json.jbuilder'
    end
  end

  def masters
  end

  def disciples
  end

  private

  def message_params
    params.permit(:follow_id).merge(user_id: current_user.id)
  end

  def set_users
    @users = is_master ? current_user.accepted_disciple : current_user.accepted_master
  end

  def set_follows
    @follows = is_master ? current_user.follows_to : current_user.follows_from
  end

  def is_master
    params[:opponent_user] != 'masters'
  end

  def set_opponent_user
    gon.opponent_user = params[:action]
  end
end

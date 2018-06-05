class FollowsController < ApplicationController

  before_action :set_follow

  def update
    @follow.update(is_accept: true)
    render :json => {messages: "承認しました"}
  end

  def create
    if @follow.present? && @follow.is_accept
      render :json => {messages: '承認済みです。', status: 500}
    elsif @follow.present? && !@follow.is_accept
      render :json => {messages: '申請済みです。', status: 500}
    else
      Follow.create!(follow_params)
      render :json => {messages: '弟子入り申請しました。', status: 200}
    end
  end

  private

  def follow_params
    params.require(:follows).permit(:to_user_id, :from_user_id)
  end

  def set_follow
    @follow = Follow.find_by(follow_params)
  end
end

class FollowsController < ApplicationController

  def update
    @follow = Follow.find_by(follow_params).update(is_accept: true)
    render :json => "承認しました" # エラー出るから修正
  end

  def create
    if Follow.create!(follow_params)
      render :json => "弟子入り申請をしました" # エラー出るから修正
    end
  end

  private

  def follow_params
    params.require(:follows).permit(:to_user_id, :from_user_id)
  end
end

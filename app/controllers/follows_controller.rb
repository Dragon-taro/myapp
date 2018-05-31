class FollowsController < ApplicationController

  def update
  end

  def create
    if Follow.create!(follow_params)
      render :json => "弟子入り申請をしました"
    end
  end

  private

  def follow_params
    params.require(:follows).permit(:to_user_id, :from_user_id)
  end
end

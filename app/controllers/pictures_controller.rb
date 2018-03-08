class PicturesController < ApplicationController

  def create
    @picture = Picture.new(picture_params)
    @picture.save!
    @picture.create_converted_picture(picture_params)
    shirts_url = ActionController::Base.helpers.asset_path "shirts.jpg"
    render json: {image_url: @picture.image.url, shirts_url: shirts_url}
  end

  def index
    @pictures = Picture.all.order("created_at DESC").limit(5)
  end

  private

  def picture_params
    params.permit(:image)
  end
end

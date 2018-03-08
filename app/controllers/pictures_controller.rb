class PicturesController < ApplicationController
  def create
    @picture = Picture.new(picture_params)
    @picture.save!
    render json: {image_url: @picture.image.url}
  end

  private

  def picture_params
    params.permit(:image)
  end
end

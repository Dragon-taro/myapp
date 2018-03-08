class PicturesController < ApplicationController

  def create
    @picture = Picture.new(picture_params)
    @picture.save!
    @picture.create_converted_picture(picture_params)
    render json: {image_url: @picture.image.url}
  end

  def index
    @pictures = Picture.all
  end

  private

  def picture_params
    params.permit(:image)
  end
end

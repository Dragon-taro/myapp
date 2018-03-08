class ConvertedPicturesController < ApplicationController
  def create
    @converted_picture = ConvertedPicture.create!(picture_params)
    render json: {@converted_picture.image.url}
  end

  private

  def picture_params
    params.permit(:image, :picture_id)
  end
end

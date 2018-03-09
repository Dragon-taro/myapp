class ConvertedPicturesController < ApplicationController
  def create
    @converted_picture = ConvertedPicture.new(picture_params)
    @converted_picture.image = base64_conversion(params[:image])
    render json: {converted_picture_url: @converted_picture.image.url}
  end

  private

  def picture_params
    params.permit(:picture_id)
  end

end

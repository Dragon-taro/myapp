require 'curb'

class PicturesController < ApplicationController

  def create
    @picture = Picture.new(picture_params)
    @picture.save!
    c = Curl::Easy.new("http://35.190.148.183:8000/cnn")
    c.multipart_form_post = true
    puts @picture.image.url
    c.http_post(Curl::PostField.file('image', @picture.image.url))
    puts c
    @converted_picture = @picture.build_converted_picture
    # @converted_picture.image = base64_conversion(http.image)
    # @converted_picture.save!
    shirts_url = ActionController::Base.helpers.asset_path "shirts.jpg"
    render json: {image_url: @picture.image.url, shirts_url: shirts_url, converted_picture_url: @converted_picture.image.url}
  end

  def index
    @pictures = Picture.all.order("created_at DESC").limit(5)
  end

  private

  def picture_params
    params.permit(:image)
  end

  def base64_conversion(uri_str, filename = 'base64')
    image_data = split_base64(uri_str)
    image_data_string = image_data[:data]
    image_data_binary = Base64.decode64(image_data_string)

    temp_img_file = Tempfile.new(filename)
    temp_img_file.binmode
    temp_img_file << image_data_binary
    temp_img_file.rewind

    img_params = {:filename => "#{filename}.#{image_data[:extension]}", :type => image_data[:type], :tempfile => temp_img_file}
    ActionDispatch::Http::UploadedFile.new(img_params)
  end

  def split_base64(uri_str)
    if uri_str.match(%r{data:(.*?);(.*?),(.*)$})
      uri = Hash.new
      uri[:type] = $1
      uri[:encoder] = $2
      uri[:data] = $3
      uri[:extension] = $1.split('/')[1]
      return uri
    else
      return nil
    end
  end
end

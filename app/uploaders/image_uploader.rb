class ImageUploader < CarrierWave::Uploader::Base
  # リサイズしたり画像形式を変更するのに必要
  include CarrierWave::RMagick

 # 画像の上限を200pxにする
   process :resize_to_limit => [200, 200]

  # 保存形式をJPGにする
   process :convert => 'jpg'

  # サムネイルを生成する設定
   version :thumb do
     process :resize_to_fill => [40, 40, gravity = ::Magick::CenterGravity]
   end

  # jpg,jpeg,gif,pngしか受け付けない
  def extension_white_list
    %w(jpg jpeg gif png)
  end

 # 拡張子が同じでないとGIFをJPGとかにコンバートできないので、ファイル名を変更
 def filename
   if ENV['MANUAL_TESTING'] == 'true'
     original_filename
   else

     if has_mb?(original_filename) || has_too_long_file_name?(original_filename)
       content_type = file.content_type.gsub('image/', '').gsub('jpeg', 'jpg')
       name = "#{model.user_id}.#{content_type}"
     else
       name = original_filename
     end
     name = "#{secure_token(10)}-#{name}" if original_filename.present?

   end
 end

 protected
   def secure_token(length=16)
     var = :"@#{mounted_as}_secure_token"
     model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.hex(length/2))
   end

   private
     def has_mb?(str)
       str =~ /[^ -~｡-ﾟ]/
     end

     def has_too_long_file_name?(str)
       if str.present?
         str.length > 100
       end
     end

end

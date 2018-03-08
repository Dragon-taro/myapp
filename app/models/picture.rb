class Picture < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_one :converted_picture
end

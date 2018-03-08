class ConvertedPicture < ApplicationRecord
  mount_uploader :image, ImageUploader
  belongs_to :picture, optional: true
end

class CreateConvertedPictures < ActiveRecord::Migration[5.1]
  def change
    create_table :converted_pictures do |t|
      t.string :image
      t.integer :picture_id

      t.timestamps
    end
  end
end

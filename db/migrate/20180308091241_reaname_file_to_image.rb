class ReanameFileToImage < ActiveRecord::Migration[5.1]
  def change
    rename_column :pictures, :file, :image
  end
end

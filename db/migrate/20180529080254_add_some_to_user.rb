class AddSomeToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :description, :text
    add_column :users, :goal, :text
    add_column :users, :image, :text
    add_column :users, :is_master, :boolean
  end
end

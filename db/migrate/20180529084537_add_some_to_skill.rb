class AddSomeToSkill < ActiveRecord::Migration[5.1]
  def change
    remove_column :skills, :how_long
    add_column :skills, :description, :text
  end
end

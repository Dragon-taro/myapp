class CreateSkills < ActiveRecord::Migration[5.1]
  def change
    create_table :skills do |t|
      t.integer :user_id
      t.integer :how_long
      t.string :language

      t.timestamps
    end
  end
end

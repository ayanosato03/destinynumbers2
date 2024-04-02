class CreateResults < ActiveRecord::Migration[7.0]
  def change
    create_table :results do |t|
      t.string :name,                null: false
      t.date :birthday,              null: false
      t.integer :calculation_result, null: false
      t.references :user,            null: false, foreign_key: true
      t.timestamps
    end
  end
end

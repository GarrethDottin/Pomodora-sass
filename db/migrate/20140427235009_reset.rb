class Reset < ActiveRecord::Migration
  def change
    add_column :users, :last_reset, :timestamp
  end
end

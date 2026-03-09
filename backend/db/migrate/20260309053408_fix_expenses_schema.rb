class FixExpensesSchema < ActiveRecord::Migration[7.2]
  def change
    # add date to expenses schema, add index for faster queries
    add_column :expenses, :date, :date, null:false
    add_index :expenses, :date

    # unused column
    remove_column :expenses, :payer_name, :string
  end
end

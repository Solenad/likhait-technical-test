class FixExpensesSchema < ActiveRecord::Migration[7.2]
  def change
    add_column :expenses, :date, :date
    remove_column :expenses, :payer_name, :string
  end
end

class Api::CategoriesController < ApplicationController
  # GET /api/categories
  def index
    categories = Category.order(:name)
    render json: categories.map { |category| format_category(category) }
  end

  # POST /api/categories
  def create
    category = Category.new(category_params)

    if category.save
      render json: format_category(category), status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/categories/:id
  def update
    category = Category.find(params[:id])

    if category.update(category_params)
      render json: format_category(category)
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/categories/:id
  def destroy
    category = Category.find(params[:id])
    
    category.destroy
    head :no_content
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def format_category(category)
    {
      id: category.id,
      name: category.name,
      created_at: category.created_at,
      updated_at: category.updated_at
    }
  end
end

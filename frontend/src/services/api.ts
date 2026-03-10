/**
 * API service for communicating with the backend
 */

import { Expense, ExpenseFormData, Category, CategoryFormData } from "../types";

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fetch all expenses
 */
export async function fetchExpenses(): Promise<Expense[]> {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

/**
 * Fetch expenses for a specific year and month
 */
export async function getExpenses(
  year: number,
  month: number,
): Promise<Expense[]> {
  const response = await fetch(
    `${API_BASE_URL}/expenses?year=${year}&month=${month}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<
  Array<{ id: number; name: string }>
> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

/**
 * Create a new expense
 */
export async function createExpense(data: ExpenseFormData): Promise<Expense> {
  // Convert category name to category_id
  const categories = await fetchCategories();
  const category = categories.find((c) => c.name === data.category);

  const expenseData = {
    description: data.description,
    amount: data.amount,
    category_id: category?.id,
    date: data.date,
  };

  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expense: expenseData }),
  });

  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  return response.json();
}

/**
 * Update an existing expense
 */
export async function updateExpense(
  id: number,
  data: Partial<ExpenseFormData>,
): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expense: data }),
  });

  if (!response.ok) {
    throw new Error("Failed to update expense");
  }

  return response.json();
}

/**
 * Delete an expense
 */
export async function deleteExpense(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
}

/**
 * Create a category
 *
 * @param data:(CategoryFormData) - data of a category instance
 * @return (json) - succesfully created data
 */
export async function createCategory(
  data: CategoryFormData,
): Promise<Category> {
  const categoryData = {
    name: data.name,
  };

  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: categoryData }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}

/**
 * Get list of categories
 *
 * @param none
 * @return (json) - list of categories
 */
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
}

/**
 * Update an existing category
 *
 * @param id:(number) - the ID of the category to update
 * @param data:(CategoryFormData) - the updated category data
 * @return (json) - successfully updated category
 */
export async function updateCategory(
  id: number | string,
  data: CategoryFormData,
): Promise<Category> {
  const categoryData = {
    name: data.name,
  };

  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT", // PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: categoryData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return response.json();
}

/**
 * Delete a category
 *
 * @param id:(number) - the ID of the category to delete
 * @return none
 */
export async function deleteCategory(id: number | string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}

/**
 * Form component for creating or editing categories
 */

import React from "react";
import { CategoryFormData } from "../types";
import { TextField, Button } from "../vibes";
import { useCategoryForm } from "../hooks/useCategoryForm"; // Make sure this path is correct!

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CategoryForm({
  onSubmit,
  onCancel,
  submitLabel = "Add Category",
}: CategoryFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCategoryForm({ onSubmit });

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const actionContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Category Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        fullWidth
        placeholder="e.g., Groceries, Rent, Travel"
        disabled={isSubmitting}
      />

      <div style={actionContainerStyle}>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

/**
 * Form component for creating or editing categories
 */

import React, { useState } from "react";
import { CategoryFormData } from "../types";
import { TextField, Button } from "../vibes";

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
  const [name, setName] = useState("");
  const [];
}

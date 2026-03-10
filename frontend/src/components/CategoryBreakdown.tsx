import React from "react";
import {
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
} from "../services/api";
import { CATEGORY_EMOJIS } from "../constants/categoryEmojis";
import { COLORS } from "../constants/colors";
import { Button, Modal } from "../vibes";
import { CategoryFormData } from "../types";
import { CategoryForm } from "./CategoryForm";

interface CategoryData {
  id: number;
  category: string;
  amount: number;
  count: number;
}

interface CategoryBreakdownProps {
  categories: CategoryData[];
  total: number;
  totalCount: number;
  onCategoryUpdated: () => void;
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  total,
  totalCount,
  onCategoryUpdated,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [editingCategory, setEditingCategory] =
    React.useState<CategoryData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [deletingCategory, setDeletingCategory] =
    React.useState<CategoryData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: CategoryData) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;
    try {
      await deleteCategoryApi(deletingCategory.id);
      setIsDeleteModalOpen(false);
      setDeletingCategory(null);
      onCategoryUpdated();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  };

  const updateCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;
    try {
      await updateCategoryApi(editingCategory.id, data);
      setIsEditModalOpen(false);
      setEditingCategory(null);
      onCategoryUpdated();
    } catch (error) {
      console.error("Failed to update category:", error);
      throw error;
    }
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const containerStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const totalStyle: React.CSSProperties = {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: `1px solid ${COLORS.secondary.s04}`,
    background: COLORS.secondary.s01,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const totalLabelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 600,
    color: COLORS.secondary.s08,
    letterSpacing: "0.05em",
  };

  const totalAmountStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
  };

  const totalCountStyle: React.CSSProperties = {
    fontSize: "14px",
    color: COLORS.secondary.s07,
    marginLeft: "auto",
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: "102px",
    height: "32px",
    background: COLORS.secondary.s03,
    border: "none",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: COLORS.secondary.s08,
    transition: "all 0.2s",
    flexShrink: 0,
  };

  const listStyle: React.CSSProperties = {
    padding: "8px",
  };

  const itemStyle: React.CSSProperties = {
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: COLORS.secondary.s01,
    borderRadius: "8px",
    marginBottom: "8px",
    transition: "all 0.2s",
  };

  const itemInfoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const itemIconStyle: React.CSSProperties = {
    fontSize: "32px",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const itemDetailsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const itemNameStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: COLORS.secondary.s10,
  };

  const itemCountStyle: React.CSSProperties = {
    fontSize: "14px",
    color: COLORS.secondary.s07,
  };

  const itemAmountStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
  };

  return (
    <div style={containerStyle}>
      <div
        style={totalStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
          }
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.secondary.s02;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = COLORS.secondary.s01;
        }}
      >
        <span style={totalLabelStyle}>TOTAL:</span>
        <span style={totalAmountStyle}>{formatAmount(total)}</span>
        <span style={totalCountStyle}>({totalCount} transactions)</span>
        <button
          style={toggleButtonStyle}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.secondary.s04;
            e.currentTarget.style.color = COLORS.secondary.s10;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COLORS.secondary.s03;
            e.currentTarget.style.color = COLORS.secondary.s08;
          }}
        >
          Categories
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path d="M8 11l-5-5h10z" />
          </svg>
        </button>
      </div>

      {!isCollapsed && (
        <div style={listStyle}>
          {categories.map((category) => (
            <div
              key={category.category}
              style={itemStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.secondary.s02;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.secondary.s01;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={actionButtonsStyle}>
                <div style={itemInfoStyle}>
                  <span style={itemIconStyle}>
                    {CATEGORY_EMOJIS[category.category] || "📊"}
                  </span>
                  <div style={itemDetailsStyle}>
                    <div style={itemNameStyle}>{category.category}</div>
                    <div style={itemCountStyle}>
                      {category.count} transaction
                      {category.count !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                {category.id !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDelete(category)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              <div style={itemAmountStyle}>{formatAmount(category.amount)}</div>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCategory(null);
        }}
        title="Edit Category"
      >
        {editingCategory && (
          <CategoryForm
            initialData={{ name: editingCategory.category }}
            onSubmit={updateCategory}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingCategory(null);
            }}
            onDelete={handleDelete}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCategory(null);
        }}
        title="Delete Category"
      >
        <div style={{ padding: "16px 0", color: COLORS.secondary.s08 }}>
          <p>
            Are you sure you want to delete the category{" "}
            <strong>"{deletingCategory?.category}"</strong>?
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: COLORS.secondary.s07,
            }}
          >
            Warning: This action cannot be undone.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingCategory(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryBreakdown;

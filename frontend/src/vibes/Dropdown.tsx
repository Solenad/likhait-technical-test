/**
 * Reusable Dropdown Menu component
 */

import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../constants/colors";

export interface DropdownItem {
  label: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "0.5rem",
    backgroundColor: COLORS.background?.main,
    borderRadius: "0.5rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${COLORS.border}`,
    minWidth: "160px",
    zIndex: 50,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const itemStyle: React.CSSProperties = {
    padding: "0.75rem 1rem",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: COLORS.text?.primary || "#111827",
    background: "transparent",
    border: "none",
    textAlign: "left",
    transition: "background-color 0.2s",
    width: "100%",
  };

  return (
    <div style={containerStyle} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: "inline-block" }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div style={menuStyle}>
          {items.map((item, index) => (
            <button
              key={index}
              style={itemStyle}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  COLORS.background?.secondary || "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

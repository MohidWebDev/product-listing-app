import React from "react";
import { Plus } from "lucide-react";

interface HeaderProps {
  totalCount: number;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  onOpenAddModal,
}) => {
  return (
    <header
      id="app-header"
      className="flex items-center justify-between gap-4 py-2 flex-wrap sm:flex-nowrap"
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
        <h1
          id="page-title"
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
        >
          Product Catalog
        </h1>
        <span
          id="product-count-badge"
          className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100/80 text-indigo-700 border border-indigo-200/60 shadow-2xs whitespace-nowrap transition-all"
        >
          {totalCount} {totalCount === 1 ? "Total Product" : "Total Products"}
        </span>
      </div>

      <button
        id="open-add-product-modal-btn"
        type="button"
        onClick={onOpenAddModal}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 cursor-pointer whitespace-nowrap"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Product</span>
      </button>
    </header>
  );
};

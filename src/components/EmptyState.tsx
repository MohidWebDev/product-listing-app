import React from "react";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  onResetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div
      id="no-products-found"
      className="bg-white rounded-xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center my-4"
    >
      <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-500 mb-3.5">
        <PackageSearch className="w-7 h-7 stroke-[1.8]" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
        No products found
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-5">
        No products match your current search query or selected category filter.
      </p>
      <button
        id="reset-filters-empty-btn"
        type="button"
        onClick={onResetFilters}
        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium rounded-lg border border-indigo-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      >
        Clear filters
      </button>
    </div>
  );
};

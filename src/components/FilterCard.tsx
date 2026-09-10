import React from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { ProductCategory, CATEGORIES } from "../types";

interface FilterCardProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory | "All";
  onCategoryChange: (category: ProductCategory | "All") => void;
  onOpenAddModal?: () => void;
}

export const FilterCard: React.FC<FilterCardProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "All";

  return (
    <section
      id="filters-card"
      aria-labelledby="filters-title"
      className="bg-white rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            id="filters-title"
            className="text-base sm:text-lg font-semibold text-slate-900"
          >
            Filters
          </h2>
          {isFiltering && (
            <button
              id="clear-filters-btn"
              type="button"
              onClick={() => {
                onSearchChange("");
                onCategoryChange("All");
              }}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          {/* Search Query */}
          <div className="sm:col-span-8 flex flex-col gap-1.5">
            <label
              htmlFor="filter-search-input"
              className="text-xs font-medium text-slate-700"
            >
              Search Query
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                id="filter-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by name or SKU..."
                className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm pl-9 pr-8 py-2 rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-4 flex flex-col gap-1.5">
            <label
              htmlFor="filter-category-select"
              className="text-xs font-medium text-slate-700"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="filter-category-select"
                value={selectedCategory}
                onChange={(e) =>
                  onCategoryChange(e.target.value as ProductCategory | "All")
                }
                className="w-full bg-slate-50 text-slate-900 text-sm pl-3.5 pr-8 py-2 rounded-lg border border-slate-200 appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

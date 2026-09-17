import { useMemo } from "react";
import { Product, ProductCategory } from "../types";
import { Header } from "../components/Header";
import { FilterCard } from "../components/FilterCard";
import { ProductCard } from "../components/ProductCard";
import { EmptyState } from "../components/EmptyState";
import { AddProductModal } from "../components/AddProductModal";
import { useState } from "react";

interface HomePageProps {
  products: Product[];
  onAddProduct: (p: {
    name: string;
    category: ProductCategory;
    price: number;
    imageUrl?: string;
  }) => void;
  onDeleteProduct: (id: string) => void;
}

export default function HomePage({
  products,
  onAddProduct,
  onDeleteProduct,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "All"
  >("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        trimmedQuery === "" ||
        product.name.toLowerCase().includes(trimmedQuery);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header
          totalCount={filteredProducts.length}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
        <FilterCard
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
            Catalog Inventory
          </h2>
          {filteredProducts.length === 0 ? (
            <EmptyState onResetFilters={handleResetFilters} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={onDeleteProduct}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={onAddProduct}
      />
    </div>
  );
}

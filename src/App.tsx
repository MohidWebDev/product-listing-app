import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Product, ProductCategory } from "./types";
import { INITIAL_PRODUCTS } from "./data/initialProducts";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const handleAddProduct = (newProd: {
    name: string;
    category: ProductCategory;
    price: number;
    imageUrl?: string;
  }) => {
    const product: Product = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...newProd,
    };
    setProducts((prev) => [product, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        }
      />
      <Route
        path="/products/:id"
        element={<ProductDetailPage products={products} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

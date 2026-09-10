import { Product, ProductCategory } from "../types";

export const CATEGORY_DEFAULT_IMAGES: Record<ProductCategory, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
  "Office Furniture":
    "https://images.unsplash.com/photo-1580481077190-73614561e9f9?auto=format&fit=crop&w=600&q=80",
  Audio:
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
  Accessories:
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80",
};

export function getDefaultProductImage(
  name: string,
  category: ProductCategory,
): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("keyboard")) {
    return "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("chair")) {
    return "https://images.unsplash.com/photo-1580481077190-73614561e9f9?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("headphone") || lowerName.includes("earphone")) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";
  }
  if (
    lowerName.includes("monitor") ||
    lowerName.includes("screen") ||
    lowerName.includes("display")
  ) {
    return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("desk") || lowerName.includes("table")) {
    return "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80";
  }
  if (
    lowerName.includes("hub") ||
    lowerName.includes("adapter") ||
    lowerName.includes("port")
  ) {
    return "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("mouse") || lowerName.includes("trackpad")) {
    return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("mic") || lowerName.includes("microphone")) {
    return "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80";
  }
  return (
    CATEGORY_DEFAULT_IMAGES[category] || CATEGORY_DEFAULT_IMAGES["Electronics"]
  );
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Pro Mechanical Keyboard",
    category: "Electronics",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-2",
    name: "Ergonomic Mesh Chair",
    category: "Office Furniture",
    price: 349.0,
    imageUrl:
      "https://images.unsplash.com/photo-1580481077190-73614561e9f9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-3",
    name: "Noise-Cancelling Studio Headphones",
    category: "Audio",
    price: 199.5,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-4",
    name: '4K Ultra-Wide Monitor 34"',
    category: "Electronics",
    price: 549.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-5",
    name: "Walnut Standing Desk Converter",
    category: "Office Furniture",
    price: 219.0,
    imageUrl:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-6",
    name: "USB-C Multi-Port Hub",
    category: "Accessories",
    price: 45.0,
    imageUrl:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-7",
    name: "Precision Wireless Mouse",
    category: "Accessories",
    price: 69.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prod-8",
    name: "Studio Desktop Microphone",
    category: "Audio",
    price: 119.0,
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
];

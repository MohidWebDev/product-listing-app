import { useParams, Link } from "react-router-dom";
import { Product } from "../types";

export default function ProductDetailPage({
  products,
}: {
  products: Product[];
}) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p>Product not found.</p>
        <Link to="/" className="text-indigo-600 underline">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-4">
      <Link to="/" className="text-indigo-600 text-sm underline">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
        {product.category}
      </span>
      <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full rounded-lg"
        />
      )}
    </div>
  );
}

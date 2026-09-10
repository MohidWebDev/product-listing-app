import React, { useState } from "react";
import { Trash2, ImageOff } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group min-w-0"
    >
      {/* Product Image Area: adjusted height & width with optimal 4:3 / balanced aspect ratio */}
      <div
        id={`product-image-container-${product.id}`}
        className="w-full aspect-4/3 min-h-42.5 max-h-55 bg-slate-100 overflow-hidden relative border-b border-slate-100 flex items-center justify-center"
      >
        {!hasError && product.imageUrl ? (
          <img
            id={`product-img-${product.id}`}
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50/50 text-indigo-400 gap-1.5 p-4 text-center">
            <ImageOff className="w-8 h-8 stroke-[1.5]" />
            <span className="text-[11px] font-medium text-slate-400">
              No image
            </span>
          </div>
        )}
      </div>

      {/* Product Information Area */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Product Name (allows wrapping to two lines, no truncation) */}
        <h3
          id={`product-title-${product.id}`}
          title={product.name}
          className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 min-h-10 wrap-break-word"
        >
          {product.name}
        </h3>

        {/* Category badge/pill below the name */}
        <div>
          <span
            id={`product-badge-${product.id}`}
            className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/80 whitespace-nowrap"
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Bottom price and delete action */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between mt-auto bg-slate-50/50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400 leading-none mb-1">
            Price
          </span>
          <span
            id={`product-price-${product.id}`}
            className="text-base font-bold text-slate-900 tabular-nums leading-tight"
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button
          id={`delete-product-${product.id}`}
          type="button"
          onClick={() => onDelete(product.id)}
          aria-label={`Delete ${product.name}`}
          className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 active:bg-rose-100 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

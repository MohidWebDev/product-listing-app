import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  Plus,
  DollarSign,
  ChevronDown,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
} from "lucide-react";
import { ProductCategory, CATEGORIES } from "../types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    category: ProductCategory;
    price: number;
    imageUrl?: string;
  }) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Electronics");
  const [price, setPrice] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContentRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and manage body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    setIsVisible(false);
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeyDown);
    const timeout = setTimeout(() => setShouldRender(false), 150);
    return () => clearTimeout(timeout);
  }, [isOpen, onClose]);

  useLayoutEffect(() => {
    if (imageContentRef.current) {
      setContentHeight(imageContentRef.current.scrollHeight);
    }
  }, [imageMode, uploadedImage, isDragging]);

  if (!shouldRender) return null;

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP, etc.).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image file is too large. Please select an image under 5MB.");
      return;
    }

    setError(null);
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setUploadedImage(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileProcess(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const clearUploadedFile = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUploadedImage(null);
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("Electronics");
    setPrice("");
    setImageUrl("");
    clearUploadedFile();
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter a product name.");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Please enter a valid positive price.");
      return;
    }

    let finalImageUrl: string | undefined;
    if (imageMode === "upload" && uploadedImage) {
      finalImageUrl = uploadedImage;
    } else if (imageMode === "url" && imageUrl.trim()) {
      finalImageUrl = imageUrl.trim();
    } else {
      finalImageUrl = undefined;
    }

    onAddProduct({
      name: trimmedName,
      category,
      price: Math.round(parsedPrice * 100) / 100,
      imageUrl: finalImageUrl,
    });

    resetForm();
    onClose();
  };

  return (
    <div
      id="add-product-modal-backdrop"
      className={`fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        id="add-product-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-add-product-title"
        className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-xl w-full p-5 sm:p-7 relative my-8 transition-all duration-150 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div>
              <h2
                id="modal-add-product-title"
                className="text-lg font-semibold text-slate-900 leading-tight"
              >
                Add Product
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill in the details to add a new item to the catalog inventory.
              </p>
            </div>
          </div>
          <button
            id="close-add-product-modal-btn"
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div
            id="modal-add-product-error"
            role="alert"
            className="mt-4 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2.5 rounded-lg"
          >
            {error}
          </div>
        )}

        {/* Modal Form Content */}
        <form
          id="modal-add-product-form"
          onSubmit={handleSubmit}
          className="space-y-4 pt-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Product Name */}
            <div className="sm:col-span-12 flex flex-col gap-1.5">
              <label
                htmlFor="modal-product-name-input"
                className="text-xs font-medium text-slate-700"
              >
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="modal-product-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g., Wireless Ergonomic Keyboard"
                className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                required
                autoFocus
              />
            </div>

            {/* Category */}
            <div className="sm:col-span-6 flex flex-col gap-1.5">
              <label
                htmlFor="modal-product-category-select"
                className="text-xs font-medium text-slate-700"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="modal-product-category-select"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ProductCategory)
                  }
                  className="w-full bg-slate-50 text-slate-900 text-sm pl-3.5 pr-8 py-2.5 rounded-lg border border-slate-200 appearance-none cursor-pointer focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Price */}
            <div className="sm:col-span-6 flex flex-col gap-1.5">
              <label
                htmlFor="modal-product-price-input"
                className="text-xs font-medium text-slate-700"
              >
                Price (USD) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <input
                  id="modal-product-price-input"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="129.99"
                  className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm pl-7 pr-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  required
                />
              </div>
            </div>

            {/* Product Image Option (Upload from Computer OR Image URL) */}
            <div className="sm:col-span-12 flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between flex-wrap gap-1.5">
                <span className="text-xs font-medium text-slate-700">
                  Product Image
                </span>
                {/* Mode Selector Toggle */}
                <div
                  id="modal-image-source-mode-selector"
                  className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80"
                >
                  <button
                    id="modal-select-upload-mode-btn"
                    type="button"
                    onClick={() => {
                      setImageMode("upload");
                      setError(null);
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      imageMode === "upload"
                        ? "bg-white text-indigo-600 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Computer</span>
                  </button>
                  <button
                    id="modal-select-url-mode-btn"
                    type="button"
                    onClick={() => {
                      setImageMode("url");
                      setError(null);
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      imageMode === "url"
                        ? "bg-white text-indigo-600 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Image Link</span>
                  </button>
                </div>
              </div>

              {/* Animated height wrapper for upload/URL content */}
              <div
                className="overflow-hidden transition-[height] duration-200 ease-in-out"
                style={{ height: contentHeight }}
              >
                <div ref={imageContentRef}>
                  {/* Upload from Computer Mode */}
                  {imageMode === "upload" && (
                    <div>
                      <input
                        ref={fileInputRef}
                        id="modal-product-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />

                      {uploadedImage ? (
                        <div
                          id="modal-uploaded-image-preview"
                          className="flex items-center justify-between p-3 bg-indigo-50/60 border border-indigo-200/80 rounded-lg"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <img
                              src={uploadedImage}
                              alt="Product preview"
                              className="w-14 h-14 object-cover rounded-md border border-indigo-200/80 shadow-2xs shrink-0"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-medium text-slate-800 truncate">
                                {uploadedFileName || "Uploaded Image"}
                              </span>
                              <span className="text-[11px] text-indigo-600 font-medium">
                                Ready to use
                              </span>
                            </div>
                          </div>
                          <button
                            id="modal-remove-uploaded-image-btn"
                            type="button"
                            onClick={clearUploadedFile}
                            title="Remove image"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div
                          id="modal-image-dropzone"
                          role="button"
                          tabIndex={0}
                          onClick={() => fileInputRef.current?.click()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              fileInputRef.current?.click();
                            }
                          }}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`w-full border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                            isDragging
                              ? "border-indigo-500 bg-indigo-50/60"
                              : "border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-full bg-indigo-100/70 text-indigo-600 flex items-center justify-center">
                            <Upload className="w-4 h-4" />
                          </div>
                          <p className="text-xs font-medium text-slate-700">
                            <span className="text-indigo-600 font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop image here
                          </p>
                          <p className="text-[11px] text-slate-400">
                            PNG, JPG, GIF, WebP up to 5MB (a placeholder is
                            shown if left empty)
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Image Link URL Mode */}
                  {imageMode === "url" && (
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <input
                        id="modal-product-image-input"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/... (placeholder shown if empty)"
                        className="w-full bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm pl-8 pr-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              id="modal-cancel-button"
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="modal-submit-product-button"
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

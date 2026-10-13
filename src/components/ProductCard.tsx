"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number | null;
  images: string[];
  stock: number;
  category?: { name: string };
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock <= 0) return;
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || "",
      stock: product.stock,
    });
    setAdded(true);
    toast.success("Added to cart");
    setTimeout(() => setAdded(false), 1500);
  };

  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            No Image
          </div>
        )}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        {product.stock <= 0 && (
          <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        {product.category && (
          <p className="text-xs text-green-600 font-medium mb-1 uppercase tracking-wide">
            {product.category.name}
          </p>
        )}
        <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition line-clamp-2 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && product.compareAt > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock <= 0}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-sm font-medium py-2.5 rounded-lg transition"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}

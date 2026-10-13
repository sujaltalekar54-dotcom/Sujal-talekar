"use client";

import { useCart } from "@/store/cart";
import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock: number;
}

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.stock <= 0) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0] || "",
        stock: product.stock,
      },
      qty
    );
    setAdded(true);
    toast.success(`${qty} × ${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center border border-gray-200 rounded-lg">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="p-3 text-gray-600 hover:text-gray-900 transition"
          disabled={qty <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-medium">{qty}</span>
        <button
          onClick={() => setQty(Math.min(product.stock, qty + 1))}
          className="p-3 text-gray-600 hover:text-gray-900 transition"
          disabled={qty >= product.stock}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={product.stock <= 0}
        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        {added ? (
          <>
            <Check className="w-5 h-5" /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

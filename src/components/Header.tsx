"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";

export function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Tagde <span className="text-green-600">Nutrition</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Shop
            </Link>
            <Link href="/shop?category=muscle-building" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Muscle Building
            </Link>
            <Link href="/shop?category=vitamins-immunity" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Vitamins
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-green-600 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setMobileOpen(false)}>
                Shop All
              </Link>
              <Link href="/shop?category=muscle-building" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setMobileOpen(false)}>
                Muscle Building
              </Link>
              <Link href="/shop?category=vitamins-immunity" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setMobileOpen(false)}>
                Vitamins & Immunity
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setMobileOpen(false)}>
                Cart ({totalItems})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

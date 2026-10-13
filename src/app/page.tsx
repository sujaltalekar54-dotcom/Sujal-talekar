import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Shield, Truck, Award, Leaf } from "lucide-react";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 4,
    });
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-green-300 font-medium mb-3 tracking-wide uppercase text-sm">
              Premium Supplements for India
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Fuel Your Body.
              <br />
              <span className="text-green-300">Build Your Best Self.</span>
            </h1>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Clinically dosed supplements for muscle growth, recovery, and
              everyday nutrition. Made for Indians who train hard and live fully.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-green-900 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop?category=muscle-building"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
              >
                Muscle Building
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Lab Tested</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Free Shipping over ₹999</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Quality Guaranteed</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Clean Formulas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find the right supplements for your goals</p>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1 text-green-600 font-medium hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100"
              >
                {cat.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
                  <p className="text-white/80 text-sm">
                    {cat._count.products} products
                  </p>
                </div>
              </Link>
            ))
          ) : (
            // Fallback when DB not connected
            ["Muscle Building", "General Nutrition", "Pre & Post Workout", "Vitamins & Immunity"].map(
              (name) => (
                <div
                  key={name}
                  className="rounded-xl aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-200 flex items-end p-5"
                >
                  <h3 className="font-semibold text-green-900 text-lg">{name}</h3>
                </div>
              )
            )
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Our best-sellers trusted by thousands</p>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-green-600 font-medium hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.length > 0 ? (
              featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // Placeholder cards when DB empty
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Level Up Your Nutrition?</h2>
          <p className="text-green-100 max-w-xl mx-auto mb-8">
            Join thousands of Indians who trust Tagde Nutrition for clean, effective supplements.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition"
          >
            Browse All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

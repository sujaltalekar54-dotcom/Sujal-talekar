import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SearchParams {
  category?: string;
  q?: string;
}

async function getProducts(searchParams: SearchParams) {
  try {
    const where: any = {};
    if (searchParams.category) {
      where.category = { slug: searchParams.category };
    }
    if (searchParams.q) {
      where.OR = [
        { name: { contains: searchParams.q, mode: "insensitive" } },
        { description: { contains: searchParams.q, mode: "insensitive" } },
      ];
    }
    return await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
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

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="text-gray-500 mt-1">
          {products.length} product{products.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-56 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/shop"
                  className={`block px-3 py-2 rounded-lg text-sm transition ${
                    !params.category
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      params.category === cat.slug
                        ? "bg-green-50 text-green-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}{" "}
                    <span className="text-gray-400">({cat._count.products})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found.</p>
              <Link
                href="/shop"
                className="inline-block mt-4 text-green-600 font-medium hover:underline"
              >
                View all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

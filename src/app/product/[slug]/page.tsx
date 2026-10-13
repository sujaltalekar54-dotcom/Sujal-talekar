import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-green-600">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <Link
          href={`/shop?category=${product.category.slug}`}
          className="hover:text-green-600"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
            {product.images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
                No Image
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="aspect-square object-cover rounded-lg border border-gray-100"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-green-600 uppercase tracking-wide mb-2">
            {product.category.name}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && product.compareAt > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compareAt)}
                </span>
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-0.5 rounded">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stock & Add to Cart */}
          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500 mb-4">
              {product.stock > 10
                ? "In Stock"
                : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of Stock"}
            </p>
            <AddToCartButton product={product} />
          </div>

          {/* Extra info */}
          <div className="mt-8 space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Ingredients</h4>
              <p className="text-gray-600">{product.ingredients}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">How to Use</h4>
              <p className="text-gray-600">{product.usage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingBag, Users, IndianRupee } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [productCount, orderCount, userCount, orders] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: true, items: true },
      }),
    ]);

    const revenue = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: "paid" },
    });

    return {
      productCount,
      orderCount,
      userCount,
      revenue: revenue._sum.totalAmount || 0,
      recentOrders: orders,
    };
  } catch {
    return {
      productCount: 0,
      orderCount: 0,
      userCount: 0,
      revenue: 0,
      recentOrders: [],
    };
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Link
          href="/admin/products"
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
        >
          Manage Products
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.productCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.orderCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Customers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.userCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 rounded-lg">
              <IndianRupee className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(stats.revenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-lg">Recent Orders</h2>
        </div>
        {stats.recentOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No orders yet. Orders will appear here once customers start buying.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Order</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Customer</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Amount</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.user?.name || order.shippingName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

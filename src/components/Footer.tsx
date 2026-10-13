import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-lg text-white">
                Tagde Nutrition
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium nutritional supplements designed for Indians who want to
              build muscle, stay healthy, and perform at their best.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-green-400 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=muscle-building" className="hover:text-green-400 transition">
                  Muscle Building
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pre-post-workout" className="hover:text-green-400 transition">
                  Pre & Post Workout
                </Link>
              </li>
              <li>
                <Link href="/shop?category=vitamins-immunity" className="hover:text-green-400 transition">
                  Vitamins & Immunity
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-green-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-green-400 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-green-400 transition">
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@tagdenutrition.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Mon–Sat: 10am – 7pm IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Tagde Nutrition. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

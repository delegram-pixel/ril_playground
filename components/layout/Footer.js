import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Renaissance HAVEN</h3>
            <p className="text-stone-200 text-sm">
              A living registry of systems, signals, and solutions built by the Innovation Lab.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-stone-200 hover:text-white transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-200 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-stone-200 hover:text-white transition-colors text-sm">
                  Sponsors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Innovation Lab</h3>
            <p className="text-stone-200 text-sm mb-2">
              Building solutions for systemic challenges.
            </p>
            <p className="text-stone-300 text-xs">
              Version 1.0.0 • Status: Live
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-light text-center text-stone-300 text-sm">
          © {currentYear} Renaissance HAVEN. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

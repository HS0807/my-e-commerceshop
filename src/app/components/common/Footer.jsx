import Link from "next/link";

export default function Footer() {

  return (
    <footer className="bg-[#111111] text-white">
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        
        <div>
          <h2 className="text-3xl font-serif tracking-widest mb-4">
            VELOURA
          </h2>

          <p className="text-gray-400 leading-7">
            Luxury fashion crafted with premium quality,
            timeless elegance, and modern style.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-5">Shop</h3>

          <ul className="space-y-3 text-gray-400">
            <li><Link href="#">Women</Link></li>
            <li><Link href="#">Men</Link></li>
            <li><Link href="#">Accessories</Link></li>
            <li><Link href="#">Beauty</Link></li>
            <li><Link href="#">New Arrivals</Link></li>
            <li><Link href="#">Sale</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-semibold text-lg mb-5">Company</h3>

          <ul className="space-y-3 text-gray-400">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Our Story</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-5">Support</h3>

          <ul className="space-y-3 text-gray-400">
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Shipping</Link></li>
            <li><Link href="#">Returns</Link></li>
            <li><Link href="#">Track Order</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}


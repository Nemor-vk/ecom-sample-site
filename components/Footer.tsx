import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-400">VK Store</h3>
            <p className="text-gray-300 leading-relaxed">
              Your one-stop destination for electronics, fashion, watches, and more. Quality products at unbeatable
              prices with fast delivery.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-400">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-400">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-400">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-400">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions", "Return Policy", "Shipping Info"].map(
                (link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              {["Electronics", "Fashion", "Watches", "Mobiles", "T-Shirts", "Bags", "Accessories", "Home & Garden"].map(
                (category) => (
                  <li key={category}>
                    <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                      {category}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300 text-sm">123 Store Street, City, State 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300 text-sm">support@vkstore.com</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Newsletter</h5>
              <p className="text-sm text-gray-300">Subscribe for updates and exclusive offers</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="bg-slate-800 border-slate-700 text-white" />
                <Button className="bg-orange-500 hover:bg-orange-600">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 VK Store. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>We Accept:</span>
            <div className="flex gap-2">
              <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">VISA</div>
              <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">MC</div>
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">PAYPAL</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

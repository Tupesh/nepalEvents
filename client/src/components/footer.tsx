import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-om text-primary text-2xl mr-2"></i>
              <span className="font-heading font-bold text-xl">नेपाली संस्कृति</span>
            </div>
            <p className="text-gray-400 mb-4">Celebrating and preserving authentic Nepali cultural events and traditions.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Event Types</h4>
            <ul className="space-y-2">
              <li><Link href="/events?type=1" className="text-gray-400 hover:text-primary transition-colors">Weddings</Link></li>
              <li><Link href="/events?type=2" className="text-gray-400 hover:text-primary transition-colors">Bratabandha</Link></li>
              <li><Link href="/events?type=3" className="text-gray-400 hover:text-primary transition-colors">Pasni</Link></li>
              <li><Link href="/events?type=4" className="text-gray-400 hover:text-primary transition-colors">Gunau Choli</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-primary transition-colors">Other Ceremonies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                <span className="text-gray-400">Thamel, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2 text-primary"></i>
                <span className="text-gray-400">+977 01-4123456</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-primary"></i>
                <span className="text-gray-400">info@nepalisanskrti.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="font-heading font-bold mb-2">Subscribe to Newsletter</h5>
              <form className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md w-full focus:outline-none text-neutral-dark" />
                <button type="submit" className="bg-primary px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2023 नेपाली संस्कृति. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

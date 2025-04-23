
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold text-center mb-8">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-heading font-bold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary text-xl w-8"></i>
                    <p>Thamel, Kathmandu, Nepal</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-primary text-xl w-8"></i>
                    <p>+977 01-4123456</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-primary text-xl w-8"></i>
                    <p>info@nepalisanskrti.com</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-primary text-xl w-8"></i>
                    <p>Open: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-heading font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-neutral hover:text-primary transition-colors">
                      <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="#" className="text-neutral hover:text-primary transition-colors">
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="text-neutral hover:text-primary transition-colors">
                      <i className="fab fa-twitter text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-heading font-bold mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

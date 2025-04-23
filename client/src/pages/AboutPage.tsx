
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-red-50 to-yellow-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-600 text-transparent bg-clip-text">About Us</h1>
            <p className="text-neutral max-w-3xl mx-auto">
              Learn more about our mission to preserve and celebrate Nepali cultural traditions.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  We are dedicated to preserving and celebrating Nepali cultural traditions by providing a seamless platform for organizing traditional ceremonies. Our goal is to make these important cultural events accessible while maintaining their authenticity and significance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">Our Services</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Traditional Wedding Ceremonies</li>
                  <li>Bratabandha Celebrations</li>
                  <li>Pasni Ceremonies</li>
                  <li>Cultural Event Planning</li>
                  <li>Venue Arrangements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold mb-4">Why Choose Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-bold mb-2">Authentic Experience</h3>
                    <p className="text-gray-600">We ensure every ceremony follows traditional Nepali customs and rituals.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-bold mb-2">Professional Service</h3>
                    <p className="text-gray-600">Our experienced team handles all aspects of event planning and execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

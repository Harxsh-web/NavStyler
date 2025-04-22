import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Feel-Good Productivity</h3>
            <p className="text-gray-400 mb-4">
              The science-based guide to achieving more while feeling good in the process.
            </p>
            <div className="flex space-x-4">
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition cursor-pointer">
                <FaTwitter />
              </span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition cursor-pointer">
                <FaFacebook />
              </span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition cursor-pointer">
                <FaInstagram />
              </span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-cyan-600 transition cursor-pointer">
                <FaYoutube />
              </span>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">About Us</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Blog</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Careers</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Press</span>
              </li>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Podcast</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">YouTube</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Newsletter</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Courses</span>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">FAQs</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Contact Us</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition cursor-pointer">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Feel-Good Productivity. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-gray-500 text-sm hover:text-white transition cursor-pointer">Privacy</span>
              <span className="text-gray-500 text-sm hover:text-white transition cursor-pointer">Terms</span>
              <span className="text-gray-500 text-sm hover:text-white transition cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
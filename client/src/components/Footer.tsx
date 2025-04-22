
import { FaYoutube, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          {/* Logo and Copyright - Left Column */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 text-[#30B8C4] mr-2" viewBox="0 0 40 40" fill="currentColor">
                <path d="M6.5 26.5L13.5 13.5M26.5 26.5L19.5 13.5M8 18.5H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-2xl font-bold">Ali Abdaal</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              © Ali Abdaal {currentYear}. All rights reserved.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              <a href="https://youtube.com" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="YouTube">
                <FaYoutube className="text-gray-700 w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="Instagram">
                <FaInstagram className="text-gray-700 w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="text-gray-700 w-5 h-5" />
              </a>
              <a href="https://tiktok.com" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="TikTok">
                <FaTiktok className="text-gray-700 w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="Twitter">
                <FaTwitter className="text-gray-700 w-5 h-5" />
              </a>
              <a href="https://facebook.com" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors" aria-label="Facebook">
                <FaFacebook className="text-gray-700 w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Desktop Links - Right Column */}
          <div className="hidden md:grid md:grid-cols-3 gap-12">
            {/* More Column */}
            <div>
              <h3 className="font-semibold mb-4">More</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="/jobs" className="text-gray-600 hover:text-gray-900">Jobs</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/account" className="text-gray-600 hover:text-gray-900">My Account</Link></li>
              </ul>
            </div>
            
            {/* Free Content Column */}
            <div>
              <h3 className="font-semibold mb-4">Free Content</h3>
              <ul className="space-y-3">
                <li><Link href="/newsletter" className="text-gray-600 hover:text-gray-900">Newsletter</Link></li>
                <li><Link href="/articles" className="text-gray-600 hover:text-gray-900">Articles & Guides</Link></li>
                <li><Link href="/podcast" className="text-gray-600 hover:text-gray-900">Podcast</Link></li>
                <li><Link href="/videos" className="text-gray-600 hover:text-gray-900">Videos</Link></li>
                <li><Link href="/book-notes" className="text-gray-600 hover:text-gray-900">Book Notes</Link></li>
              </ul>
            </div>
            
            {/* Products Column */}
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-3">
                <li><Link href="/book" className="text-gray-600 hover:text-gray-900">My Book</Link></li>
                <li><Link href="/academy" className="text-gray-600 hover:text-gray-900">YouTuber Academy</Link></li>
                <li><Link href="/lifeos" className="text-gray-600 hover:text-gray-900">LifeOS</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Mobile Links */}
          <div className="md:hidden">
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-center">More</h3>
              <ul className="space-y-3 text-center">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="/jobs" className="text-gray-600 hover:text-gray-900">Jobs</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/account" className="text-gray-600 hover:text-gray-900">My Account</Link></li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-center">Free Content</h3>
              <ul className="space-y-3 text-center">
                <li><Link href="/newsletter" className="text-gray-600 hover:text-gray-900">Newsletter</Link></li>
                <li><Link href="/articles" className="text-gray-600 hover:text-gray-900">Articles & Guides</Link></li>
                <li><Link href="/podcast" className="text-gray-600 hover:text-gray-900">Podcast</Link></li>
                <li><Link href="/videos" className="text-gray-600 hover:text-gray-900">Videos</Link></li>
                <li><Link href="/book-notes" className="text-gray-600 hover:text-gray-900">Book Notes</Link></li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-center">Products</h3>
              <ul className="space-y-3 text-center">
                <li><Link href="/book" className="text-gray-600 hover:text-gray-900">My Book</Link></li>
                <li><Link href="/academy" className="text-gray-600 hover:text-gray-900">YouTuber Academy</Link></li>
                <li><Link href="/lifeos" className="text-gray-600 hover:text-gray-900">LifeOS</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16L11.2929 16.7071L12 17.4142L12.7071 16.7071L12 16ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8L13 8ZM7.29289 12.7071L11.2929 16.7071L12.7071 15.2929L8.70711 11.2929L7.29289 12.7071ZM12.7071 16.7071L16.7071 12.7071L15.2929 11.2929L11.2929 15.2929L12.7071 16.7071ZM13 16L13 8L11 8L11 16L13 16Z" fill="currentColor"/>
              </svg>
              <span className="text-gray-500 text-sm">Powered by Rockbase</span>
            </div>
            
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-gray-500 text-sm hover:text-gray-700">Privacy Policy</Link>
              <span className="text-gray-300">/</span>
              <Link href="/cookies" className="text-gray-500 text-sm hover:text-gray-700">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

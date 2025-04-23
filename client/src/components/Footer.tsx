import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaTiktok, 
  FaTwitter 
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10">
          <div className="flex flex-col items-start mb-6">
            <div className="flex items-center mb-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M8.5 32.5L27.5 8M20 8L32 27.5M8.5 14.5L14 8" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-2xl font-bold">Luke Mikic</span>
            </div>
            <p className="text-gray-500 text-sm">
              © Luke Mikic {currentYear}. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-3 mb-8">
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaYoutube className="text-gray-700" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaInstagram className="text-gray-700" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaLinkedin className="text-gray-700" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaTiktok className="text-gray-700" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaTwitter className="text-gray-700" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
              <FaFacebook className="text-gray-700" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">More</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">My Account</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Free Content</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Newsletter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Articles & Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Podcast</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Videos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Book Notes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">My Book</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">YouTuber Academy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">LifeOS</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="mb-4 md:mb-0 flex items-center">
            <img src="https://assets-global.website-files.com/60bec8a24b1b0aa818759fa7/60bec9d71b7ad0e33af8e77a_rockbase.svg" alt="Rockbase" className="h-5 mr-2" />
            <span className="text-gray-500 text-sm">Powered by Rockbase</span>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700 transition">Privacy Policy</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
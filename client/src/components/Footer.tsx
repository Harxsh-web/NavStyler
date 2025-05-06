import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaTiktok, 
  FaTwitter,
  FaSpotify,
  FaShoppingCart
} from "react-icons/fa";
import { SiRumble } from "react-icons/si";
import { SiApplepodcasts } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { SocialLink } from "@shared/schema";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const { data: socialLinks } = useQuery<SocialLink[]>({
    queryKey: ["/api/content/social-links"],
    queryFn: async () => {
      const response = await fetch("/api/content/social-links");
      if (!response.ok) {
        return [];
      }
      return await response.json();
    }
  });

  // Get icon component based on icon_name or fallback to platform name
  const getIconComponent = (socialLink: SocialLink) => {
    // If we have an icon_name field, use it
    if (socialLink.icon_name) {
      switch (socialLink.icon_name) {
        case 'FaYoutube':
          return <FaYoutube className="text-gray-700" />;
        case 'FaInstagram':
          return <FaInstagram className="text-gray-700" />;
        case 'FaLinkedin':
          return <FaLinkedin className="text-gray-700" />;
        case 'FaTiktok':
          return <FaTiktok className="text-gray-700" />;
        case 'FaTwitter':
          return <FaTwitter className="text-gray-700" />;
        case 'FaFacebook':
          return <FaFacebook className="text-gray-700" />;
        case 'FaSpotify':
          return <FaSpotify className="text-gray-700" />;
        case 'SiApplepodcasts':
          return <SiApplepodcasts className="text-gray-700" />;
        case 'SiRumble':
          return <SiRumble className="text-gray-700" />;
        default:
          // Fallback to platform name-based icons
          return platformToIcon(socialLink.platform);
      }
    }
    
    // If icon_name is not available, fallback to platform
    return platformToIcon(socialLink.platform);
  };
  
  // Map platform names to their respective icon components (fallback method)
  const platformToIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <FaYoutube className="text-gray-700" />;
      case 'instagram':
        return <FaInstagram className="text-gray-700" />;
      case 'linkedin':
        return <FaLinkedin className="text-gray-700" />;
      case 'tiktok':
        return <FaTiktok className="text-gray-700" />;
      case 'twitter':
        return <FaTwitter className="text-gray-700" />;
      case 'facebook':
        return <FaFacebook className="text-gray-700" />;
      case 'spotify':
        return <FaSpotify className="text-gray-700" />;
      case 'applepodcast':
        return <SiApplepodcasts className="text-gray-700" />;
      case 'rumble':
        return <SiRumble className="text-gray-700" />;
      default:
        return <FaYoutube className="text-gray-700" />;
    }
  };
  
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
            {socialLinks && socialLinks.length > 0 ? (
              socialLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 hover:scale-125 transition"
                >
                  {getIconComponent(link)}
                </a>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">More</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a></li>
              {/* <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">Jobs</a></li> */}
              <li><a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a></li>
              {/* <li><a href="#" className="text-gray-600 hover:text-gray-900 transition">My Account</a></li> */}
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
              <li>
                <Link to="/checkout" className="text-gray-600 hover:text-gray-900 transition flex items-center">
               
                  <span className="font-medium text-[#F9966B]">Enrol Now for $995 </span>
                </Link>
              </li>
              <li><a href="https://www.youtube.com/@lukemikic21" 
                    target="blank"
                    className="text-gray-600 hover:text-gray-900 transition">YouTuber Academy</a></li>
             
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          {/* <div className="mb-4 md:mb-0 flex items-center">
            <img src="https://assets-global.website-files.com/60bec8a24b1b0aa818759fa7/60bec9d71b7ad0e33af8e77a_rockbase.svg" alt="Rockbase" className="h-5 mr-2" />
            <span className="text-gray-500 text-sm">Powered by Rockbase</span>
          </div> */}
          
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
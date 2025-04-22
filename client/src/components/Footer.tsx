import { Link } from "wouter";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { SiYoutube, SiInstagram, SiLinkedin, SiFacebook } from "react-icons/si";

export default function Footer() {
  // In a real application, this would come from the API
  const currentYear = new Date().getFullYear();
  const siteName = "Ali Abdaal";
  
  // Footer categories and links based on the image provided
  const categories = [
    {
      id: 1,
      name: "More",
      links: [
        { id: 1, text: "About", url: "#" },
        { id: 2, text: "Jobs", url: "#" },
        { id: 3, text: "Contact", url: "#" },
        { id: 4, text: "My Account", url: "#" }
      ]
    },
    {
      id: 2,
      name: "Free Content",
      links: [
        { id: 5, text: "Newsletter", url: "#" },
        { id: 6, text: "Articles & Guides", url: "#" },
        { id: 7, text: "Podcast", url: "#" },
        { id: 8, text: "Videos", url: "#" },
        { id: 9, text: "Book Notes", url: "#" }
      ]
    },
    {
      id: 3,
      name: "Products",
      links: [
        { id: 10, text: "My Book", url: "#" },
        { id: 11, text: "YouTuber Academy", url: "#" },
        { id: 12, text: "LifeOS", url: "#" }
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { id: 1, name: "YouTube", icon: <SiYoutube className="w-5 h-5" />, url: "https://youtube.com" },
    { id: 2, name: "Instagram", icon: <SiInstagram className="w-5 h-5" />, url: "https://instagram.com" },
    { id: 3, name: "LinkedIn", icon: <SiLinkedin className="w-5 h-5" />, url: "https://linkedin.com" },
    { id: 4, name: "Twitter", icon: <FaTwitter className="w-5 h-5" />, url: "https://twitter.com" },
    { id: 5, name: "Facebook", icon: <SiFacebook className="w-5 h-5" />, url: "https://facebook.com" }
  ];

  return (
    <footer className="bg-white pt-16 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start">
            {/* Logo and copyright section */}
            <div className="mb-8 lg:mb-0 lg:w-1/4 pr-8">
              <Link href="/">
                <a className="flex items-center mb-6">
                  <svg viewBox="0 0 50 30" className="h-8 w-8 text-cyan-500 mr-2">
                    <path
                      fill="currentColor"
                      d="M10,25L20,15L30,25L40,15L30,5L20,15L10,5L0,15L10,25Z"
                    />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">{siteName}</span>
                </a>
              </Link>
              <p className="text-gray-500 text-sm mb-6">
                © {currentYear} Ali Abdaal. All rights reserved.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    aria-label={link.name}
                    className="bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition duration-150"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 lg:flex-1">
              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="font-medium text-gray-900 mb-4">{category.name}</h3>
                  <ul className="space-y-3">
                    {category.links.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.url}
                          className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row md:justify-between text-gray-500 text-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <span>Powered by</span>
            <a 
              href="https://rockbase.io" 
              className="ml-1 text-gray-600 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rockbase
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-900">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
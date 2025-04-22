import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import ResourcesDropdown from "./ResourcesDropdown";
import { navLinks } from "@/lib/menu-data";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const toggleResourcesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResourcesOpen(!resourcesOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-[#FAF9F6] border-b border-gray-100 py-4 px-6 md:px-10 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => {
                if (link.hasDropdown) {
                  return (
                    <div className="relative" ref={resourcesDropdownRef} key={index}>
                      <button 
                        className="nav-link flex items-center text-[#1A1A1A] hover:text-[#30B8C4] transition-colors duration-200"
                        onClick={toggleResourcesDropdown}
                      >
                        {link.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <ResourcesDropdown isOpen={resourcesOpen} />
                    </div>
                  );
                }
                
                return (
                  <a 
                    key={index}
                    href={link.href} 
                    className="nav-link text-[#1A1A1A] hover:text-[#30B8C4] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                );
              })}
              
              <Button className="bg-[#FF9470] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-full">
                Join 270k+ Subscribers
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="text-[#1A1A1A] hover:text-[#30B8C4] focus:outline-none transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={toggleMobileMenu} />

      {/* Add some additional styles */}
      <style jsx>{`
        .nav-link {
          position: relative;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #30B8C4;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover:after {
          width: 100%;
        }
        
        .dropdown {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: opacity 150ms ease-in-out, transform 150ms ease-in-out, visibility 150ms;
        }
        
        .dropdown.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .mobile-menu {
          transform: translateX(100%);
          transition: transform 300ms ease-in-out;
        }
        
        .mobile-menu.active {
          transform: translateX(0);
        }

        .resource-dropdown {
          max-height: 0;
          overflow: hidden;
          transition: max-height 300ms ease-in-out;
        }

        .resource-dropdown.active {
          max-height: 1000px;
        }
      `}</style>
    </>
  );
}

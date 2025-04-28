import { useState } from "react";
import { X as CloseIcon } from "lucide-react";
import { navLinks } from "@/lib/menu-data";
import ResourcesDropdown from "./ResourcesDropdown";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const toggleResources = () => {
    setResourcesOpen(!resourcesOpen);
  };

  return (
    <div 
      className={`mobile-menu fixed inset-0 z-50 transform overflow-auto bg-white w-full h-full ${isOpen ? 'active' : ''}`}
    >
      <div className="p-6">
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="text-[#1A1A1A] hover:text-[#30B8C4] transition-colors"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {navLinks.map((link, index) => {
            if (link.hasDropdown) {
              return (
                <div key={index}>
                  <button 
                    className="flex items-center justify-between w-full py-2 text-lg text-[#1A1A1A] hover:text-[#30B8C4] transition-colors"
                    onClick={toggleResources}
                  >
                    <span>{link.label}</span>
                    {resourcesOpen ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  <ResourcesDropdown isOpen={resourcesOpen} isMobile />
                </div>
              );
            }
            
            return (
              <a 
                key={index}
                href={link.href} 
                className="block py-2 text-lg text-[#1A1A1A] hover:text-[#30B8C4] transition-colors"
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4">
            <a href="https://youtube.com/@lukemikic21?si=9MqveJLGr8HNhApV" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-[#FF9470] hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-full">
                Join 270k+ Subscribers
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

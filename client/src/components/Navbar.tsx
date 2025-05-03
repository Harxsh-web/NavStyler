import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown, X, Menu } from 'lucide-react';
import { TransitionLink } from './TransitionLink';
import { DarkModeToggle } from './DarkModeToggle';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { HiOutlineDocument, HiOutlineBookOpen, HiOutlineVideoCamera } from 'react-icons/hi';
import { BiPodcast } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLightningCharge, BsYoutube, BsBook, BsLaptop, BsTools } from 'react-icons/bs';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [location] = useLocation();
  
  // Smooth scroll to section helper function
  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    // Only scroll if we're on the homepage
    if (location !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate header height to offset scroll position
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Define the sections for navigation
  const navSections = [
    { id: 'book-section', label: 'My Book' },
    { id: 'author-section', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'bonus-section', label: 'Bonuses' }
  ];
  
  // These are used for the Free Resources dropdown content in both desktop and mobile views
  const resourcesByType = [
    {
      href: "/articles",
      icon: <HiOutlineDocument size={18} />,
      label: "Articles",
      bgColor: "bg-orange-100",
      textColor: "text-orange-500",
    },
    {
      href: "/book-notes",
      icon: <HiOutlineBookOpen size={18} />,
      label: "Book Notes",
      bgColor: "bg-green-100",
      textColor: "text-green-500",
    },
    {
      href: "/videos",
      icon: <HiOutlineVideoCamera size={18} />,
      label: "Videos",
      bgColor: "bg-purple-100",
      textColor: "text-purple-500",
    },
    {
      href: "/podcast",
      icon: <BiPodcast size={18} />,
      label: "Podcast",
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
    },
    {
      href: "/newsletter",
      icon: <AiOutlineMail size={18} />,
      label: "Newsletter",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-500",
    },
  ];

  const resourcesByTopic = [
    {
      href: "/productivity",
      icon: <BsLightningCharge size={18} />,
      label: "Productivity",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-500",
    },
    {
      href: "/youtube",
      icon: <BsYoutube size={18} />,
      label: "YouTube",
      bgColor: "bg-red-100",
      textColor: "text-red-500",
    },
    {
      href: "/studying",
      icon: <BsBook size={18} />,
      label: "Studying",
      bgColor: "bg-gray-100",
      textColor: "text-gray-500",
    },
    {
      href: "/online-business",
      icon: <BsLaptop size={18} />,
      label: "Online Business",
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
    },
    {
      href: "/tools-tech",
      icon: <BsTools size={18} />,
      label: "Tools & Tech",
      bgColor: "bg-gray-100",
      textColor: "text-gray-500",
    },
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900 ${
      scrolled 
        ? 'shadow-sm py-3' 
        : 'py-5'
    }`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <TransitionLink href="/" transitionType="fade">
            <div className="flex items-center cursor-pointer">
              <svg width="35" height="35" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M8.5 32.5L27.5 8M20 8L32 27.5M8.5 14.5L14 8" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-xl">Luke Mikic</span>
            </div>
          </TransitionLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Section links - uses smooth scroll on home page */}
            {navSections.map((section, index) => (
              <button 
                key={index}
                onClick={(e) => scrollToSection(section.id, e)}
                className="font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer"
              >
                {section.label}
              </button>
            ))}
            
            {/* Newsletter - This is kept as an external link as per requirements */}
            <a href="https://youtube.com/@lukemikic21?si=9MqveJLGr8HNhApV" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-cyan-400 hover:bg-cyan-500 text-white">
                Join 15k+ Subscribers
              </Button>
            </a>
            
            {/* Dark Mode Toggle */}
            {/* <DarkModeToggle /> */}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full pt-12 px-6 bg-white dark:bg-gray-900">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center">
                      <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M8.5 32.5L27.5 8M20 8L32 27.5M8.5 14.5L14 8" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-lg font-bold">Luke Mikic</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  {/* Section links with smooth scrolling */}
                  {navSections.map((section, index) => (
                    <button 
                      key={index}
                      onClick={(e) => {
                        // First close the mobile menu using SheetClose
                        const closeButton = document.querySelector('[aria-label="Close"]');
                        if (closeButton instanceof HTMLElement) {
                          closeButton.click();
                        }
                        // Then scroll to section after a short delay
                        setTimeout(() => scrollToSection(section.id, e), 300);
                      }}
                      className="w-full text-left font-medium py-2 text-lg text-gray-800 dark:text-gray-200 hover:text-cyan-500 cursor-pointer"
                    >
                      {section.label}
                    </button>
                  ))}
                  
                  {/* Newsletter external link */}
                  <a href="https://youtube.com/@lukemikic21?si=9MqveJLGr8HNhApV" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-full bg-cyan-400 hover:bg-cyan-500 text-white">
                      Join 15k+ Subscribers
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
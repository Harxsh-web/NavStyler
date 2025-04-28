import { useState, useEffect } from 'react';
import { Link } from 'wouter';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { HiOutlineDocument, HiOutlineBookOpen, HiOutlineVideoCamera } from 'react-icons/hi';
import { BiPodcast } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLightningCharge, BsYoutube, BsBook, BsLaptop, BsTools } from 'react-icons/bs';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  
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
            {/* Book Link */}
            <TransitionLink href="/my-book" transitionType="slide-left">
              <div className="font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer">
                My Book
              </div>
            </TransitionLink>
            
            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer">
                  <span>Free Resources</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[350px] p-4">
                <DropdownMenuLabel className="text-center text-lg font-medium mb-3">
                  Free Resources
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">Browse by type:</h3>
                    <div className="space-y-3">
                      {resourcesByType.map((resource, index) => (
                        <TransitionLink key={`type-${index}`} href={resource.href} transitionType="slide-left">
                          <div className="flex items-center text-gray-700 hover:text-black cursor-pointer">
                            <span className={`${resource.bgColor} p-1.5 rounded mr-2 ${resource.textColor}`}>
                              {resource.icon}
                            </span>
                            <span>{resource.label}</span>
                          </div>
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">Browse by topic:</h3>
                    <div className="space-y-3">
                      {resourcesByTopic.map((resource, index) => (
                        <TransitionLink key={`topic-${index}`} href={resource.href} transitionType="slide-left">
                          <div className="flex items-center text-gray-700 hover:text-black cursor-pointer">
                            <span className={`${resource.bgColor} p-1.5 rounded mr-2 ${resource.textColor}`}>
                              {resource.icon}
                            </span>
                            <span>{resource.label}</span>
                          </div>
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 border-t border-gray-100 pt-3 text-center">
                  <TransitionLink href="/all-categories" transitionType="slide-up">
                    <div className="flex items-center justify-center text-gray-700 hover:text-black cursor-pointer">
                      <span className="font-medium">all categories</span>
                      <span className="ml-1">→</span>
                    </div>
                  </TransitionLink>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* YouTube Academy */}
            <TransitionLink href="/youtube-academy" transitionType="slide-left">
              <div className="font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer">
                YouTube Academy
              </div>
            </TransitionLink>
            
            {/* LifeOS */}
            <TransitionLink href="/lifeos" transitionType="slide-up">
              <div className="font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer">
                LifeOS System
              </div>
            </TransitionLink>
            
            {/* Newsletter */}
            <TransitionLink href="/newsletter" transitionType="scale">
              <Button className="rounded-full bg-cyan-400 hover:bg-cyan-500 text-white">
                Join 270k+ Subscribers
              </Button>
            </TransitionLink>
            
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
                  <TransitionLink href="/my-book" transitionType="slide-left">
                    <div className="text-gray-800 dark:text-gray-200 font-medium py-2 text-lg cursor-pointer">
                      My Book
                    </div>
                  </TransitionLink>
                  
                  <div>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start p-2 font-medium text-lg text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" 
                      onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    >
                      <span>Free Resources</span>
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    {mobileResourcesOpen && (
                      <div className="mt-2 pl-2">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">Browse by type:</h3>
                        <div className="space-y-3">
                          {resourcesByType.map((resource, index) => (
                            <TransitionLink key={`mobile-type-${index}`} href={resource.href} transitionType="slide-left">
                              <div className="flex items-center text-gray-700 hover:text-black cursor-pointer py-1">
                                <span className={`${resource.bgColor} p-1.5 rounded mr-2 ${resource.textColor}`}>
                                  {resource.icon}
                                </span>
                                <span>{resource.label}</span>
                              </div>
                            </TransitionLink>
                          ))}
                        </div>
                        
                        <h3 className="text-sm font-semibold text-gray-500 mb-3 mt-6">Browse by topic:</h3>
                        <div className="space-y-3">
                          {resourcesByTopic.map((resource, index) => (
                            <TransitionLink key={`mobile-topic-${index}`} href={resource.href} transitionType="slide-left">
                              <div className="flex items-center text-gray-700 hover:text-black cursor-pointer py-1">
                                <span className={`${resource.bgColor} p-1.5 rounded mr-2 ${resource.textColor}`}>
                                  {resource.icon}
                                </span>
                                <span>{resource.label}</span>
                              </div>
                            </TransitionLink>
                          ))}
                        </div>
                        
                        <TransitionLink href="/all-categories" transitionType="slide-up">
                          <div className="flex items-center text-gray-700 hover:text-black mt-3 cursor-pointer">
                            <span className="font-medium">all categories</span>
                            <span className="ml-1">→</span>
                          </div>
                        </TransitionLink>
                      </div>
                    )}
                  </div>
                  
                  <TransitionLink href="/youtube-academy" transitionType="slide-left">
                    <div className="text-gray-800 dark:text-gray-200 font-medium py-2 text-lg cursor-pointer">
                      YouTube Academy
                    </div>
                  </TransitionLink>
                  
                  <TransitionLink href="/lifeos" transitionType="slide-up">
                    <div className="text-gray-800 dark:text-gray-200 font-medium py-2 text-lg cursor-pointer">
                      LifeOS Productivity System
                    </div>
                  </TransitionLink>
                  
                  <TransitionLink href="/newsletter" transitionType="scale">
                    <Button className="w-full rounded-full bg-cyan-400 hover:bg-cyan-500 text-white">
                      Join 270k+ Subscribers
                    </Button>
                  </TransitionLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
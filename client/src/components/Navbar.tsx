import { useState, useEffect } from 'react';
import { Link } from 'wouter';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M8.5 32.5L27.5 8M20 8L32 27.5M8.5 14.5L14 8" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xl font-bold">Ali Abdaal</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-black font-medium cursor-pointer">Home</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-black font-medium cursor-pointer">About</span>
            </Link>
            <Link href="/podcast">
              <span className="text-gray-700 hover:text-black font-medium cursor-pointer">Podcast</span>
            </Link>
            <Link href="/newsletter">
              <span className="text-gray-700 hover:text-black font-medium cursor-pointer">Newsletter</span>
            </Link>
            <Link href="/courses">
              <span className="text-gray-700 hover:text-black font-medium cursor-pointer">Courses</span>
            </Link>
            <Link href="/auth">
              <span className="text-gray-700 hover:text-black font-medium cursor-pointer">Login</span>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/">
                <span className="text-gray-700 hover:text-black font-medium py-2 block cursor-pointer" 
                      onClick={() => setMobileMenuOpen(false)}>
                  Home
                </span>
              </Link>
              <Link href="/about">
                <span className="text-gray-700 hover:text-black font-medium py-2 block cursor-pointer" 
                      onClick={() => setMobileMenuOpen(false)}>
                  About
                </span>
              </Link>
              <Link href="/podcast">
                <span className="text-gray-700 hover:text-black font-medium py-2 block cursor-pointer" 
                      onClick={() => setMobileMenuOpen(false)}>
                  Podcast
                </span>
              </Link>
              <Link href="/newsletter">
                <span className="text-gray-700 hover:text-black font-medium py-2 block cursor-pointer" 
                      onClick={() => setMobileMenuOpen(false)}>
                  Newsletter
                </span>
              </Link>
              <Link href="/courses">
                <span className="text-gray-700 hover:text-black font-medium py-2 block cursor-pointer" 
                      onClick={() => setMobileMenuOpen(false)}>
                  Courses
                </span>
              </Link>
              <Link href="/auth">
                <span className="text-gray-700 hover:text-black font-medium py-2 block cursor-pointer" 
                      onClick={() => setMobileMenuOpen(false)}>
                  Login
                </span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
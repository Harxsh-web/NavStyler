import { Link } from "wouter";

export default function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center">
        <svg 
          className="h-8 w-8 text-[#30B8C4]" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M3 17L9 11L13 15L21 7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M17 7H21V11" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-2 text-xl font-semibold text-[#1A1A1A]">Ali Abdaal</span>
      </a>
    </Link>
  );
}

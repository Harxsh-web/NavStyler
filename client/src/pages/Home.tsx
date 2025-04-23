import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#FAF9F6] pt-14 pb-16 md:pt-20 md:pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-6xl font-bold text-[#1A1A1A] mb-8 leading-tight">
                Feel-Good<br />Productivity
              </h1>
              <div className="mb-6 text-lg">
                <p className="text-gray-700 mb-1">
                  The <em>Sunday Times</em> and <em>New York Times</em> Bestseller
                </p>
                <p className="text-gray-700 mb-1">
                  250,000+ Copies Sold
                </p>
                <p className="text-gray-700">
                  Now available in paperback across Europe, Asia and Australia
                </p>
              </div>
            </div>

            <div className="ml-auto">
              <div className="max-w-[350px] rounded-xl overflow-hidden shadow-lg">
                <div className="bg-yellow-400 p-5 text-center rounded-t-xl">
                  <p className="text-xs font-medium mb-1">The world's most-followed productivity expert</p>
                  <h3 className="text-2xl md:text-3xl font-bold">Luke Mikic</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#30B8C4] text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                    Feel
                  </div>
                  <div className="bg-red-500 text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                    Good
                  </div>
                </div>
                <div className="bg-pink-400 text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                  Productivity
                </div>
                <div className="bg-green-500 text-white p-4 rounded-b-xl text-center">
                  <p className="font-medium text-sm md:text-base">How to Do More of<br/>What Matters to You</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              Feel-Good<br />Productivity
            </h1>
            <div className="mb-6">
              <p className="text-gray-700 mb-1">
                The <em>Sunday Times</em> and <em>New York Times</em> Bestseller
              </p>
              <p className="text-gray-700 mb-1">
                250,000+ Copies Sold
              </p>
              <p className="text-gray-700 mb-6">
                Now available in paperback across Europe, Asia and Australia
              </p>
            </div>

            <div className="my-8 mx-auto max-w-[280px]">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="bg-yellow-400 p-4 text-center rounded-t-xl">
                  <p className="text-xs font-medium mb-1">The world's most-followed productivity expert</p>
                  <h3 className="text-2xl font-bold">Luke Mikic</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#30B8C4] text-white p-4 flex items-center justify-center text-xl font-bold">
                    Feel
                  </div>
                  <div className="bg-red-500 text-white p-4 flex items-center justify-center text-xl font-bold">
                    Good
                  </div>
                </div>
                <div className="bg-pink-400 text-white p-4 flex items-center justify-center text-xl font-bold">
                  Productivity
                </div>
                <div className="bg-green-500 text-white p-3 rounded-b-xl text-center">
                  <p className="font-medium text-sm">How to Do More of<br/>What Matters to You</p>
                </div>
              </div>
            </div>
          </div>

          {/* Button - Visible on both layouts */}
          <div className="mt-6 md:mt-10">
            <Button className="bg-[#FF9470] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-full text-lg">
              Get the Book
            </Button>
          </div>
        </div>
      </section>

      {/* As Featured In Section */}
      <section className="bg-[#FAF9F6] py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="text-center mb-6">
              <p className="text-gray-600 font-medium">As featured in:</p>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12 mb-16">
              <div className="w-24">
                <img src="https://placehold.co/120x50/png?text=GMA" alt="Good Morning America" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-28">
                <img src="https://placehold.co/140x50/png?text=Financial+Times" alt="Financial Times" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-24">
                <img src="https://placehold.co/120x50/png?text=Guardian" alt="The Guardian" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-24">
                <img src="https://placehold.co/120x50/png?text=Google" alt="Google" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-20">
                <img src="https://placehold.co/100x50/png?text=Inc." alt="Inc." className="h-auto w-full opacity-80" />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="text-center mb-4">
              <p className="text-gray-600 font-medium">As featured in:</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="w-20">
                <img src="https://placehold.co/100x40/png?text=GMA" alt="Good Morning America" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-24">
                <img src="https://placehold.co/120x40/png?text=Financial+Times" alt="Financial Times" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-20">
                <img src="https://placehold.co/100x40/png?text=Guardian" alt="The Guardian" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-20">
                <img src="https://placehold.co/100x40/png?text=Google" alt="Google" className="h-auto w-full opacity-80" />
              </div>
              <div className="w-16">
                <img src="https://placehold.co/80x40/png?text=Inc." alt="Inc." className="h-auto w-full opacity-80" />
              </div>
            </div>
          </div>

          {/* Get Your Copy Today Card - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-bold mb-8">Get Your Copy Today...</h2>
            <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
              <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/120x40/png?text=Amazon" alt="Amazon" className="h-8" />
              </a>
              <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/120x40/png?text=Kindle" alt="Kindle" className="h-8" />
              </a>
              <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/120x40/png?text=Audible" alt="Audible" className="h-8" />
              </a>
              <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/120x40/png?text=Bookshop.org" alt="Bookshop.org" className="h-8" />
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-right pr-2">
                <span className="text-gray-600 font-medium">US:</span>
              </div>
              <div className="col-span-2 flex flex-wrap gap-3">
                <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/120x40/png?text=Barnes+%26+Noble" alt="Barnes & Noble" className="h-8" />
                </a>
                <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/120x40/png?text=Target" alt="Target" className="h-8" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-right pr-2">
                <span className="text-gray-600 font-medium">UK:</span>
              </div>
              <div className="col-span-2 flex flex-wrap gap-3">
                <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/120x40/png?text=Waterstones" alt="Waterstones" className="h-8" />
                </a>
                <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/120x40/png?text=WH+Smith" alt="WH Smith" className="h-8" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-right pr-2">
                <span className="text-gray-600 font-medium">CA:</span>
              </div>
              <div className="col-span-2 flex flex-wrap gap-3">
                <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/120x40/png?text=Indigo" alt="Indigo" className="h-8" />
                </a>
                <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 items-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/120x40/png?text=Shop+Local" alt="Shop Local" className="h-8" />
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <a href="#" className="inline-flex border border-gray-300 rounded-full px-6 py-3 text-gray-700 font-medium hover:shadow-md transition-shadow">
                International Options
              </a>
            </div>
          </div>

          {/* Get Your Copy Today Card - Mobile */}
          <div className="md:hidden bg-white rounded-xl shadow-lg p-4 mx-auto">
            <h2 className="text-center text-2xl font-bold mb-4">Get Your Copy Today...</h2>
            
            <div className="flex flex-col items-center gap-3">
              <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/100x30/png?text=Amazon" alt="Amazon" className="h-6" />
              </a>
              <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/100x30/png?text=Kindle" alt="Kindle" className="h-6" />
              </a>
              <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/100x30/png?text=Audible" alt="Audible" className="h-6" />
              </a>
              <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                <img src="https://placehold.co/100x30/png?text=Bookshop.org" alt="Bookshop.org" className="h-6" />
              </a>
            </div>
            
            <div className="mt-4 mb-2">
              <div className="text-gray-600 font-medium mb-2">US:</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/100x30/png?text=Barnes+%26+Noble" alt="Barnes & Noble" className="h-6" />
                </a>
                <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/100x30/png?text=Target" alt="Target" className="h-6" />
                </a>
              </div>
            </div>
            
            <div className="mt-4 mb-2">
              <div className="text-gray-600 font-medium mb-2">UK:</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/100x30/png?text=Waterstones" alt="Waterstones" className="h-6" />
                </a>
                <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/100x30/png?text=WH+Smith" alt="WH Smith" className="h-6" />
                </a>
              </div>
            </div>
            
            <div className="mt-4 mb-2">
              <div className="text-gray-600 font-medium mb-2">CA:</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/100x30/png?text=Indigo" alt="Indigo" className="h-6" />
                </a>
                <a href="#" className="inline-flex w-full border border-gray-300 rounded-full px-3 py-2 items-center justify-center hover:shadow-md transition-shadow">
                  <img src="https://placehold.co/100x30/png?text=Shop+Local" alt="Shop Local" className="h-6" />
                </a>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <a href="#" className="inline-flex border border-gray-300 rounded-full px-4 py-2 text-gray-700 font-medium hover:shadow-md transition-shadow">
                International Options
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Secret to Productivity Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">
              The secret to <span className="underline decoration-[#30B8C4] decoration-4">Productivity</span> isn't<br />
              Discipline. It's <span className="bg-yellow-200 px-2">joy</span>
            </h2>
            
            <div className="space-y-6 text-lg">
              <p>
                You won't <strong>just</strong> accomplish more.<br />
                You'll feel <strong>happier</strong> and more <strong>fulfilled</strong> along the way.
              </p>
              
              <p>
                We think that productivity is all about hard work. That the road to success is lined with endless frustration and toil. But what if there's another way?
              </p>
              
              <p>
                In <em>Feel-Good Productivity</em>, Luke Mikic uncovers an easier, science-backed path to success. He demonstrates that the secret to productivity isn't grind, it's <em>feeling good</em>. And he reveals how to make your projects feel so enjoyable that productivity takes care of itself.
              </p>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
              The secret to <span className="underline decoration-[#30B8C4] decoration-2">Productivity</span> isn't<br />
              Discipline. It's <span className="bg-yellow-200 px-1">joy</span>
            </h2>
            
            <div className="space-y-4 text-base">
              <p>
                You won't <strong>just</strong> accomplish more.<br />
                You'll feel <strong>happier</strong> and more <strong>fulfilled</strong> along the way.
              </p>
              
              <p>
                We think that productivity is all about hard work. That the road to success is lined with endless frustration and toil. But what if there's another way?
              </p>
              
              <p>
                In <em>Feel-Good Productivity</em>, Luke Mikic uncovers an easier, science-backed path to success. He demonstrates that the secret to productivity isn't grind, it's <em>feeling good</em>. And he reveals how to make your projects feel so enjoyable that productivity takes care of itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Things This Book Will Teach You Section */}
      <section className="bg-[#FAF9F6] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A1A] mb-12">
            10 Things This Book Will Teach You
          </h2>
          
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-3xl">
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="10 Things This Book Will Teach You" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">Learn How To...</h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">1.</span>
                  <p className="text-lg">Build your own productivity system that doesn't feel like a grind</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">2.</span>
                  <p className="text-lg">Make any work (however dull) feel more energizing and enjoyable</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">3.</span>
                  <p className="text-lg">Stay focused in a world of constant distractions</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">4.</span>
                  <p className="text-lg">Beat procrastination forever without just relying on motivation and discipline</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">5.</span>
                  <p className="text-lg">Reduce the stress of your work while staying productive</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">6.</span>
                  <p className="text-lg">Get clarity on what you really want from your work and your life</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">7.</span>
                  <p className="text-lg">Stay consistent with what really matters to you over the long term</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">8.</span>
                  <p className="text-lg">Set meaningful goals that help you feel good while achieving more</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">9.</span>
                  <p className="text-lg">Recharge your energy through science-backed strategies</p>
                </div>
                
                <div className="flex items-baseline">
                  <span className="font-bold text-lg mr-3">10.</span>
                  <p className="text-lg">Find alignment, fulfilment, and enjoyment in all that you do</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex justify-center mb-8">
              <div className="w-full">
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="10 Things This Book Will Teach You" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 text-center">Learn How To...</h3>
            
            <div className="space-y-5">
              <div className="flex">
                <span className="font-bold text-base mr-2">1.</span>
                <p className="text-base">Build your own productivity system that doesn't feel like a grind</p>
              </div>
              
              <div className="flex">
                <span className="font-bold text-base mr-2">3.</span>
                <p className="text-base">Stay focused in a world of constant distractions</p>
              </div>
              
              <div className="flex">
                <span className="font-bold text-base mr-2">5.</span>
                <p className="text-base">Reduce the stress of your work while staying productive</p>
              </div>
              
              <div className="flex">
                <span className="font-bold text-base mr-2">7.</span>
                <p className="text-base">Stay consistent with what really matters to you over the long term</p>
              </div>
              
              <div className="flex">
                <span className="font-bold text-base mr-2">9.</span>
                <p className="text-base">Recharge your energy through science-backed strategies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3">
              <svg className="w-8 h-8 text-purple-800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4 0 .5.1.97.25 1.4l-1.8 1.8c-.46-.8-.7-1.72-.7-2.7 0-3.31 2.69-6 6-6 2.75 0 5.04 1.87 5.76 4.4l-1.75 1.75C14.95 8.4 13.58 6 11.75 6zm4.83 7.72L14.58 16c-.3.3-.75.39-1.14.21-.4-.18-.64-.58-.64-1.01v-4.18l2.06-2.06c.79.38 1.61.82 2.35 1.32-.47 1.17-1.23 2.33-2.38 3.44zM8.42 16c-.3.3-.75.39-1.14.21-.4-.18-.64-.58-.64-1.01v-4.18l4.01-4.01c.31-.31.85-.09.85.36v4.18l-3.08 4.45z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              What people are saying...
            </h2>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F6] p-8 rounded-lg text-center flex flex-col items-center">
              <div className="w-24 h-24 mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://placehold.co/200x200/png?text=Julie" 
                  alt="Dr Julie Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-6 text-[#1A1A1A]">
                Ali is the absolute master on how to be productive without sacrificing your own happiness. This is the book we've all been waiting for.
              </p>
              <div className="mt-auto">
                <p className="font-bold text-[#1A1A1A]">Dr Julie Smith</p>
                <p className="text-gray-600 text-sm">Clinical Psychologist</p>
              </div>
            </div>
            
            <div className="bg-[#FAF9F6] p-8 rounded-lg text-center flex flex-col items-center">
              <div className="w-24 h-24 mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://placehold.co/200x200/png?text=Mark" 
                  alt="Mark Manson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-6 text-[#1A1A1A]">
                A much-needed antidote to hustle culture, this book is a reality check for any ambitious person who wants to build sustainable success. It offers the most practical approach to productivity that no one says yet all of us need to hear.
              </p>
              <div className="mt-auto">
                <p className="font-bold text-[#1A1A1A]">Mark Manson</p>
                <p className="text-gray-600 text-sm">Bestselling author of The Subtle Art of Not Giving a F*ck</p>
              </div>
            </div>
            
            <div className="bg-[#FAF9F6] p-8 rounded-lg text-center flex flex-col items-center">
              <div className="w-24 h-24 mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://placehold.co/200x200/png?text=Doctor" 
                  alt="Doctor Testimonial" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-6 text-[#1A1A1A]">
                As a doctor, entrepreneur, and educator, Ali has a unique and practical perspective on productivity. His book is science-backed, filled with real-life stories, and refreshingly joyful. A nuanced guide to productivity that will unlock more honest conversations about our relationship to work.
              </p>
              <div className="mt-auto">
                <p className="font-bold text-[#1A1A1A]">Dr. Sarah Johnson</p>
                <p className="text-gray-600 text-sm">Medical Director & Health Educator</p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-lg text-center flex flex-col items-center">
              <div className="w-24 h-24 mb-6 overflow-hidden rounded-full">
                <img 
                  src="https://placehold.co/200x200/png?text=Steven" 
                  alt="Steven Bartlett" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-6 text-[#1A1A1A]">
                Ali is the master of productivity. Nobody has a talent for distilling complicated ideas into fun, accessible and actionable insights quite like him.
              </p>
              <div className="mt-auto">
                <p className="font-bold text-[#1A1A1A]">Steven Bartlett</p>
                <p className="text-gray-600 text-sm">BBC's Dragon's Den and host of The Diary of a CEO</p>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            <div className="bg-[#FAF9F6] p-6 rounded-lg text-center flex flex-col items-center">
              <div className="w-20 h-20 mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://placehold.co/200x200/png?text=Julie" 
                  alt="Dr Julie Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-4 text-[#1A1A1A] text-sm">
                Ali is the absolute master on how to be productive without sacrificing your own happiness. This is the book we've all been waiting for.
              </p>
              <div>
                <p className="font-bold text-[#1A1A1A]">Dr Julie Smith</p>
                <p className="text-gray-600 text-xs">Clinical Psychologist</p>
              </div>
            </div>
            
            <div className="bg-[#FAF9F6] p-6 rounded-lg text-center flex flex-col items-center">
              <div className="w-20 h-20 mb-4 overflow-hidden rounded-full">
                <img 
                  src="https://placehold.co/200x200/png?text=Steven" 
                  alt="Steven Bartlett" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mb-4 text-[#1A1A1A] text-sm">
                Ali is the master of productivity. Nobody has a talent for distilling complicated ideas into fun, accessible and actionable insights quite like him.
              </p>
              <div>
                <p className="font-bold text-[#1A1A1A]">Steven Bartlett</p>
                <p className="text-gray-600 text-xs">BBC's Dragon's Den and host of The Diary of a CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Book Section */}
      <section className="bg-[#FAF9F6] py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block mb-3">
              <svg className="w-8 h-8 text-[#30B8C4]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4V20M18 4V20M6 12H18M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
              About
            </h2>
            <div className="inline-block relative">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                Feel-Good Productivity
              </h2>
              <div className="absolute bottom-1 left-0 w-full h-1 bg-[#30B8C4]"></div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 items-start">
            <div className="flex justify-center">
              <div className="max-w-[300px] rounded-xl overflow-hidden shadow-lg">
                <div className="bg-yellow-400 p-5 text-center rounded-t-xl">
                  <p className="text-xs font-medium mb-1">The world's most-followed productivity expert</p>
                  <h3 className="text-2xl md:text-3xl font-bold">Luke Mikic</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#30B8C4] text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                    Feel
                  </div>
                  <div className="bg-red-500 text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                    Good
                  </div>
                </div>
                <div className="bg-pink-400 text-white p-5 flex items-center justify-center text-2xl md:text-3xl font-bold">
                  Productivity
                </div>
                <div className="bg-green-500 text-white p-4 rounded-b-xl text-center">
                  <p className="font-medium text-sm md:text-base">How to Do More of<br/>What Matters to You</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Introduction</h3>
                <h4 className="text-xl font-semibold text-[#1A1A1A] mb-3">The Art & Science of Feel-Good Productivity</h4>
                <p className="text-gray-700">
                  Ali shares his journey from stressed-out doctor to successful entrepreneur, and how he discovered the science of Feel-Good Productivity. You'll understand the psychological and neuroscientific evidence for why positive emotions fuel success, and explore how <em>feeling good</em> in your work can boost your energy, reduce your stress, and enrich your life.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Part 1</h3>
                <h4 className="text-xl font-semibold text-[#1A1A1A] mb-3">Energise</h4>
                <p className="text-gray-700">
                  Ali shares the three fundamental energizers that make us feel good and lead to true productivity. You'll discover the strategies that Nobel laureates and trailblazing founders of multimillion-dollar enterprises use to maintain motivation and outperform expectations, all by finding the fun in their projects.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Part 2</h3>
                <h4 className="text-xl font-semibold text-[#1A1A1A] mb-3">Unblock</h4>
                <p className="text-gray-700">
                  This section outlines a groundbreaking method for beating procrastination that <em>doesn't</em> rely on temporary motivation or painful discipline. You'll learn about the three biggest blockers that run down our feel-good emotions and so derail our productivity – as well as the simple strategies you can use to stay focused and consistent.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Part 3</h3>
                <h4 className="text-xl font-semibold text-[#1A1A1A] mb-3">Sustain</h4>
                <p className="text-gray-700">
                  The final section of the book focuses on sustainable productivity for the long term. You'll learn powerful techniques for maintaining energy, avoiding burnout, and creating systems that help you consistently achieve your goals while enjoying the process.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="flex justify-center mb-8">
              <div className="max-w-[250px] rounded-xl overflow-hidden shadow-lg">
                <div className="bg-yellow-400 p-4 text-center rounded-t-xl">
                  <p className="text-xs font-medium mb-1">The world's most-followed productivity expert</p>
                  <h3 className="text-xl font-bold">Luke Mikic</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#30B8C4] text-white p-4 flex items-center justify-center text-xl font-bold">
                    Feel
                  </div>
                  <div className="bg-red-500 text-white p-4 flex items-center justify-center text-xl font-bold">
                    Good
                  </div>
                </div>
                <div className="bg-pink-400 text-white p-4 flex items-center justify-center text-xl font-bold">
                  Productivity
                </div>
                <div className="bg-green-500 text-white p-3 rounded-b-xl text-center">
                  <p className="font-medium text-sm">How to Do More of<br/>What Matters to You</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Introduction</h3>
                <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">The Art & Science of Feel-Good Productivity</h4>
                <p className="text-gray-700 text-sm">
                  Ali shares his journey from stressed-out doctor to successful entrepreneur, and how he discovered the science of Feel-Good Productivity. You'll understand the psychological and neuroscientific evidence for why positive emotions fuel success, and explore how <em>feeling good</em> in your work can boost your energy, reduce your stress, and enrich your life.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Part 1</h3>
                <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">Energise</h4>
                <p className="text-gray-700 text-sm">
                  Ali shares the three fundamental energizers that make us feel good and lead to true productivity. You'll discover the strategies that Nobel laureates and trailblazing founders of multimillion-dollar enterprises use to maintain motivation and outperform expectations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Part 2</h3>
                <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">Unblock</h4>
                <p className="text-gray-700 text-sm">
                  This section outlines a groundbreaking method for beating procrastination that <em>doesn't</em> rely on temporary motivation or painful discipline. You'll learn about the three biggest blockers that run down our feel-good emotions and derail our productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About The Author Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3">
              <svg className="w-8 h-8 text-amber-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.85 4.49999C14.85 4.27908 14.721 4.10999 14.5 4.10999H9.5C9.27908 4.10999 9.15 4.27908 9.15 4.49999V6.59999C9.15 6.8209 9.27908 6.99 9.5 6.99H14.5C14.721 6.99 14.85 6.8209 14.85 6.59999V4.49999Z" stroke="currentColor" strokeWidth="0.3"/>
                <path d="M18.4286 4.49999C18.4286 2.56699 16.8616 0.999989 14.9286 0.999989H9.07143C7.13843 0.999989 5.57143 2.56699 5.57143 4.49999V18.8571L8.33929 16.0893L12 19.75L15.6607 16.0893L18.4286 18.8571V4.49999Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              About The Author
            </h2>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://placehold.co/800x600/png?text=Ali+Abdaal" 
                  alt="Luke Mikic" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#1A1A1A]">Luke Mikic</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Luke Mikicis a doctor, entrepreneur, amateur magician, and the world's most-followed productivity expert.
                </p>
                
                <p>
                  Ali became intrigued by the science of productivity while juggling the demands of medical training at Cambridge University with building his business. While working as a doctor in the UK's National Health Service, Ali started to document his journey towards living a healthier, happier, more productive life online. In the years since, Ali's evidence-based videos, podcasts and articles about the human mind have reached hundreds of millions of people all around the world.
                </p>
                
                <p>
                  In 2021, Ali took a break from his medical career to focus on his thriving YouTube channel and other business ventures. Today, he continues to share his insights on productivity, learning, and happiness with his global audience through various platforms.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://placehold.co/800x600/png?text=Ali+Abdaal" 
                alt="Luke Mikic" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="bg-[#FAF9F6] p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4 text-center">Luke Mikic</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p>
                  Luke Mikic is a doctor, entrepreneur, amateur magician, and the world's most-followed productivity expert.
                </p>
                
                <p>
                  Ali became intrigued by the science of productivity while juggling the demands of medical training at Cambridge University with building his business. While working as a doctor in the UK's National Health Service, Ali started to document his journey towards living a healthier, happier, more productive life online. In the years since, Ali's evidence-based videos, podcasts and articles about the human mind have reached hundreds of millions of people all around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">Join the Movement</h2>
              <p className="text-gray-600">
                Join thousands of readers who are transforming their approach to productivity. 
                Learn how feeling good and getting things done can go hand in hand, and discover 
                a more sustainable, enjoyable way to achieve your goals.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">Further Resources</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Free productivity assessment tools</li>
                <li>Companion workbook and exercises</li>
                <li>Online community of like-minded individuals</li>
                <li>Regular webinars and Q&A sessions with Ali</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

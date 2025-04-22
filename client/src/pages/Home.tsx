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
                  <h3 className="text-2xl md:text-3xl font-bold">Ali Abdaal</h3>
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
                  <h3 className="text-2xl font-bold">Ali Abdaal</h3>
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
                In <em>Feel-Good Productivity</em>, Dr Ali Abdaal uncovers an easier, science-backed path to success. He demonstrates that the secret to productivity isn't grind, it's <em>feeling good</em>. And he reveals how to make your projects feel so enjoyable that productivity takes care of itself.
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
                In <em>Feel-Good Productivity</em>, Dr Ali Abdaal uncovers an easier, science-backed path to success. He demonstrates that the secret to productivity isn't grind, it's <em>feeling good</em>. And he reveals how to make your projects feel so enjoyable that productivity takes care of itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">About the Book</h2>
              <p className="text-gray-600">
                Learn about the revolutionary approach to productivity that focuses on
                feeling good while getting things done. Break free from the traditional
                productivity advice that leaves you feeling burnt out.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">What You'll Learn</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>The Feel-Good Productivity Method</li>
                <li>How to overcome procrastination</li>
                <li>Building sustainable productivity habits</li>
                <li>Balancing work, rest, and play</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

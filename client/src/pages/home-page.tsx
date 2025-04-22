import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-6">Feel-Good Productivity</h1>
          <p className="text-xl text-gray-700 mb-8">
            The science-based guide to achieving more while feeling good in the process.
          </p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">About the Book</h2>
            <p className="text-gray-700">
              Feel-Good Productivity is a revolutionary approach to achieving your goals without sacrificing your well-being.
              The book combines science-backed strategies with practical advice to help you become more productive while maintaining your happiness.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
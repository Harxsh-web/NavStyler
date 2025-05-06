import { QuoteSection as QuoteSectionType } from "@shared/schema";

interface QuoteSectionProps {
  data: Partial<QuoteSectionType>;
}

export function QuoteSection({ data }: QuoteSectionProps) {
  if (!data || !data.content) {
    return null;
  }

  return (
    <div 
      className="w-full py-16"
      style={{ backgroundColor: data.backgroundColor || "#fffcf1" }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <blockquote className="text-2xl md:text-3xl font-serif italic">
          "{data.content}"
          <footer className="mt-4 text-lg font-medium">
            — {data.heading || "Luke Mikic"}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

export default QuoteSection;
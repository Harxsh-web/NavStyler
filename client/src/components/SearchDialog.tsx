import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

// Search result categories and items
const searchResults = {
  pages: [
    { title: 'Home', href: '/' },
    { title: 'Book Page', href: '/my-book' },
    { title: 'YouTube Academy', href: '/youtube-academy' },
    { title: 'LifeOS Productivity System', href: '/lifeos' },
    { title: 'Newsletter', href: '/newsletter' },
  ],
  articles: [
    { title: 'Why Productivity Is About Energy, Not Time', href: '/articles/productivity-energy-not-time' },
    { title: '10 Ways to Improve Your Focus', href: '/articles/improve-focus' },
    { title: 'How to Build Better Habits', href: '/articles/better-habits' },
    { title: 'The Power of Saying No', href: '/articles/power-of-saying-no' },
    { title: 'Digital Minimalism: A Guide', href: '/articles/digital-minimalism' },
  ],
  bookNotes: [
    { title: 'Atomic Habits - James Clear', href: '/book-notes/atomic-habits' },
    { title: 'Deep Work - Cal Newport', href: '/book-notes/deep-work' },
    { title: 'The 4-Hour Work Week - Tim Ferriss', href: '/book-notes/four-hour-work-week' },
    { title: 'Digital Minimalism - Cal Newport', href: '/book-notes/digital-minimalism' },
    { title: 'Essentialism - Greg McKeown', href: '/book-notes/essentialism' },
  ],
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [, setLocation] = useLocation();

  // Filter search results based on search term
  const filteredResults = {
    pages: searchResults.pages.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    articles: searchResults.articles.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    bookNotes: searchResults.bookNotes.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  const hasResults = 
    filteredResults.pages.length > 0 || 
    filteredResults.articles.length > 0 || 
    filteredResults.bookNotes.length > 0;

  const handleSelect = (href: string) => {
    setOpen(false);
    setLocation(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-10 h-10 rounded-full p-0 border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
        </DialogHeader>
        <Command className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-3">
            <Search className="h-4 w-4 mr-2 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search for anything..." 
              className="flex-1 outline-none border-0 focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <CommandList>
            {!hasResults && searchTerm && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {filteredResults.pages.length > 0 && (
              <CommandGroup heading="Pages">
                {filteredResults.pages.map((item, index) => (
                  <CommandItem 
                    key={`page-${index}`} 
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {filteredResults.articles.length > 0 && (
              <CommandGroup heading="Articles">
                {filteredResults.articles.map((item, index) => (
                  <CommandItem 
                    key={`article-${index}`} 
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {filteredResults.bookNotes.length > 0 && (
              <CommandGroup heading="Book Notes">
                {filteredResults.bookNotes.map((item, index) => (
                  <CommandItem 
                    key={`book-note-${index}`} 
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
          Press <kbd className="rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1">↵</kbd> to select, 
          <kbd className="ml-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1">↑</kbd> and 
          <kbd className="rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1">↓</kbd> to navigate, 
          <kbd className="ml-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1">ESC</kbd> to close
        </div>
      </DialogContent>
    </Dialog>
  );
}
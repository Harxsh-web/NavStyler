export interface ResourceItem {
  icon: string;
  label: string;
  href: string;
  color: string;
}

export interface ResourceSection {
  title: string;
  items: ResourceItem[];
}

export const resourcesByType: ResourceItem[] = [
  {
    icon: "article",
    label: "Articles",
    href: "#",
    color: "bg-red-100 text-red-500",
  },
  {
    icon: "book",
    label: "Book Notes",
    href: "#",
    color: "bg-green-100 text-green-500",
  },
  {
    icon: "video",
    label: "Videos",
    href: "#",
    color: "bg-purple-100 text-purple-500",
  },
  {
    icon: "podcast",
    label: "Podcast",
    href: "#",
    color: "bg-blue-100 text-blue-500",
  },
  {
    icon: "newsletter",
    label: "Newsletter",
    href: "#",
    color: "bg-yellow-100 text-yellow-500",
  },
];

export const resourcesByTopic: ResourceItem[] = [
  {
    icon: "productivity",
    label: "Productivity",
    href: "#",
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    icon: "youtube",
    label: "YouTube",
    href: "#",
    color: "bg-red-100 text-red-500",
  },
  {
    icon: "studying",
    label: "Studying",
    href: "#",
    color: "bg-gray-100 text-gray-500",
  },
  {
    icon: "business",
    label: "Online Business",
    href: "#",
    color: "bg-blue-100 text-blue-500",
  },
  {
    icon: "tools",
    label: "Tools & Tech",
    href: "#",
    color: "bg-gray-100 text-gray-500",
  },
];

export const navLinks = [
  {
    label: "YouTube Masterclass",
    href: "/my-book",
  },
  {
    label: "Free Resources",
    href: "#",
    hasDropdown: true,
  },
  {
    label: "YouTube Academy",
    href: "#",
  },
  {
    label: "LifeOS Productivity System",
    href: "#",
  },
];

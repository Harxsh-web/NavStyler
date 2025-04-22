import { 
  ChevronRightIcon, 
  FileTextIcon, 
  BookIcon, 
  VideoIcon, 
  MicIcon, 
  MailIcon,
  BriefcaseIcon,
  YoutubeIcon,
  GraduationCapIcon,
  LineChartIcon,
  MonitorIcon
} from "lucide-react";
import { resourcesByType, resourcesByTopic, type ResourceItem } from "@/lib/menu-data";

interface ResourcesDropdownProps {
  isOpen: boolean;
  isMobile?: boolean;
}

const getIconForType = (iconType: string) => {
  switch (iconType) {
    case 'article':
      return <FileTextIcon className="h-4 w-4" />;
    case 'book':
      return <BookIcon className="h-4 w-4" />;
    case 'video':
      return <VideoIcon className="h-4 w-4" />;
    case 'podcast':
      return <MicIcon className="h-4 w-4" />;
    case 'newsletter':
      return <MailIcon className="h-4 w-4" />;
    case 'productivity':
      return <BriefcaseIcon className="h-4 w-4" />;
    case 'youtube':
      return <YoutubeIcon className="h-4 w-4" />;
    case 'studying':
      return <GraduationCapIcon className="h-4 w-4" />;
    case 'business':
      return <LineChartIcon className="h-4 w-4" />;
    case 'tools':
      return <MonitorIcon className="h-4 w-4" />;
    default:
      return <FileTextIcon className="h-4 w-4" />;
  }
};

const ResourceItem = ({ item, isMobile }: { item: ResourceItem; isMobile?: boolean }) => (
  <a 
    href={item.href} 
    className={`flex items-center ${isMobile ? 'py-2' : 'py-2'} text-gray-700 hover:text-[#30B8C4] transition-colors`}
  >
    <span className={`flex items-center justify-center h-6 w-6 rounded ${item.color} mr-3`}>
      {getIconForType(item.icon)}
    </span>
    {item.label}
  </a>
);

export default function ResourcesDropdown({ isOpen, isMobile = false }: ResourcesDropdownProps) {
  if (isMobile) {
    return (
      <div className={`resource-dropdown px-4 pt-2 ${isOpen ? 'active' : ''}`}>
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-3">Browse by type:</h3>
          <div className="space-y-3">
            {resourcesByType.map((item, index) => (
              <ResourceItem key={`type-${index}`} item={item} isMobile />
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-3">Browse by topic:</h3>
          <div className="space-y-3">
            {resourcesByTopic.map((item, index) => (
              <ResourceItem key={`topic-${index}`} item={item} isMobile />
            ))}
            <a href="#" className="flex items-center text-gray-500 hover:text-[#30B8C4] mt-1 transition-colors">
              all categories
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`dropdown absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-lg p-6 grid grid-cols-2 gap-x-8 gap-y-2 ${isOpen ? 'active' : ''}`}
    >
      <div>
        <h3 className="font-medium text-gray-800 mb-3">Browse by type:</h3>
        {resourcesByType.map((item, index) => (
          <ResourceItem key={`type-${index}`} item={item} />
        ))}
      </div>
      <div>
        <h3 className="font-medium text-gray-800 mb-3">Browse by topic:</h3>
        {resourcesByTopic.map((item, index) => (
          <ResourceItem key={`topic-${index}`} item={item} />
        ))}
        <a href="#" className="flex items-center text-gray-500 hover:text-[#30B8C4] mt-3 transition-colors">
          all categories
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

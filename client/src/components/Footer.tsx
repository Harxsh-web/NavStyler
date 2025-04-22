import { useFooterCategories, useFooterLinks, useSocialLinks, useSiteSettings } from "@/hooks/use-content";
import { Loader2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const { data: footerCategories, isLoading: categoriesLoading } = useFooterCategories();
  const { data: footerLinks, isLoading: linksLoading } = useFooterLinks();
  const { data: socialLinks, isLoading: socialLoading } = useSocialLinks();
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings();

  const isLoading = categoriesLoading || linksLoading || socialLoading || settingsLoading;

  if (isLoading) {
    return (
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </footer>
    );
  }

  // Organize links by category
  const linksByCategory = footerCategories?.map(category => {
    const categoryLinks = footerLinks?.filter(link => link.categoryId === category.id) || [];
    return {
      ...category,
      links: categoryLinks
    };
  }) || [];

  // Get social icon component based on type
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'facebook':
        return <FaFacebook className="h-5 w-5" />;
      case 'twitter':
        return <FaTwitter className="h-5 w-5" />;
      case 'instagram':
        return <FaInstagram className="h-5 w-5" />;
      case 'linkedin':
        return <FaLinkedin className="h-5 w-5" />;
      case 'youtube':
        return <FaYoutube className="h-5 w-5" />;
      default:
        return <FaTwitter className="h-5 w-5" />;
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{siteSettings?.siteName || "Feel-Good Productivity"}</h3>
            <p className="text-slate-300 text-sm max-w-xs">
              {siteSettings?.footerTagline || "The science-based guide to achieving more while feeling good in the process."}
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-4 pt-2">
              {socialLinks?.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition"
                >
                  {getSocialIcon(link.type)}
                </a>
              ))}
            </div>
          </div>

          {/* Link categories */}
          {linksByCategory.map((category) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-md font-semibold">{category.name}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.id}>
                    <a 
                      href={link.url} 
                      className="text-slate-300 hover:text-white text-sm transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} {siteSettings?.copyrightName || "Ali Abdaal"}. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
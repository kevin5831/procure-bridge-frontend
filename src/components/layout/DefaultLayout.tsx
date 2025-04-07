import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { HorizontalNav } from "./HorizontalNav";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CreateRequestSidePanel } from "@/pages/requests/components/CreateRequestSidePanel";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false);

  // Show horizontal nav for both requests and grn sections
  const showHorizontalNav =
    location.pathname.startsWith("/requests") ||
    location.pathname.startsWith("/grn");

  const sidebarOpen = (open : boolean) => {
    setIsSidebarOpen(open);
  } 
  // Handle scroll effect for nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Expose the create request function to the global window object
  // so it can be called from anywhere in the app
  useEffect(() => {
    // @ts-ignore
    window.openCreateRequestPanel = () => setIsRequestPanelOpen(true);

    return () => {
      // @ts-ignore
      delete window.openCreateRequestPanel;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onOpenChange={sidebarOpen} />
      <div className="lg:pl-64 transition-all duration-300 ease-in-out">
        <TopBar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          scrolled={scrolled}
          onCreateRequest={() => setIsRequestPanelOpen(true)}
        />
        {showHorizontalNav && <HorizontalNav />}
        <main className="max-w-7xl mx-auto px-6 py-6 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Global create request panel that can be triggered from anywhere */}
      <CreateRequestSidePanel
        open={isRequestPanelOpen}
        onOpenChange={setIsRequestPanelOpen}
      />
    </div>
  );
}

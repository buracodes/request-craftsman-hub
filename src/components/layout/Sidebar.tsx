import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  FolderTree,
  ShoppingCart,
  ClipboardCheck,
  ArrowUpDown,
  Trash2,
  Archive,
  BarChart3,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Master Data",
    icon: FolderTree,
    submenu: [
      { title: "Property Types", href: "/property-types" },
      { title: "Categories", href: "/categories" },
      { title: "Locations", href: "/locations" },
      { title: "Safety Boxes", href: "/safety-boxes" },
    ],
  },
  {
    title: "Property Management",
    icon: Package,
    submenu: [
      { title: "Property Registration", href: "/property-registration" },
      { title: "Property Receiving", href: "/property-receiving" },
      { title: "Property Issuing", href: "/property-issuing" },
      { title: "Property Return", href: "/property-return" },
    ],
  },
  {
    title: "Requests",
    icon: ShoppingCart,
    submenu: [
      { title: "Purchase Requests", href: "/purchase-requests" },
      { title: "Store Requisitions", href: "/store-requisitions" },
    ],
  },
  {
    title: "Inspections",
    icon: ClipboardCheck,
    href: "/inspections",
  },
  {
    title: "Transfers",
    icon: ArrowUpDown,
    href: "/transfers",
  },
  {
    title: "Disposal",
    icon: Trash2,
    href: "/disposal",
  },
  {
    title: "Reports",
    icon: BarChart3,
    submenu: [
      { title: "Property Reports", href: "/reports/property" },
      { title: "Financial Reports", href: "/reports/financial" },
      { title: "Compliance Reports", href: "/reports/compliance" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    href: "/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const handleNavigation = (href?: string, title?: string) => {
    if (href) {
      navigate(href);
    } else if (title) {
      toggleItem(title);
    }
  };

  const isActiveRoute = (href?: string, submenu?: Array<{href: string}>) => {
    if (href && location.pathname === href) return true;
    if (submenu) {
      return submenu.some(item => location.pathname === item.href);
    }
    return false;
  };

  return (
    <div className={cn("relative flex flex-col border-r border-border bg-card", className)}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Archive className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">PAS Menu</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.title);
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.title}>
                <Button
                  variant={isActiveRoute(item.href, item.submenu) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-left",
                    collapsed && "justify-center px-2",
                    isActiveRoute(item.href, item.submenu) && "bg-gradient-primary shadow-glow"
                  )}
                  onClick={() => handleNavigation(item.href, hasSubmenu ? item.title : undefined)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {hasSubmenu && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isExpanded && "rotate-90"
                          )}
                        />
                      )}
                    </>
                  )}
                </Button>

                {hasSubmenu && isExpanded && !collapsed && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu?.map((subItem) => (
                      <Button
                        key={subItem.title}
                        variant={location.pathname === subItem.href ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start text-sm hover:text-foreground",
                          location.pathname === subItem.href 
                            ? "text-primary bg-primary/10" 
                            : "text-muted-foreground"
                        )}
                        onClick={() => navigate(subItem.href)}
                      >
                        {subItem.title}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
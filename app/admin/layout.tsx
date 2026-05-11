"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Package,
  FileText,
  Briefcase,
  Mail,
  Image,
  ChevronRight,
  Bell,
  Search,
  User,
  Sparkles,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminMenuItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "#0ea5e9",
    badge: null,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
    color: "#06b6d4",
    badge: "12",
  },
  {
    href: "/admin/blogs",
    label: "Blog",
    icon: FileText,
    color: "#10b981",
    badge: "3",
  },
  {
    href: "/admin/careers",
    label: "Careers",
    icon: Briefcase,
    color: "#f59e0b",
    badge: "5",
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    icon: Mail,
    color: "#ef4444",
    badge: "8",
  },
  {
    href: "/admin/media",
    label: "Media",
    icon: Image,
    color: "#8b5cf6",
    badge: null,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: TrendingUp,
    color: "#ec4899",
    badge: null,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    color: "#6b7280",
    badge: null,
  },
];

const notifications = [
  {
    id: 1,
    title: "New product inquiry",
    message: "Someone requested a demo for SERDES IP",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Blog comment",
    message: "New comment on 'Future of Analog Design'",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Career application",
    message: "New application for Senior Designer position",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "System update",
    message: "Admin panel updated to version 2.0",
    time: "1 day ago",
    read: true,
  },
];

// Sidebar Component
function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activePath,
  setActivePath,
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sidebar-content",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      );
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  const filteredMenuItems = adminMenuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div
      ref={sidebarRef}
      className={`fixed md:sticky top-0 left-0 h-screen z-50 w-72 bg-white border-r border-slate-200 shadow-xl transition-all duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Sidebar Header */}
      {/* <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-gradient-to-r from-blue-600/5 to-cyan-500/5">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div> */}

      {/* Search */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 p-4 flex-1 overflow-y-auto sidebar-content h-[calc(100vh-180px)]">
        {filteredMenuItems.map((item, index) => {
          const isActive = activePath === item.href;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                onClick={() => {
                  setSidebarOpen(false);
                  setIndex(index);
                }}
              >
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/10 to-cyan-500/10 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-blue-600" : ""
                    }`}
                  />
                  <span className="flex-1 font-medium text-xs">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-blue-600"
                    />
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// TopBar Component
function TopBar({ setSidebarOpen, activePath }: any) {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markNotificationAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotificationsList((prev) =>
      prev.map((notif) => ({ ...notif, read: true })),
    );
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 transition-all duration-300 z-30 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Admin</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-600 capitalize font-medium">
            {activePath.split("/").filter(Boolean).pop() || "dashboard"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notificationsList.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                        !notif.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">Admin User</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </motion.button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500">admin@smartscope.com</p>
                </div>
                <div className="p-2">
                  <Link href="/admin/profile">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700">Profile</span>
                    </div>
                  </Link>
                  <Link href="/admin/settings">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700">Settings</span>
                    </div>
                  </Link>
                  <div className="border-t border-slate-200 my-2" />
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Cards Component
function StatsCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
    >
      {[
        {
          label: "Total Products",
          value: "24",
          icon: Package,
          color: "from-blue-500 to-cyan-500",
          change: "+12%",
        },
        {
          label: "Blog Posts",
          value: "18",
          icon: FileText,
          color: "from-emerald-500 to-teal-500",
          change: "+5%",
        },
        {
          label: "Active Jobs",
          value: "6",
          icon: Briefcase,
          color: "from-orange-500 to-red-500",
          change: "-2%",
        },
        {
          label: "Pending Inquiries",
          value: "8",
          icon: Mail,
          color: "from-purple-500 to-pink-500",
          change: "+3%",
        },
      ].map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const isDashboard = activePath === "/admin";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePath={activePath}
        setActivePath={setActivePath}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar setSidebarOpen={setSidebarOpen} activePath={activePath} />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Quick Stats - Only show on dashboard */}
            {isDashboard && <StatsCards />}

            {/* Children Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

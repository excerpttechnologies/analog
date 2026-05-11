"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Package, 
  FileText, 
  MessageSquare, 
  Users,
  DollarSign,
  Eye,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Download,
  RefreshCw,
  Calendar,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 12000, orders: 45 },
  { month: "Feb", revenue: 19000, orders: 58 },
  { month: "Mar", revenue: 15000, orders: 52 },
  { month: "Apr", revenue: 22000, orders: 68 },
  { month: "May", revenue: 28000, orders: 85 },
  { month: "Jun", revenue: 32000, orders: 102 },
  { month: "Jul", revenue: 35000, orders: 115 },
  { month: "Aug", revenue: 41000, orders: 128 },
  { month: "Sep", revenue: 45000, orders: 142 },
  { month: "Oct", revenue: 52000, orders: 158 },
  { month: "Nov", revenue: 58000, orders: 175 },
  { month: "Dec", revenue: 65000, orders: 195 },
];

const productData = [
  { name: "SERDES IP", value: 35, color: "#0ea5e9" },
  { name: "PLL Systems", value: 25, color: "#06b6d4" },
  { name: "Analog IP", value: 20, color: "#10b981" },
  { name: "Digital IP", value: 15, color: "#f59e0b" },
  { name: "ML Converters", value: 5, color: "#ef4444" },
];

const trafficData = [
  { day: "Mon", visits: 320, pageViews: 450 },
  { day: "Tue", visits: 450, pageViews: 580 },
  { day: "Wed", visits: 380, pageViews: 490 },
  { day: "Thu", visits: 520, pageViews: 650 },
  { day: "Fri", visits: 480, pageViews: 610 },
  { day: "Sat", visits: 280, pageViews: 350 },
  { day: "Sun", visits: 250, pageViews: 310 },
];

const recentInquiries = [
  { id: 1, name: "John Smith", email: "john@example.com", subject: "SERDES IP Implementation", date: "2024-01-15", status: "pending", priority: "high" },
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", subject: "Custom Analog Solution", date: "2024-01-14", status: "contacted", priority: "medium" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", subject: "Datasheet Request", date: "2024-01-13", status: "resolved", priority: "low" },
  { id: 4, name: "Emily Watson", email: "emily@example.com", subject: "PLL Integration Support", date: "2024-01-12", status: "pending", priority: "high" },
  { id: 5, name: "David Kim", email: "david@example.com", subject: "Volume Pricing Inquiry", date: "2024-01-11", status: "contacted", priority: "medium" },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  contacted: "bg-blue-100 text-blue-700 border-blue-200",
  resolved: "bg-green-100 text-green-700 border-green-200",
};

const priorityColors = {
  high: "text-red-600 bg-red-50",
  medium: "text-orange-600 bg-orange-50",
  low: "text-green-600 bg-green-50",
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("year");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: "Total Products", value: "24", change: "+2", changeType: "up", icon: Package, color: "blue", subtext: "this month" },
    { label: "Blog Articles", value: "42", change: "+5", changeType: "up", icon: FileText, color: "cyan", subtext: "this month" },
    { label: "Inquiries", value: "156", change: "+23", changeType: "up", icon: MessageSquare, color: "purple", subtext: "this month" },
    { label: "Revenue", value: "$124K", change: "+18%", changeType: "up", icon: DollarSign, color: "green", subtext: "this month" },
    { label: "Total Users", value: "2,847", change: "+124", changeType: "up", icon: Users, color: "orange", subtext: "active users" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.5%", changeType: "up", icon: TrendingUp, color: "pink", subtext: "vs last month" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    // Animate stats cards
    statsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "back.out(0.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate chart
    gsap.fromTo(chartRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: ${p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header with Refresh */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Welcome back to SmartScope Admin Panel</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 ${isRefreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300">
            <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[index] = el; }}
              className="group"
            >
              <Card className="relative overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                      <Icon className={`w-4 h-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                    </div>
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/20`}>
                      <ArrowUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{stat.subtext}</p>
                  </div>
                </div>
                {/* Animated progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div ref={chartRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Revenue Overview</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Monthly revenue tracking</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              >
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" fill="url(#colorRevenue)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Traffic Chart */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Website Traffic</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#0ea5e9" name="Visits" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pageViews" fill="#06b6d4" name="Page Views" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Product Distribution */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Product Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Page Load Time", value: "1.2s", change: "-0.3s", target: "< 1.5s", progress: 80 },
              { label: "Bounce Rate", value: "32%", change: "-5%", target: "< 35%", progress: 68 },
              { label: "Conversion Rate", value: "3.2%", change: "+0.5%", target: "3%", progress: 75 },
              { label: "Customer Satisfaction", value: "4.8/5", change: "+0.2", target: "4.5", progress: 96 },
            ].map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{metric.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{metric.value}</span>
                </div>
                <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-green-600 dark:text-green-400">{metric.change}</span>
                  <span className="text-slate-400">Target: {metric.target}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Inquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Inquiries</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{inquiry.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[inquiry.priority as keyof typeof priorityColors]}`}>
                          {inquiry.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{inquiry.subject}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{inquiry.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 dark:text-slate-500">{inquiry.date}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[inquiry.status as keyof typeof statusColors]}`}>
                          {inquiry.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { label: "Add New Product", icon: Package, color: "blue", gradient: "from-blue-500 to-cyan-500" },
                  { label: "Publish Blog Post", icon: FileText, color: "cyan", gradient: "from-cyan-500 to-teal-500" },
                  { label: "View Analytics", icon: TrendingUp, color: "purple", gradient: "from-purple-500 to-pink-500" },
                  { label: "Export Data", icon: Download, color: "green", gradient: "from-green-500 to-emerald-500" },
                  { label: "Manage Users", icon: Users, color: "orange", gradient: "from-orange-500 to-red-500" },
                  { label: "System Settings", icon: Activity, color: "slate", gradient: "from-slate-500 to-slate-600" },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20`}>
                        <Icon className={`w-4 h-4 text-${action.color}-600 dark:text-${action.color}-400`} />
                      </div>
                      <span className="flex-1 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                        {action.label}
                      </span>
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${action.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        <ArrowUp className="w-3 h-3 text-white rotate-45" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
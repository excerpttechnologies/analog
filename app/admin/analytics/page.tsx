'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  MousePointerClick,
  Clock,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
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
} from 'recharts';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data
const trafficData = [
  { month: 'Jan', visitors: 1200, pageViews: 3500, avgTime: 2.4 },
  { month: 'Feb', visitors: 1900, pageViews: 5200, avgTime: 2.6 },
  { month: 'Mar', visitors: 1500, pageViews: 4800, avgTime: 2.5 },
  { month: 'Apr', visitors: 2200, pageViews: 6800, avgTime: 2.8 },
  { month: 'May', visitors: 2800, pageViews: 8500, avgTime: 3.0 },
  { month: 'Jun', visitors: 3200, pageViews: 10200, avgTime: 3.2 },
  { month: 'Jul', visitors: 3500, pageViews: 11500, avgTime: 3.1 },
  { month: 'Aug', visitors: 4100, pageViews: 12800, avgTime: 3.3 },
  { month: 'Sep', visitors: 4500, pageViews: 14200, avgTime: 3.4 },
  { month: 'Oct', visitors: 5200, pageViews: 15800, avgTime: 3.5 },
  { month: 'Nov', visitors: 5800, pageViews: 17500, avgTime: 3.6 },
  { month: 'Dec', visitors: 6500, pageViews: 19500, avgTime: 3.8 },
];

const deviceData = [
  { name: 'Desktop', value: 65, color: '#0ea5e9', icon: Monitor },
  { name: 'Mobile', value: 25, color: '#06b6d4', icon: Smartphone },
  { name: 'Tablet', value: 10, color: '#8b5cf6', icon: Monitor },
];

const sourceData = [
  { name: 'Organic Search', value: 45, color: '#10b981' },
  { name: 'Direct', value: 25, color: '#f59e0b' },
  { name: 'Social Media', value: 15, color: '#ef4444' },
  { name: 'Referral', value: 10, color: '#8b5cf6' },
  { name: 'Email', value: 5, color: '#06b6d4' },
];

const topPages = [
  { page: '/', views: 12500, bounceRate: 32, avgTime: '2:30' },
  { page: '/products', views: 8750, bounceRate: 28, avgTime: '3:15' },
  { page: '/blog', views: 6200, bounceRate: 45, avgTime: '1:45' },
  { page: '/contact', views: 3400, bounceRate: 52, avgTime: '1:20' },
  { page: '/about', views: 2800, bounceRate: 38, avgTime: '2:00' },
];

const dailyVisits = [
  { day: 'Mon', visits: 450, unique: 380 },
  { day: 'Tue', visits: 520, unique: 420 },
  { day: 'Wed', visits: 580, unique: 460 },
  { day: 'Thu', visits: 610, unique: 490 },
  { day: 'Fri', visits: 590, unique: 470 },
  { day: 'Sat', visits: 350, unique: 290 },
  { day: 'Sun', visits: 320, unique: 260 },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('year');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('visitors');
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    statsRef.current.forEach((stat, index) => {
      if (!stat) return;
      
      gsap.fromTo(stat,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'back.out(0.4)',
        }
      );
    });
  }, []);

  const totalVisitors = trafficData.reduce((sum, d) => sum + d.visitors, 0);
  const totalPageViews = trafficData.reduce((sum, d) => sum + d.pageViews, 0);
  const avgTrafficTime = (trafficData.reduce((sum, d) => sum + d.avgTime, 0) / trafficData.length).toFixed(1);
  const conversionRate = ((totalVisitors / totalPageViews) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: {p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Track your website performance and user engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300">
            <Download className="w-4 h-4 text-slate-600" />
            <span className="text-sm text-slate-600">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors', value: totalVisitors.toLocaleString(), change: '+23%', icon: Users, color: 'blue', trend: 'up' },
          { label: 'Page Views', value: totalPageViews.toLocaleString(), change: '+18%', icon: Eye, color: 'cyan', trend: 'up' },
          { label: 'Avg. Time on Site', value: `${avgTrafficTime} min`, change: '+0.4 min', icon: Clock, color: 'green', trend: 'up' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, change: '+2.1%', icon: Activity, color: 'purple', trend: 'up' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              ref={(el) => { statsRef.current[idx] = el; }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-white border-slate-200 p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-600" />
                      )}
                      <span className="text-xs text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Trend */}
        <Card className="bg-white border-slate-200 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Traffic Overview</h2>
              <p className="text-sm text-slate-500 mt-1">Monthly visitors and page views</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('visitors')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedMetric === 'visitors'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Visitors
              </button>
              <button
                onClick={() => setSelectedMetric('pageViews')}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedMetric === 'pageViews'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Page Views
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {selectedMetric === 'visitors' ? (
                <Area type="monotone" dataKey="visitors" stroke="#0ea5e9" fill="url(#colorVisitors)" name="Visitors" />
              ) : (
                <Area type="monotone" dataKey="pageViews" stroke="#06b6d4" fill="url(#colorPageViews)" name="Page Views" />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Daily Traffic */}
        <Card className="bg-white border-slate-200 shadow-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Daily Traffic</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dailyVisits}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#0ea5e9" name="Visits" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unique" fill="#06b6d4" name="Unique Visitors" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <Card className="bg-white border-slate-200 shadow-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Device Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
            {deviceData.map((device, idx) => {
              const Icon = device.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: device.color }} />
                  <p className="text-lg font-bold text-slate-900">{device.value}%</p>
                  <p className="text-xs text-slate-500">{device.name}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-white border-slate-200 shadow-xl p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card className="bg-white border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Top Performing Pages</h2>
          <p className="text-sm text-slate-500 mt-1">Most visited pages on your site</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-slate-700">Page</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700">Views</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700">Bounce Rate</th>
                <th className="text-left py-3 px-6 font-semibold text-slate-700">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-6 font-medium text-slate-900">{page.page}</td>
                  <td className="py-3 px-6 text-slate-600">{page.views.toLocaleString()}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          style={{ width: `${page.bounceRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600">{page.bounceRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-slate-600">{page.avgTime}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Bounce Rate', value: '35%', change: '-5%', icon: MousePointerClick, color: 'orange' },
          { label: 'Pages/Session', value: '3.2', change: '+0.4', icon: BarChart3, color: 'green' },
          { label: 'New Visitors', value: '42%', change: '+8%', icon: Users, color: 'blue' },
          { label: 'Returning', value: '58%', change: '-2%', icon: TrendingUp, color: 'purple' },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <Card className="bg-white border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-${metric.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{metric.label}</p>
                    <p className="text-xl font-bold text-slate-900">{metric.value}</p>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change} from last month
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
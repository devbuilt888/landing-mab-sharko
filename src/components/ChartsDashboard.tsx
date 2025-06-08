import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Treemap, FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Sample data for different charts
const lineData = [
  { name: 'Jan', users: 4000, revenue: 2400, growth: 24 },
  { name: 'Feb', users: 3000, revenue: 1398, growth: 22 },
  { name: 'Mar', users: 2000, revenue: 9800, growth: 29 },
  { name: 'Apr', users: 2780, revenue: 3908, growth: 20 },
  { name: 'May', users: 1890, revenue: 4800, growth: 18 },
  { name: 'Jun', users: 2390, revenue: 3800, growth: 23 },
  { name: 'Jul', users: 3490, revenue: 4300, growth: 21 },
];

const areaData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const barData = [
  { name: 'Product A', sales: 4000, profit: 2400, market: 2400 },
  { name: 'Product B', sales: 3000, profit: 1398, market: 2210 },
  { name: 'Product C', sales: 2000, profit: 9800, market: 2290 },
  { name: 'Product D', sales: 2780, profit: 3908, market: 2000 },
  { name: 'Product E', sales: 1890, profit: 4800, market: 2181 },
  { name: 'Product F', sales: 2390, profit: 3800, market: 2500 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: '#0088FE' },
  { name: 'Mobile', value: 300, color: '#00C49F' },
  { name: 'Tablet', value: 300, color: '#FFBB28' },
  { name: 'Smart TV', value: 200, color: '#FF8042' },
  { name: 'Other', value: 100, color: '#8884D8' },
];

const scatterData = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
];

const radarData = [
  { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
  { subject: 'Usability', A: 98, B: 130, fullMark: 150 },
  { subject: 'Scalability', A: 86, B: 130, fullMark: 150 },
  { subject: 'Security', A: 99, B: 100, fullMark: 150 },
  { subject: 'Reliability', A: 85, B: 90, fullMark: 150 },
  { subject: 'Efficiency', A: 65, B: 85, fullMark: 150 },
];

const treemapData = [
  { name: 'React', size: 800, fill: '#0088FE' },
  { name: 'Vue', size: 400, fill: '#00C49F' },
  { name: 'Angular', size: 300, fill: '#FFBB28' },
  { name: 'Node.js', size: 600, fill: '#FF8042' },
  { name: 'Python', size: 400, fill: '#8884D8' },
  { name: 'Java', size: 200, fill: '#82CA9D' },
  { name: 'MongoDB', size: 400, fill: '#FFC658' },
  { name: 'PostgreSQL', size: 250, fill: '#FF7C7C' },
  { name: 'Redis', size: 150, fill: '#8DD1E1' },
  { name: 'Docker', size: 300, fill: '#D084D0' },
  { name: 'Kubernetes', size: 200, fill: '#87D068' },
  { name: 'CI/CD', size: 100, fill: '#FFA940' }
];

const funnelData = [
  { name: 'Visitors', value: 10000, fill: '#8884d8' },
  { name: 'Sign Ups', value: 5000, fill: '#83a6ed' },
  { name: 'Active Users', value: 3000, fill: '#8dd1e1' },
  { name: 'Premium Users', value: 1500, fill: '#82ca9d' },
  { name: 'Enterprise', value: 500, fill: '#a4de6c' },
];

const composedData = [
  { name: 'Jan', uv: 590, pv: 800, amt: 1400, temp: 15 },
  { name: 'Feb', uv: 868, pv: 967, amt: 1506, temp: 18 },
  { name: 'Mar', uv: 1397, pv: 1098, amt: 989, temp: 22 },
  { name: 'Apr', uv: 1480, pv: 1200, amt: 1228, temp: 25 },
  { name: 'May', uv: 1520, pv: 1108, amt: 1100, temp: 28 },
  { name: 'Jun', uv: 1400, pv: 680, amt: 1700, temp: 32 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const ChartsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'sales', name: 'Sales', icon: '💰' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'performance', name: 'Performance', icon: '⚡' },
  ];

  const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        {title}
      </h3>
      <div className="h-80">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Charts Dashboard</h1>
              <p className="text-gray-600">Comprehensive chart examples with Recharts</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Data
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Line Chart */}
          <ChartCard title="Line Chart - Growth Trends">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Area Chart */}
          <ChartCard title="Area Chart - Page Views">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Bar Chart */}
          <ChartCard title="Bar Chart - Product Performance">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="profit" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Pie Chart */}
          <ChartCard title="Pie Chart - Device Usage">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Scatter Plot */}
          <ChartCard title="Scatter Plot - Correlation Analysis">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={scatterData}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={scatterData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Radar Chart */}
          <ChartCard title="Radar Chart - Performance Metrics">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Team A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Team B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Composed Chart */}
          <ChartCard title="Composed Chart - Multi-metric Analysis">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={composedData}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar yAxisId="left" dataKey="pv" fill="#413ea0" />
                <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Funnel Chart */}
          <ChartCard title="Funnel Chart - Conversion Rates">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Treemap */}
          <ChartCard title="Treemap - Technology Stack">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                stroke="#fff"
                fill="#8884d8"
              />
            </ResponsiveContainer>
          </ChartCard>

          {/* Stacked Bar Chart */}
          <ChartCard title="Stacked Bar Chart - Monthly Breakdown">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" stackId="a" fill="#8884d8" />
                <Bar dataKey="revenue" stackId="a" fill="#82ca9d" />
                <Bar dataKey="growth" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Donut Chart */}
          <ChartCard title="Donut Chart - Market Share">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Multi-Line Chart */}
          <ChartCard title="Multi-Line Chart - Trend Comparison">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="growth" stroke="#ffc658" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>
      </div>

      {/* Stats Footer */}
      <div className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Chart Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">Responsive</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">Live</div>
              <div className="text-sm text-gray-600">Data Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">Fast</div>
              <div className="text-sm text-gray-600">Rendering</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsDashboard; 
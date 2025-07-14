import React, { useState } from 'react';
import { RefreshCw, Database, Globe, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface DataFeed {
  id: string;
  name: string;
  description: string;
  lastUpdate: string;
  status: 'success' | 'error' | 'pending';
  frequency: string;
  nextUpdate: string;
}

const Admin: React.FC = () => {
  const [dataFeeds] = useState<DataFeed[]>([
    {
      id: '1',
      name: 'Tariff API',
      description: 'Daily updates of tariff rates and trade policies',
      lastUpdate: '2023-12-07 08:00:00',
      status: 'success',
      frequency: 'Daily',
      nextUpdate: '2023-12-08 08:00:00'
    },
    {
      id: '2',
      name: 'Geo-Policy Signal Feed',
      description: 'Real-time geopolitical risk indicators and policy changes',
      lastUpdate: '2023-12-07 14:30:00',
      status: 'success',
      frequency: 'Real-time',
      nextUpdate: 'Continuous'
    },
    {
      id: '3',
      name: 'Currency & Trade Calendar',
      description: 'Exchange rates and upcoming trade deal announcements',
      lastUpdate: '2023-12-07 12:15:00',
      status: 'error',
      frequency: 'Hourly',
      nextUpdate: '2023-12-07 15:15:00'
    },
    {
      id: '4',
      name: 'Supplier Database',
      description: 'Updated supplier information and capability scores',
      lastUpdate: '2023-12-07 06:00:00',
      status: 'pending',
      frequency: 'Weekly',
      nextUpdate: '2023-12-14 06:00:00'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = (feedId: string) => {
    console.log(`Refreshing feed: ${feedId}`);
    alert('Refresh initiated. Feed will update in the background.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor data feeds and system health for the Tariff Risk Profiler
        </p>
      </div>

      {/* Data Feeds Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Data Feed Status</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor and manage external data sources that power risk calculations
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataFeeds.map((feed) => (
                <tr key={feed.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {feed.name.includes('Tariff') && <Database className="h-5 w-5 text-blue-600" />}
                        {feed.name.includes('Geo') && <Globe className="h-5 w-5 text-purple-600" />}
                        {feed.name.includes('Currency') && <Calendar className="h-5 w-5 text-green-600" />}
                        {feed.name.includes('Supplier') && <Database className="h-5 w-5 text-orange-600" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{feed.name}</div>
                        <div className="text-sm text-gray-500">{feed.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feed.status)}`}>
                      {getStatusIcon(feed.status)}
                      <span className="capitalize">{feed.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(feed.lastUpdate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feed.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {feed.nextUpdate === 'Continuous' ? 'Continuous' : new Date(feed.nextUpdate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRefresh(feed.id)}
                      className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Refresh</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Configuration */}
      {/* System Configuration */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Risk Calculation Frequency</p>
                <p className="text-sm text-gray-500">How often risk scores are recalculated</p>
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Every 4 hours</option>
                <option>Every 8 hours</option>
                <option>Daily</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Alert Notification Delay</p>
                <p className="text-sm text-gray-500">Minimum time between duplicate alerts</p>
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Data Retention Period</p>
                <p className="text-sm text-gray-500">How long to keep historical data</p>
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>6 months</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>5 years</option>
              </select>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
        
        {/* Empty div to preserve layout */}
        <div className="hidden lg:block" />
      </div>
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';

type RecentLookup = {
  id: number;
  domain: string;
  recordType: string;
  timestamp: string;
  success: boolean;
};

interface RecentLookupsProps {
  onSelectLookup: (domain: string, recordType: string) => void;
}

const RecentLookups: React.FC<RecentLookupsProps> = ({ onSelectLookup }) => {
  const [recentLookups, setRecentLookups] = useState<RecentLookup[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentLookups');
      if (stored) {
        setRecentLookups(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error retrieving recent lookups:', error);
    }
  }, []);

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Invalid time';
    }
  };

  if (recentLookups.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Clock className="h-6 w-6 text-blue-600" />
        Recent Lookups
      </h2>
      
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domain
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Record Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentLookups.map((lookup) => (
              <tr key={lookup.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lookup.domain}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {lookup.recordType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTime(lookup.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onSelectLookup(lookup.domain, lookup.recordType)}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Recheck</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentLookups;
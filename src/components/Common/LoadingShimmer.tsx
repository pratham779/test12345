import React from 'react';

interface LoadingShimmerProps {
  className?: string;
  rows?: number;
  type?: 'card' | 'table' | 'chart' | 'text' | 'modal' | 'dashboard-table' | 'search-results' | 'kpi-cards' | 'category-table' | 'sourcing-alternatives';
}

const LoadingShimmer: React.FC<LoadingShimmerProps> = ({ 
  className = '', 
  rows = 3, 
  type = 'card' 
}) => {
  const shimmerClass = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded";

  if (type === 'kpi-cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className={`h-4 w-3/4 mb-2 ${shimmerClass}`}></div>
                <div className={`h-8 w-1/2 mb-2 ${shimmerClass}`}></div>
                <div className={`h-3 w-2/3 mb-1 ${shimmerClass}`}></div>
                <div className={`h-3 w-1/2 ${shimmerClass}`}></div>
              </div>
              <div className="ml-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${shimmerClass}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'category-table') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className={`h-6 w-2/3 mb-2 ${shimmerClass}`}></div>
          <div className={`h-4 w-1/2 ${shimmerClass}`}></div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="px-4 sm:px-6 py-3">
                    <div className={`h-4 w-full ${shimmerClass}`}></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 sm:px-6 py-4">
                    <div className={`h-4 w-full ${shimmerClass}`}></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {[...Array(2)].map((_, j) => (
                        <div key={j} className={`h-6 w-16 rounded-full ${shimmerClass}`}></div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-12 h-6 rounded-full ${shimmerClass}`}></div>
                      <div className={`h-4 w-12 ${shimmerClass}`}></div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className={`h-4 w-16 ${shimmerClass}`}></div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className={`h-6 w-20 rounded-full ${shimmerClass}`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'search-results') {
    return (
      <div className={`p-2 ${className}`}>
        <div className="p-2">
          <div className={`h-4 w-1/3 mb-2 px-2 ${shimmerClass}`}></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border-b border-gray-100 last:border-b-0">
              <div className="flex-1 mb-2 sm:mb-0">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className={`h-4 w-48 mb-1 ${shimmerClass}`}></div>
                    <div className={`h-3 w-32 mb-2 ${shimmerClass}`}></div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`h-5 w-16 rounded-full ${shimmerClass}`}></div>
                      <div className={`h-3 w-20 ${shimmerClass}`}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-3">
                <div className="text-right">
                  <div className={`h-4 w-12 mb-1 ${shimmerClass}`}></div>
                  <div className={`h-3 w-16 ${shimmerClass}`}></div>
                </div>
                <div className={`w-12 h-6 rounded-full ${shimmerClass}`}></div>
                <div className={`h-6 w-20 rounded-full ${shimmerClass}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'sourcing-alternatives') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Best Overall Choice Shimmer */}
        <div className="bg-white rounded-lg p-4 border-2 border-green-200">
          <div className="flex items-center mb-3">
            <div className={`h-5 w-5 rounded-full mr-2 ${shimmerClass}`}></div>
            <div className={`h-5 w-32 ${shimmerClass}`}></div>
          </div>
          <div className={`h-4 w-48 mb-2 ${shimmerClass}`}></div>
          <div className={`h-3 w-32 mb-2 ${shimmerClass}`}></div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-3 w-full ${shimmerClass}`}></div>
            ))}
          </div>
          <div className={`h-3 w-40 mt-2 ${shimmerClass}`}></div>
        </div>
        
        {/* Tab Buttons Shimmer */}
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-10 w-24 rounded-lg ${shimmerClass}`}></div>
          ))}
        </div>
        
        {/* Options Grid Shimmer */}
        <div className="mb-6">
          <div className={`h-5 w-48 mb-4 ${shimmerClass}`}></div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[...Array(8)].map((_, i) => (
                      <th key={i} className="px-4 sm:px-6 py-3">
                        <div className={`h-4 w-full ${shimmerClass}`}></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(3)].map((_, i) => (
                    <tr key={i}>
                      {[...Array(8)].map((_, j) => (
                        <td key={j} className="px-4 sm:px-6 py-4">
                          <div className={`h-4 w-full ${shimmerClass}`}></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Additional Analysis Shimmer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className={`h-4 w-32 mb-2 ${shimmerClass}`}></div>
              <div className={`h-6 w-20 mb-2 ${shimmerClass}`}></div>
              <div className={`h-3 w-full ${shimmerClass}`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'dashboard-table') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[...Array(8)].map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="flex items-center space-x-1">
                      <div className={`h-3 w-12 ${shimmerClass}`}></div>
                      <div className={`h-3 w-3 ${shimmerClass}`}></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(10)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className={`h-4 w-16 ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`h-4 w-32 mb-1 ${shimmerClass}`}></div>
                    <div className={`h-3 w-20 ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`h-4 w-20 ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`h-4 w-12 ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`h-4 w-8 ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`w-12 h-6 rounded-full ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`w-12 h-6 rounded-full ${shimmerClass}`}></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`h-6 w-20 rounded-full ${shimmerClass}`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Shimmer */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <div className={`h-8 w-20 rounded-md ${shimmerClass}`}></div>
            <div className={`h-8 w-16 rounded-md ${shimmerClass}`}></div>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className={`h-4 w-48 ${shimmerClass}`}></div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-8 w-8 rounded-md ${shimmerClass}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="space-y-4">
          <div className={`h-6 w-3/4 ${shimmerClass}`}></div>
          <div className={`h-4 w-1/2 ${shimmerClass}`}></div>
          <div className="space-y-2">
            {[...Array(rows)].map((_, i) => (
              <div key={i} className={`h-3 w-full ${shimmerClass}`}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
        <div className="p-4 border-b border-gray-200">
          <div className={`h-6 w-1/3 ${shimmerClass}`}></div>
        </div>
        <div className="p-4 space-y-3">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className={`h-4 w-1/4 ${shimmerClass}`}></div>
              <div className={`h-4 w-1/4 ${shimmerClass}`}></div>
              <div className={`h-4 w-1/4 ${shimmerClass}`}></div>
              <div className={`h-4 w-1/4 ${shimmerClass}`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className={`h-6 w-1/3 mb-4 ${shimmerClass}`}></div>
        <div className={`h-64 w-full ${shimmerClass}`}></div>
      </div>
    );
  }

  if (type === 'modal') {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className={`h-8 w-2/3 ${shimmerClass}`}></div>
          <div className={`h-4 w-1/2 ${shimmerClass}`}></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className={`h-4 w-3/4 mb-2 ${shimmerClass}`}></div>
              <div className={`h-6 w-1/2 ${shimmerClass}`}></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className={`h-5 w-1/3 mb-4 ${shimmerClass}`}></div>
              <div className={`h-48 w-full ${shimmerClass}`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className={`h-4 w-full ${shimmerClass}`}></div>
      ))}
    </div>
  );
};

export default LoadingShimmer;
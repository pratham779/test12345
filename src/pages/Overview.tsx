import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Package, AlertTriangle, DollarSign, TrendingDown, MapPin, Clock, Percent, TrendingUp, Filter } from 'lucide-react';
import ActionPill from '../components/Common/ActionPill';
import RiskScore from '../components/Common/RiskScore';
import SKUForecastModal from '../components/SKU/SKUForecastModal';
import LoadingShimmer from '../components/Common/LoadingShimmer';
import { mockCategories, mockSKUs, mockSuppliers } from '../data/mockData';
import { SKU, NewSKUOption } from '../types';

const Overview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSKU, setSelectedSKU] = useState<SKU | null>(null);
  const [searchResults, setSearchResults] = useState<SKU[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingKPIs, setIsLoadingKPIs] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);

  // Simulate loading for KPIs and categories
  useEffect(() => {
    const kpiTimer = setTimeout(() => setIsLoadingKPIs(false), 800);
    const categoryTimer = setTimeout(() => setIsLoadingCategories(false), 1200);
    return () => {
      clearTimeout(kpiTimer);
      clearTimeout(categoryTimer);
    };
  }, []);

  const totalSKUs = mockSKUs.length;
  const highRiskPercentage = Math.round((mockSKUs.filter(sku => sku.totalRisk >= 80).length / totalSKUs) * 100);
  const totalAtRisk = mockCategories.reduce((sum, cat) => sum + cat.amountAtRisk, 0);
  const highRiskCategories = mockCategories.filter(cat => cat.riskScore >= 70 && cat.action !== 'maintain');

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
      const results = mockSKUs.filter(sku => 
        sku.name.toLowerCase().includes(term.toLowerCase()) ||
        sku.category.toLowerCase().includes(term.toLowerCase()) ||
        sku.id.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
        setIsSearching(false);
      }, 800);
    } else {
      setShowResults(false);
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSKUClick = (sku: SKU) => {
    setSelectedSKU(sku);
    setShowResults(false);
  };

  const getNewSKUOptions = (searchTerm: string): NewSKUOption[] => {
    const domesticSuppliers = mockSuppliers.filter(s => s.isDomestic).sort((a, b) => b.marginChange - a.marginChange);
    const naftaSuppliers = mockSuppliers.filter(s => s.supplierType === 'nafta').sort((a, b) => b.marginChange - a.marginChange);
    const internationalSuppliers = mockSuppliers.filter(s => s.supplierType === 'international').sort((a, b) => b.marginChange - a.marginChange);

    const options: NewSKUOption[] = [];

    if (domesticSuppliers.length > 0) {
      const best = domesticSuppliers[0];
      options.push({
        type: 'domestic',
        country: best.country,
        estimatedMargin: 38.5 + best.marginChange,
        riskScore: 15,
        transitDays: best.transitDays,
        tariffRate: 0,
        advantages: ['No tariffs', 'Fast delivery', 'High quality control', 'Political stability', 'Easy communication'],
        disadvantages: ['Higher labor costs', 'Limited capacity for some products'],
        supplierName: best.supplierName,
        costPerUnit: best.costPerUnit,
        qualityScore: best.qualityScore,
        capacity: best.capacity,
        annualSavings: best.annualSavings,
        marginIncrease: best.marginChange
      });
    }

    if (naftaSuppliers.length > 0) {
      const best = naftaSuppliers[0];
      options.push({
        type: 'international',
        country: `${best.country} (NAFTA/USMCA)`,
        estimatedMargin: 42.2 + best.marginChange,
        riskScore: 25,
        transitDays: best.transitDays,
        tariffRate: best.tariffRate,
        advantages: ['Lower costs than domestic', 'NAFTA benefits', 'Good logistics', 'Established suppliers'],
        disadvantages: ['Some tariffs', 'Longer transit', 'Currency fluctuation'],
        supplierName: best.supplierName,
        costPerUnit: best.costPerUnit,
        qualityScore: best.qualityScore,
        capacity: best.capacity,
        annualSavings: best.annualSavings,
        marginIncrease: best.marginChange
      });
    }

    if (internationalSuppliers.length > 0) {
      const best = internationalSuppliers[0];
      options.push({
        type: 'international',
        country: best.country,
        estimatedMargin: 48.5 + best.marginChange,
        riskScore: 45,
        transitDays: best.transitDays,
        tariffRate: best.tariffRate,
        advantages: ['Very competitive costs', 'Growing manufacturing base', 'Good for electronics'],
        disadvantages: ['Higher tariffs', 'Long transit times', 'Quality control challenges'],
        supplierName: best.supplierName,
        costPerUnit: best.costPerUnit,
        qualityScore: best.qualityScore,
        capacity: best.capacity,
        annualSavings: best.annualSavings,
        marginIncrease: best.marginChange
      });
    }

    return options;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Sourcing Intelligence Overview</h1>
              <p className="text-gray-600 mt-1">
                Monitor supply chain risks and explore sourcing alternatives
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-900">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        {isLoadingKPIs ? (
          <LoadingShimmer type="kpi-cards" className="mb-8" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total SKUs</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{totalSKUs.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">↑ 12% vs last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Risk</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">{highRiskPercentage}%</p>
                  <p className="text-sm text-red-600 mt-1">↑ 8% vs last month</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">At Risk</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">${(totalAtRisk / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-red-600 mt-1">↑ $2.1M vs last quarter</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Risk</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-2">72</p>
                  <p className="text-sm text-red-600 mt-1">↑ 5 points vs last month</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Search */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-sm" ref={searchRef}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">SKU & Product Search</h2>
            <p className="text-sm text-gray-600">
              Search existing SKUs or explore sourcing options for new products
            </p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by SKU ID, product name, or category..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {/* Search Results Dropdown */}
            {(showResults || isSearching) && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                {isSearching ? (
                  <LoadingShimmer type="search-results" />
                ) : searchResults.length > 0 ? (
                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-2 px-2">Found {searchResults.length} existing SKUs:</p>
                    {searchResults.map((sku) => (
                      <div
                        key={sku.id}
                        onClick={() => handleSKUClick(sku)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded-lg border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{sku.name}</p>
                              <p className="text-xs text-gray-500">{sku.id} • {sku.category} • {sku.origin}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${sku.isDomestic ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                                  {sku.isDomestic ? 'Domestic' : 'International'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Margin: {sku.currentMargin.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              ${(sku.spend / 1000000).toFixed(1)}M
                            </p>
                            <p className="text-xs text-gray-500">Annual Spend</p>
                          </div>
                          <RiskScore score={sku.totalRisk} />
                          <ActionPill action={sku.action} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchTerm.length > 2 && searchResults.length === 0 ? (
                  <div className="border-t border-gray-200 p-4 bg-blue-50">
                    <p className="text-sm text-blue-700 mb-3 font-medium">
                      New Product Sourcing Options for: "{searchTerm}"
                    </p>
                    <div className="space-y-3">
                      {getNewSKUOptions(searchTerm).map((option, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                option.type === 'domestic' 
                                  ? 'bg-green-50 text-green-700 border border-green-200' 
                                  : 'bg-orange-50 text-orange-700 border border-orange-200'
                              }`}>
                                {option.type === 'domestic' ? 'Domestic' : 'International'}
                              </span>
                              <span className="text-sm font-medium text-gray-900">{option.country}</span>
                            </div>
                            <RiskScore score={option.riskScore} />
                          </div>
                          
                          <div className="grid grid-cols-5 gap-4 mb-3">
                            <div className="flex items-center space-x-1">
                              <Percent className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-600">Margin:</span>
                              <span className="text-sm font-medium text-green-600">{option.estimatedMargin.toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-gray-600">Transit:</span>
                              <span className="text-sm font-medium text-gray-900">{option.transitDays} days</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-gray-600">Tariff:</span>
                              <span className="text-sm font-medium text-gray-900">{option.tariffRate}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-600">Savings:</span>
                              <span className="text-sm font-medium text-green-600">
                                {option.annualSavings ? formatCurrency(option.annualSavings) : 'N/A'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-600">CO₂:</span>
                              <span className="text-sm font-medium text-gray-900">
                                {option.carbonFootprint || (option.type === 'domestic' ? '2.1' : '8.5')}t
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                              <p className="font-medium text-green-700 mb-1">Advantages:</p>
                              <ul className="space-y-1">
                                {option.advantages.slice(0, 2).map((advantage, i) => (
                                  <li key={i} className="text-green-600">• {advantage}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-red-700 mb-1">Considerations:</p>
                              <ul className="space-y-1">
                                {option.disadvantages.slice(0, 2).map((disadvantage, i) => (
                                  <li key={i} className="text-red-600">• {disadvantage}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-blue-700 mb-1">Environmental:</p>
                              <ul className="space-y-1">
                                <li className="text-blue-600">• Carbon: {option.carbonFootprint || (option.type === 'domestic' ? '2.1' : '8.5')}t CO₂</li>
                                <li className="text-blue-600">• {option.environmentalImpact || (option.type === 'domestic' ? 'Low shipping emissions' : 'Higher logistics impact')}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* High Risk Categories Table */}
        {isLoadingCategories ? (
          <LoadingShimmer type="category-table" className="mb-8" />
        ) : (
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">High-Risk Categories</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Categories requiring immediate attention (Risk ≥ 70)
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filtered: High Risk Only</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      High-Risk Countries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      $ at Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action Required
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {highRiskCategories.filter(category => category.riskScore >= 70 && category.action !== 'maintain').map((category, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-1 h-8 bg-red-500 rounded-full mr-3"></div>
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {category.highRiskCountries.map((country, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200"
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {country}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <RiskScore score={category.riskScore} showLabel />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          ${(category.amountAtRisk / 1000000).toFixed(1)}M
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ActionPill action={category.action} />
                      </td>
                    </tr>
                  ))}
                  {highRiskCategories.filter(category => category.riskScore >= 70 && category.action !== 'maintain').length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center">
                          <Package className="h-12 w-12 text-green-400 mb-4" />
                          <p className="text-lg font-medium text-green-600">All Categories Low Risk</p>
                          <p className="text-sm text-gray-500">No categories currently require immediate action</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SKU Forecast Modal */}
        {selectedSKU && (
          <SKUForecastModal
            sku={selectedSKU}
            isOpen={!!selectedSKU}
            onClose={() => setSelectedSKU(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
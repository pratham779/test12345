import React, { useState } from 'react';
import { Bell, Download, Plus, Trash2, Edit3 } from 'lucide-react';
import { Alert } from '../types';
import { 
  exportHighRiskSKUsToCSV, 
  exportCategoryAnalysisToCSV, 
  exportSupplierAlternativesToCSV, 
  generateExecutiveSummaryPDF 
} from '../utils/exportUtils';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      condition: 'SKU Risk Score',
      threshold: 80,
      email: 'sourcing@walmart.com',
      isActive: true
    },
    {
      id: '2',
      condition: 'Category Risk Change',
      threshold: 15,
      email: 'supply-chain@walmart.com',
      isActive: true
    },
    {
      id: '3',
      condition: 'Tariff Rate Increase',
      threshold: 10,
      email: 'risk-team@walmart.com',
      isActive: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const [formData, setFormData] = useState({
    condition: 'SKU Risk Score',
    threshold: 80,
    email: '',
    isActive: true
  });

  const conditionOptions = [
    'SKU Risk Score',
    'Category Risk Change',
    'Tariff Rate Increase',
    'Geo Risk Score',
    'Supplier Risk Change'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAlert) {
      setAlerts(alerts.map(alert => 
        alert.id === editingAlert.id 
          ? { ...alert, ...formData }
          : alert
      ));
      setEditingAlert(null);
    } else {
      const newAlert: Alert = {
        id: Date.now().toString(),
        ...formData
      };
      setAlerts([...alerts, newAlert]);
    }
    
    setFormData({
      condition: 'SKU Risk Score',
      threshold: 80,
      email: '',
      isActive: true
    });
    setShowForm(false);
  };

  const handleEdit = (alert: Alert) => {
    setEditingAlert(alert);
    setFormData({
      condition: alert.condition,
      threshold: alert.threshold,
      email: alert.email,
      isActive: alert.isActive
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const exportToCSV = () => {
    exportHighRiskSKUsToCSV();
  };

  const exportToPDF = () => {
    generateExecutiveSummaryPDF();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Export</h1>
        <p className="text-gray-600 mt-2">
          Configure risk threshold notifications and export analysis reports
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts Management */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Risk Alerts</h2>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingAlert(null);
                  setFormData({
                    condition: 'SKU Risk Score',
                    threshold: 80,
                    email: '',
                    isActive: true
                  });
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Alert</span>
              </button>
            </div>

            <div className="p-6">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No alerts configured</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              alert.isActive ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {`${alert.condition} > ${alert.threshold}`}
                              {alert.condition.includes('Score') ? '' : '%'}
                            </p>
                            <p className="text-xs text-gray-500">{alert.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAlert(alert.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            alert.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {alert.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleEdit(alert)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Alert Form */}
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingAlert ? 'Edit Alert' : 'Create New Alert'}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {conditionOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Threshold
                  </label>
                  <input
                    type="number"
                    value={formData.threshold}
                    onChange={(e) => setFormData({ ...formData, threshold: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Active
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingAlert ? 'Update Alert' : 'Create Alert'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingAlert(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Export Reports</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">High-Risk SKUs Report</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  Export all SKUs with risk scores above 80 for immediate review
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={exportToCSV}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Export Detailed CSV
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="bg-white text-blue-600 border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                  >
                    Export Comprehensive PDF
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-900">Category Analysis</h3>
                </div>
                <p className="text-yellow-700 text-sm mb-4">
                  Comprehensive analysis by product category with risk trends
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={exportCategoryAnalysisToCSV}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    Export Detailed CSV
                  </button>
                  <button 
                    onClick={generateExecutiveSummaryPDF}
                    className="bg-white text-yellow-600 border border-yellow-300 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors text-sm"
                  >
                    Export Analysis PDF
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Supplier Alternatives</h3>
                </div>
                <p className="text-green-700 text-sm mb-4">
                  Alternative supplier recommendations with cost impact analysis
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={exportSupplierAlternativesToCSV}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Export Detailed CSV
                  </button>
                  <button 
                    onClick={generateExecutiveSummaryPDF}
                    className="bg-white text-green-600 border border-green-300 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm"
                  >
                    Export Strategy PDF
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">Executive Summary</h3>
                </div>
                <p className="text-purple-700 text-sm mb-4">
                  High-level summary with charts and recommendations for leadership
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={generateExecutiveSummaryPDF}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    Export Executive PDF
                  </button>
                  <button 
                    onClick={() => alert('Email scheduling feature would integrate with Walmart\'s internal email system')}
                    className="bg-white text-purple-600 border border-purple-300 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm"
                  >
                    Schedule Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Alerts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SKU, Category, Supplier } from '../types';
import { mockSKUs, mockCategories, mockSuppliers } from '../data/mockData';

export const exportHighRiskSKUsToCSV = () => {
  const highRiskSKUs = mockSKUs.filter(sku => sku.totalRisk >= 80);
  
  const headers = [
    'SKU ID',
    'Product Name',
    'Category',
    'Origin Country',
    'Annual Spend ($M)',
    'Current Margin (%)',
    'Tariff Impact (%)',
    'Geo Risk Score',
    'Total Risk Score',
    'Recommended Action',
    'Current Supplier',
    'HS Code',
    'Domestic Available',
    'Potential Annual Loss ($M)',
    'Sustainability Score',
    'Carbon Footprint (tons CO2)',
    'Quality Score',
    'Transit Days'
  ];

  const csvData = highRiskSKUs.map(sku => [
    sku.id,
    `"${sku.name}"`,
    sku.category,
    sku.origin,
    (sku.spend / 1000000).toFixed(2),
    sku.currentMargin.toFixed(1),
    sku.tariffImpact.toFixed(1),
    sku.geoRisk,
    sku.totalRisk,
    sku.action,
    `"${sku.currentSupplier}"`,
    sku.hsCode,
    sku.domesticAvailable ? 'Yes' : 'No',
    ((sku.spend * sku.tariffImpact) / 100 / 1000000).toFixed(2),
    sku.sustainabilityScore || 75,
    sku.carbonFootprint || 8.5,
    sku.qualityScore || 85,
    sku.transitDays || 20
  ]);

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');

  downloadCSV(csvContent, 'walmart-high-risk-skus-detailed.csv');
};

export const exportCategoryAnalysisToCSV = () => {
  const headers = [
    'Category',
    'Risk Score',
    'Amount at Risk ($M)',
    'High Risk Countries',
    'Low Risk Countries',
    'Recommended Action',
    'SKU Count',
    'Avg Margin (%)',
    'Total Annual Spend ($M)',
    'Avg Sustainability Score',
    'Total Carbon Footprint (tons)',
    'Domestic Alternatives Available'
  ];

  const csvData = mockCategories.map(category => {
    const categorySKUs = mockSKUs.filter(sku => sku.category === category.name);
    const totalSpend = categorySKUs.reduce((sum, sku) => sum + sku.spend, 0);
    const avgMargin = categorySKUs.reduce((sum, sku) => sum + sku.currentMargin, 0) / categorySKUs.length;
    const avgSustainability = categorySKUs.reduce((sum, sku) => sum + (sku.sustainabilityScore || 75), 0) / categorySKUs.length;
    const totalCarbon = categorySKUs.reduce((sum, sku) => sum + (sku.carbonFootprint || 8.5), 0);
    const domesticAvailable = categorySKUs.filter(sku => sku.domesticAvailable).length;

    return [
      category.name,
      category.riskScore,
      (category.amountAtRisk / 1000000).toFixed(2),
      `"${category.highRiskCountries.join(', ')}"`,
      `"${category.lowRiskCountries.join(', ')}"`,
      category.action,
      categorySKUs.length,
      avgMargin.toFixed(1),
      (totalSpend / 1000000).toFixed(2),
      avgSustainability.toFixed(1),
      totalCarbon.toFixed(1),
      `${domesticAvailable}/${categorySKUs.length}`
    ];
  });

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');

  downloadCSV(csvContent, 'walmart-category-analysis-detailed.csv');
};

export const exportSupplierAlternativesToCSV = () => {
  const headers = [
    'Supplier Name',
    'Country/Location',
    'Supplier Type',
    'Margin Change (%)',
    'Annual Savings ($M)',
    'Tariff Rate (%)',
    'Transit Days',
    'Quality Score',
    'Sustainability Score',
    'Carbon Footprint (tons CO2)',
    'Environmental Rating',
    'Logistics Score',
    'Cost Per Unit ($)',
    'Capacity',
    'Recommended',
    'Risk Assessment'
  ];

  const csvData = mockSuppliers.map(supplier => [
    `"${supplier.supplierName}"`,
    `"${supplier.country}"`,
    supplier.supplierType,
    supplier.marginChange.toFixed(1),
    supplier.annualSavings ? (supplier.annualSavings / 1000000).toFixed(2) : '0',
    supplier.tariffRate.toFixed(1),
    supplier.transitDays,
    supplier.qualityScore,
    supplier.sustainabilityScore || 75,
    supplier.carbonFootprint || 8.5,
    supplier.environmentalRating || 'B',
    supplier.logisticsScore,
    supplier.costPerUnit.toFixed(2),
    supplier.capacity,
    supplier.isRecommended ? 'Yes' : 'No',
    supplier.isDomestic ? 'Low Risk' : supplier.supplierType === 'nafta' ? 'Medium Risk' : 'High Risk'
  ]);

  const csvContent = [
    headers.join(','),
    ...csvData.map(row => row.join(','))
  ].join('\n');

  downloadCSV(csvContent, 'walmart-supplier-alternatives-detailed.csv');
};

export const generateSourcingReportPDF = async (sku: SKU) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let currentY = 25;
  
  // Header with Walmart branding
  pdf.setFillColor(0, 113, 206); // Walmart blue
  pdf.rect(0, 0, pageWidth, 20, 'F');
  
  pdf.setFontSize(18);
  pdf.setTextColor(255, 255, 255);
  pdf.text('WALMART SOURCING INTELLIGENCE REPORT', 20, 12);
  
  // Reset text color
  pdf.setTextColor(0, 0, 0);
  currentY = 35;
  
  // SKU Header Section
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`SKU Analysis: ${sku.name}`, 20, currentY);
  currentY += 10;
  
  // SKU Details Box
  pdf.setFillColor(245, 245, 245);
  pdf.rect(15, currentY - 5, pageWidth - 30, 35, 'F');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`SKU ID: ${sku.id}`, 20, currentY + 5);
  pdf.text(`Category: ${sku.category}`, 20, currentY + 12);
  pdf.text(`Current Origin: ${sku.origin}`, 20, currentY + 19);
  pdf.text(`Annual Spend: $${(sku.spend / 1000000).toFixed(1)}M`, 20, currentY + 26);
  
  pdf.text(`Current Margin: ${sku.currentMargin.toFixed(1)}%`, 120, currentY + 5);
  pdf.text(`Risk Score: ${sku.totalRisk}`, 120, currentY + 12);
  pdf.text(`Tariff Impact: ${sku.tariffImpact}%`, 120, currentY + 19);
  pdf.text(`Recommended Action: ${sku.action.toUpperCase()}`, 120, currentY + 26);
  
  currentY += 45;

  // Risk Assessment Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 113, 206);
  pdf.text('RISK ASSESSMENT', 20, currentY);
  currentY += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  const riskLevel = sku.totalRisk >= 80 ? 'HIGH RISK' : sku.totalRisk >= 60 ? 'MEDIUM RISK' : 'LOW RISK';
  const riskColor = sku.totalRisk >= 80 ? [220, 38, 38] : sku.totalRisk >= 60 ? [245, 158, 11] : [34, 197, 94];
  
  pdf.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Risk Level: ${riskLevel}`, 20, currentY);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'normal');
  currentY += 8;
  
  const riskText = `This SKU has a total risk score of ${sku.totalRisk}. Primary risk factors include tariff exposure of ${sku.tariffImpact}% and geopolitical risk score of ${sku.geoRisk}. ${sku.isDomestic ? 'As a domestic product, it has minimal supply chain risk.' : 'International sourcing presents elevated risks due to trade policy volatility.'}`;
  
  const splitRiskText = pdf.splitTextToSize(riskText, pageWidth - 40);
  pdf.text(splitRiskText, 20, currentY);
  currentY += splitRiskText.length * 5 + 10;

  // Financial Impact Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 113, 206);
  pdf.text('FINANCIAL IMPACT ANALYSIS', 20, currentY);
  currentY += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  const potentialLoss = (sku.spend * sku.tariffImpact) / 100;
  
  // Financial metrics in boxes
  const boxWidth = 80;
  const boxHeight = 25;
  
  // Current Exposure Box
  pdf.setFillColor(254, 242, 242);
  pdf.rect(20, currentY, boxWidth, boxHeight, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.text('Current Annual Exposure', 25, currentY + 8);
  pdf.setFontSize(12);
  pdf.setTextColor(220, 38, 38);
  pdf.text(`$${(potentialLoss / 1000000).toFixed(1)}M`, 25, currentY + 18);
  
  // Margin Impact Box
  pdf.setFillColor(255, 247, 237);
  pdf.rect(110, currentY, boxWidth, boxHeight, 'F');
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Current Margin', 115, currentY + 8);
  pdf.setFontSize(12);
  pdf.setTextColor(34, 197, 94);
  pdf.text(`${sku.currentMargin.toFixed(1)}%`, 115, currentY + 18);
  
  currentY += 35;

  // Sustainability Metrics
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 113, 206);
  pdf.text('SUSTAINABILITY METRICS', 20, currentY);
  currentY += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  const sustainabilityScore = sku.sustainabilityScore || 75;
  const carbonFootprint = sku.carbonFootprint || 8.5;
  
  pdf.text(`Sustainability Score: ${sustainabilityScore}/100`, 25, currentY);
  pdf.text(`Carbon Footprint: ${carbonFootprint} tons CO2 annually`, 25, currentY + 8);
  pdf.text(`Environmental Rating: ${sku.environmentalRating || 'B'}`, 25, currentY + 16);
  
  currentY += 30;

  // Supplier Alternatives (if high risk)
  if (sku.totalRisk >= 60) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 113, 206);
    pdf.text('RECOMMENDED SUPPLIER ALTERNATIVES', 20, currentY);
    currentY += 10;
    
    // Get relevant suppliers based on SKU type and filter for high-risk SKUs
    const getRelevantSuppliers = (sku: SKU) => {
      // Get suppliers based on SKU ID for realistic alternatives
      const skuSupplierMap: { [key: string]: string[] } = {
        'WM001': ['SUP002', 'SUP003'], // Samsung TV
        'WM002': ['SUP001'], // iPhone (very limited alternatives)
        'WM004': ['SUP004', 'SUP005'], // Earbuds
        'WM006': ['SUP006', 'SUP007'], // T-Shirts
        'WM008': ['SUP008', 'SUP009'], // Jeans
        'WM011': ['SUP010'], // Kitchen Knives
        'WM021': ['SUP011', 'SUP012'], // Tires
        // Add generic alternatives for other SKUs
        'WM005': ['SUP013'], // TCL TV
        'WM014': ['SUP013'], // Storage Unit
      };
      
      const supplierIds = skuSupplierMap[sku.id] || [];
      if (supplierIds.length === 0 && sku.totalRisk < 70) return [];
      
      // If no specific alternatives and high risk, show generic alternatives
      if (supplierIds.length === 0 && sku.totalRisk >= 70) {
        return mockSuppliers.filter(s => s.isDomestic).slice(0, 2);
      }
      
      return mockSuppliers.filter(supplier => supplierIds.includes(supplier.id));
    };
    
    const relevantSuppliers = getRelevantSuppliers(sku).sort((a, b) => {
      // Prioritize domestic, then NAFTA, then international
      if (a.isDomestic && !b.isDomestic) return -1;
      if (!a.isDomestic && b.isDomestic) return 1;
      if (a.supplierType === 'nafta' && b.supplierType === 'international') return -1;
      if (a.supplierType === 'international' && b.supplierType === 'nafta') return 1;
      return b.marginChange - a.marginChange;
    });

    const alternatives = relevantSuppliers.slice(0, 3);

    alternatives.forEach((supplier, index) => {
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        currentY = 25;
      }
      
      pdf.setFillColor(248, 250, 252);
      pdf.rect(20, currentY - 2, pageWidth - 40, 30, 'F');
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${index + 1}. ${supplier.supplierName} (${supplier.country})`, 25, currentY + 8);
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`• Margin Impact: ${supplier.marginChange > 0 ? '+' : ''}${supplier.marginChange.toFixed(1)}%`, 30, currentY + 16);
      pdf.text(`• Transit Time: ${supplier.transitDays} days`, 30, currentY + 22);
      
      pdf.text(`• Quality Score: ${supplier.qualityScore}`, 120, currentY + 16);
      pdf.text(`• Sustainability: ${supplier.sustainabilityScore || 85}`, 120, currentY + 22);
      
      currentY += 35;
    });
  }

  // Strategic Recommendations
  if (currentY > pageHeight - 60) {
    pdf.addPage();
    currentY = 25;
  }
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 113, 206);
  pdf.text('STRATEGIC RECOMMENDATIONS', 20, currentY);
  currentY += 10;
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  const recommendations = sku.totalRisk >= 80 ? [
    '1. IMMEDIATE ACTION: Shift to domestic suppliers to eliminate tariff risk',
    '2. Develop strategic partnerships with NAFTA suppliers as backup options',
    '3. Implement quarterly risk assessment reviews',
    '4. Focus on suppliers with high sustainability scores (>85)',
    '5. Negotiate long-term contracts to lock in favorable rates'
  ] : sku.totalRisk >= 60 ? [
    '1. Monitor current supplier performance closely',
    '2. Develop contingency plans with alternative suppliers',
    '3. Consider gradual shift to lower-risk options',
    '4. Improve sustainability metrics in supplier selection'
  ] : [
    '1. Maintain current sourcing strategy',
    '2. Continue monitoring for any risk changes',
    '3. Optimize for sustainability improvements',
    '4. Leverage current position for better terms'
  ];
  
  recommendations.forEach(rec => {
    const splitText = pdf.splitTextToSize(rec, pageWidth - 40);
    pdf.text(splitText, 25, currentY);
    currentY += splitText.length * 5 + 3;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(`Generated on ${new Date().toLocaleDateString()} | Walmart Sourcing Intelligence | Confidential`, 20, pageHeight - 10);

  pdf.save(`walmart-sourcing-report-${sku.id}.pdf`);
};

export const generateExecutiveSummaryPDF = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let currentY = 25;
  
  // Header with Walmart branding
  pdf.setFillColor(0, 113, 206);
  pdf.rect(0, 0, pageWidth, 25, 'F');
  
  pdf.setFontSize(20);
  pdf.setTextColor(255, 255, 255);
  pdf.text('EXECUTIVE SUMMARY', 20, 12);
  pdf.setFontSize(14);
  pdf.text('Sourcing Risk Assessment & Strategic Recommendations', 20, 20);
  
  pdf.setTextColor(0, 0, 0);
  currentY = 40;
  
  // Key Performance Indicators
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('KEY PERFORMANCE INDICATORS', 20, currentY);
  currentY += 15;
  
  const highRiskSKUs = mockSKUs.filter(sku => sku.totalRisk >= 80);
  const totalAtRisk = mockCategories.reduce((sum, cat) => sum + cat.amountAtRisk, 0);
  const avgSustainability = mockSKUs.reduce((sum, sku) => sum + (sku.sustainabilityScore || 75), 0) / mockSKUs.length;
  
  // KPI Boxes
  const kpiData = [
    { label: 'Total SKUs Monitored', value: mockSKUs.length.toString(), color: [59, 130, 246] },
    { label: 'High-Risk SKUs', value: `${highRiskSKUs.length} (${Math.round((highRiskSKUs.length / mockSKUs.length) * 100)}%)`, color: [220, 38, 38] },
    { label: 'Total Exposure', value: `$${(totalAtRisk / 1000000).toFixed(1)}M`, color: [245, 158, 11] },
    { label: 'Avg Sustainability Score', value: `${avgSustainability.toFixed(1)}/100`, color: [34, 197, 94] }
  ];
  
  kpiData.forEach((kpi, index) => {
    const x = 20 + (index % 2) * 85;
    const y = currentY + Math.floor(index / 2) * 35;
    
    pdf.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
    pdf.rect(x, y, 80, 25, 'F');
    
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text(kpi.label, x + 5, y + 8);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(kpi.value, x + 5, y + 18);
  });
  
  currentY += 80;

  // Strategic Recommendations
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 113, 206);
  pdf.text('STRATEGIC RECOMMENDATIONS', 20, currentY);
  currentY += 15;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  
  const executiveRecommendations = [
    '1. IMMEDIATE PRIORITY: Shift high-risk Electronics and Apparel sourcing to domestic suppliers',
    '2. SUSTAINABILITY FOCUS: Prioritize suppliers with sustainability scores >85 to meet ESG goals',
    '3. RISK MITIGATION: Implement quarterly risk assessment reviews for all international suppliers',
    '4. STRATEGIC PARTNERSHIPS: Develop long-term relationships with NAFTA suppliers as intermediate risk option',
    '5. SUPPLY CHAIN DIVERSIFICATION: Reduce single-country dependencies, especially in high-risk categories',
    '6. COST OPTIMIZATION: Leverage domestic sourcing advantages to improve margins while reducing risk'
  ];
  
  executiveRecommendations.forEach(rec => {
    const splitText = pdf.splitTextToSize(rec, pageWidth - 40);
    pdf.text(splitText, 25, currentY);
    currentY += splitText.length * 6 + 5;
  });

  // Category Risk Analysis
  currentY += 10;
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 113, 206);
  pdf.text('CATEGORY RISK ANALYSIS', 20, currentY);
  currentY += 15;
  
  mockCategories.forEach(category => {
    if (currentY > pageHeight - 30) {
      pdf.addPage();
      currentY = 25;
    }
    
    const riskColor = category.riskScore >= 80 ? [220, 38, 38] : category.riskScore >= 60 ? [245, 158, 11] : [34, 197, 94];
    
    pdf.setFillColor(riskColor[0], riskColor[1], riskColor[2]);
    pdf.rect(20, currentY - 2, 5, 15, 'F');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${category.name} - Risk Score: ${category.riskScore}`, 30, currentY + 5);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Amount at Risk: $${(category.amountAtRisk / 1000000).toFixed(1)}M | Action: ${category.action.toUpperCase()}`, 30, currentY + 12);
    
    currentY += 20;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(`Generated on ${new Date().toLocaleDateString()} | Walmart Sourcing Intelligence | Confidential`, 20, pageHeight - 10);

  pdf.save('walmart-executive-summary.pdf');
};

const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
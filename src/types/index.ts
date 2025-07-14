export interface SKU {
  id: string;
  name: string;
  category: string;
  origin: string;
  spend: number;
  tariffImpact: number;
  geoRisk: number;
  totalRisk: number;
  action: 'shift' | 'monitor' | 'maintain';
  isDomestic: boolean;
  currentMargin: number;
  domesticAvailable: boolean;
  currentSupplier: string;
  hsCode: string;
  sustainabilityScore?: number;
  carbonFootprint?: number;
  environmentalRating?: 'A' | 'B' | 'C' | 'D';
  qualityScore?: number;
  transitDays?: number;
}

export interface Category {
  name: string;
  highRiskCountries: string[];
  lowRiskCountries: string[];
  riskScore: number;
  amountAtRisk: number;
  action: 'shift' | 'monitor' | 'maintain';
}

export interface Supplier {
  id: string;
  country: string;
  marginChange: number;
  distance: number;
  transitDays: number;
  logisticsScore: number;
  isRecommended: boolean;
  isDomestic: boolean;
  tariffRate: number;
  supplierType: 'domestic' | 'nafta' | 'international';
  supplierName: string;
  capacity: string;
  qualityScore: number;
  costPerUnit: number;
  annualSavings?: number;
  marginIncrease?: number;
  sustainabilityScore?: number;
  carbonFootprint?: number;
  environmentalRating?: 'A' | 'B' | 'C' | 'D';
}

export interface TariffData {
  date: string;
  rate: number;
  event?: string;
}

export interface Alert {
  id: string;
  condition: string;
  threshold: number;
  email: string;
  isActive: boolean;
}

export interface NewSKUOption {
  type: 'domestic' | 'international';
  country: string;
  estimatedMargin: number;
  riskScore: number;
  transitDays: number;
  tariffRate: number;
  advantages: string[];
  disadvantages: string[];
  supplierName: string;
  costPerUnit: number;
  qualityScore: number;
  capacity: string;
  annualSavings?: number;
  marginIncrease?: number;
  sustainabilityScore?: number;
  carbonFootprint?: number;
  environmentalImpact?: string;
}
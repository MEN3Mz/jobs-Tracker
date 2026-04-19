const getAiefIndustryGroup = (industry = '') => {
  const normalized = industry.trim().toLowerCase();

  if (!normalized) return 'Other';

  if (
    normalized.includes('software') ||
    normalized.includes('technology') ||
    normalized.includes('digital') ||
    normalized.includes('information') ||
    normalized.includes('media technology')
  ) {
    return 'Technology & Software';
  }

  if (
    normalized.includes('real estate') ||
    normalized.includes('realestate') ||
    normalized.includes('real-estate') ||
    normalized.includes('architecture') ||
    normalized.includes('urban planning') ||
    normalized.includes('landscape') ||
    normalized.includes('interior design') ||
    normalized.includes('furniture')
  ) {
    return 'Real Estate & Architecture';
  }

  if (
    normalized.includes('engineering') ||
    normalized.includes('electric') ||
    normalized.includes('manufacturing')
  ) {
    return 'Engineering & Manufacturing';
  }

  if (
    normalized.includes('fmcg') ||
    normalized.includes('home appliances')
  ) {
    return 'FMCG & Consumer Goods';
  }

  if (
    normalized.includes('consult') ||
    normalized.includes('microfinance') ||
    normalized.includes('business')
  ) {
    return 'Consulting & Business Services';
  }

  if (
    normalized.includes('marketing') ||
    normalized.includes('creative')
  ) {
    return 'Marketing & Creative';
  }

  if (normalized.includes('legal')) {
    return 'Legal';
  }

  if (normalized.includes('logistics')) {
    return 'Logistics & Supply Chain';
  }

  if (normalized.includes('travel') || normalized.includes('concierge')) {
    return 'Travel & Hospitality';
  }

  if (normalized.includes('agri')) {
    return 'Agriculture';
  }

  return 'Other';
};

module.exports = getAiefIndustryGroup;

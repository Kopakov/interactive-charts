import { HealthScoreData, Category, Subcategory } from '../types/healthScore';

const COLORS = {
  poor: '#FF0000', // Red
  belowAverage: '#FF4500', // Orange Red
  average: '#FFA500', // Orange
  aboveAverage: '#FFD700', // Gold
  good: '#9ACD32', // Yellow Green
  excellent: '#008000' // Green
};

export const getColorForScore = (score: number): string => {
  if (score < 20) return COLORS.poor;
  if (score < 40) return COLORS.belowAverage;
  if (score < 60) return COLORS.average;
  if (score < 80) return COLORS.aboveAverage;
  if (score < 90) return COLORS.good;
  return COLORS.excellent;
};

const calculateCategoryScore = (subcategories: Subcategory[]): number => {
  const sum = subcategories.reduce((acc, sub) => acc + sub.score, 0);
  return Math.round(sum / subcategories.length);
};

export const calculateOverallScore = (data: HealthScoreData): number => {
  let totalScore = 0;
  let totalItems = 0;

  // Calculate weighted average based on category importance
  const categoryWeights = {
    sleep: 1.2,
    riskFactors: 1.1,
    bloodPressure: 1.3,
    nutrition: 1.4,
    wellbeing: 1.2,
    physicalActivity: 1.3,
    bodyData: 1.1
  };

  Object.entries(data).forEach(([category, values]) => {
    const weight = categoryWeights[category as keyof typeof categoryWeights];
    Object.values(values as Record<string, number>).forEach(score => {
      totalScore += score * weight;
      totalItems += weight;
    });
  });

  return Math.round(totalScore / totalItems);
};

export const transformDataToCategories = (data: HealthScoreData): Category[] => {
  const createCategory = (name: string, subcategories: Subcategory[]): Category => {
    const score = calculateCategoryScore(subcategories);
    return {
      name,
      score,
      color: getColorForScore(score),
      subcategories
    };
  };

  return [
    createCategory('SLEEP', [
      { name: 'Quality', score: data.sleep.quality, color: getColorForScore(data.sleep.quality) },
      { name: 'Duration', score: data.sleep.duration, color: getColorForScore(data.sleep.duration) }
    ]),
    createCategory('RISK FACTORS', [
      { name: 'Frequency', score: data.riskFactors.frequency, color: getColorForScore(data.riskFactors.frequency) },
      { name: 'Quantity', score: data.riskFactors.quantity, color: getColorForScore(data.riskFactors.quantity) }
    ]),
    createCategory('BLOOD PRESSURE', [
      { name: 'Systolic', score: data.bloodPressure.systolic, color: getColorForScore(data.bloodPressure.systolic) },
      { name: 'Diastolic', score: data.bloodPressure.diastolic, color: getColorForScore(data.bloodPressure.diastolic) }
    ]),
    createCategory('NUTRITION', [
      { name: 'Sugary Drinks', score: data.nutrition.sugaryDrinks, color: getColorForScore(data.nutrition.sugaryDrinks) },
      { name: 'Vegetables', score: data.nutrition.vegetables, color: getColorForScore(data.nutrition.vegetables) },
      { name: 'Fruits', score: data.nutrition.fruits, color: getColorForScore(data.nutrition.fruits) },
      { name: 'Whole Grains', score: data.nutrition.wholeGrains, color: getColorForScore(data.nutrition.wholeGrains) },
      { name: 'Protein', score: data.nutrition.protein, color: getColorForScore(data.nutrition.protein) },
      { name: 'Dairy', score: data.nutrition.dairy, color: getColorForScore(data.nutrition.dairy) }
    ]),
    createCategory('WELLBEING', [
      { name: 'Mental Wellbeing', score: data.wellbeing.mentalWellbeing, color: getColorForScore(data.wellbeing.mentalWellbeing) },
      { name: 'Tobacco Use', score: data.wellbeing.tobaccoUse, color: getColorForScore(data.wellbeing.tobaccoUse) }
    ]),
    createCategory('PHYSICAL ACTIVITY', [
      { name: 'Intensity', score: data.physicalActivity.intensity, color: getColorForScore(data.physicalActivity.intensity) },
      { name: 'Minutes', score: data.physicalActivity.minutes, color: getColorForScore(data.physicalActivity.minutes) }
    ]),
    createCategory('BODY DATA', [
      { name: 'BMI', score: data.bodyData.bmi, color: getColorForScore(data.bodyData.bmi) },
      { name: 'Waist Circumference', score: data.bodyData.waistCircumference, color: getColorForScore(data.bodyData.waistCircumference) }
    ])
  ];
}; 
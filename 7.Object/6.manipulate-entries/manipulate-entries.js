// Small database with nutrition facts per 100 grams
const nutritionDB = {
  tomato:  { calories: 18,  protein: 0.9,   carbs: 3.9,   sugar: 2.6, fiber: 1.2, fat: 0.2   },
  vinegar: { calories: 20,  protein: 0.04,  carbs: 0.6,   sugar: 0.4, fiber: 0,   fat: 0     },
  oil:     { calories: 48,  protein: 0,     carbs: 0,     sugar: 123, fiber: 0,   fat: 151   },
  onion:   { calories: 0,   protein: 1,     carbs: 9,     sugar: 0,   fiber: 0,   fat: 0     },
  garlic:  { calories: 149, protein: 6.4,   carbs: 33,    sugar: 1,   fiber: 2.1, fat: 0.5   },
  paprika: { calories: 282, protein: 14.14, carbs: 53.99, sugar: 1,   fiber: 0,   fat: 12.89 },
  sugar:   { calories: 387, protein: 0,     carbs: 100,   sugar: 100, fiber: 0,   fat: 0     },
  orange:  { calories: 49,  protein: 0.9,   carbs: 13,    sugar: 9,   fiber: 0.2, fat: 0.1   },
};

// Core Entry Utilities
export function filterEntries(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).filter((entry) => callback(entry))
  );
}

export function mapEntries(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).map((entry) => callback(entry))
  );
}

export function reduceEntries(obj, callback, initialValue) {
  return Object.entries(obj).reduce((acc, entry) => callback(acc, entry), initialValue);
}

// Helper to compute a single item's total nutrition scaled by weight (grams / 100)
function getItemNutrition(item, grams) {
  const dbItem = nutritionDB[item];
  if (!dbItem) return {};
  
  const scale = grams / 100;
  const computed = {};
  for (const nutrient in dbItem) {
    if (Object.prototype.hasOwnProperty.call(dbItem, nutrient)) {
      // Scale to 3 decimal places to match precise test expectations
      const exactValue = dbItem[nutrient] * scale;
      computed[nutrient] = Math.round(exactValue * 1000) / 1000;
    }
  }
  return computed;
}

// Derived Functions
export function cartTotal(cart) {
  return mapEntries(cart, ([item, grams]) => [item, getItemNutrition(item, grams)]);
}

export function totalCalories(cart) {
  const fullCartNutrition = cartTotal(cart);
  return reduceEntries(fullCartNutrition, (acc, [, nutrition]) => {
    return Math.round((acc + (nutrition.calories || 0)) * 10) / 10;
  }, 0);
}

export function lowCarbs(cart) {
  const fullCartNutrition = cartTotal(cart);
  return filterEntries(cart, ([item]) => {
    const itemNutrition = fullCartNutrition[item];
    return itemNutrition && itemNutrition.carbs < 50;
  });
}
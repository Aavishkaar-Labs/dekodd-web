// Data access layer — replace static imports with async fetches in the future:
// const funds = await getMutualFunds();
// const stocks = await getUSStocks();
// const strategies = await getAgeStrategies();

export { mutualFunds } from './mutualFunds';
export type { MutualFund } from './mutualFunds';

export { usStocks } from './usStocks';
export type { USStock } from './usStocks';

export { ageStrategies } from './investmentStrategies';
export type { AgeStrategy, AgeRange } from './investmentStrategies';

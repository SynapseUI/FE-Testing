import defaultHelperFunc from "./defaultExportHelper";
import { namedHelperFunc } from "./namedExportHelper";


export const functionUsingNamedHelper = (num1, num2) => {
  const res = namedHelperFunc(num1, num2);
  return res;
};


export const functionUsingDefaultHelper = (num1, num2) => {
  const res = defaultHelperFunc(num1, num2);
  return res;
};


export const functionUsingGlobalModule = (obj) => {
  let res = { ...obj };
  res.dateAdded = new Date()
  return res;
};
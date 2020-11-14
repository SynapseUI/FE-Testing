// -----------------------------------------------------------------------------------------
// ------------------------------ Importing Functions to Test ------------------------------
// -----------------------------------------------------------------------------------------

import {
  functionUsingNamedHelper,
  functionUsingDefaultHelper,
  functionUsingGlobalModule,
} from './exampleTestFunctions';

// -----------------------------------------------------------------------------------------
// --------------------------------- Import those helpers ----------------------------------
// -----------------------------------------------------------------------------------------

import { namedHelperFunc } from './namedExportHelper';
import defaultHelperFunction from './defaultExportHelper';
import defaultHelperFunc from './defaultExportHelper';

// -----------------------------------------------------------------------------------------
// ----------------------------------- Writing the mocks -----------------------------------
// -----------------------------------------------------------------------------------------

/**
 * we can use jest.mock to tell jest that when we run our test suite, dont use the original
 * helper function, use the mock function we define. 
 * 
 * the function is defined as part of the second argument passed to jest.mock, which is the
 * moduleFactory. syntactically, this will work for a default export because we are
 * returning the jest.fn mock function directly
 */
jest.mock(
  './defaultExportHelper.js',
  () => jest.fn((num1, num2) => 99)
);

/**
 * notice here that the second argument function passed to jest.mock, the moduleFactory
 * is returning an object with a key that matches our named import. the value on that
 * key is the mock function returned from jest.fn
 */
jest.mock(
  './namedExportHelper.js',
  () => ({
    namedHelperFunc: jest.fn((num1, num2) => 42),
  })
);

/**
 * Mocking gloabl Date constructor here using jest.spyOn
 * [Mokcing Date Constructor with jest]{@link https://stackoverflow.com/questions/28504545/how-to-mock-a-constructor-like-new-date}
 */
const mockDate = new Date(0);
const spyDate = jest
  .spyOn(global, 'Date')
  .mockImplementation(() => mockDate)


afterEach(() => {
  /**
   * resets number of times all mocks have been called to 0 so we dont
   * have to keep track manually
   */
  jest.clearAllMocks()
});

// -----------------------------------------------------------------------------------------
// ----------------------------------- The Actual Tests ------------------------------------
// -----------------------------------------------------------------------------------------


/**
 * in the moduleFactor above for mocking the namedHelper, we tell jest.fn to always
 * return 42, so even though the named helper multiplies the two numbers, we know that
 * in this test file, we will always get 42 returned.
 */
describe('testing function that uses a named import', () => {
  it('should return the return value of namedHelperFunc', () => {
    expect(functionUsingNamedHelper(100, 100)).toBe(42);
  });

  it('should call namedHelperFunc when executing', () => {
    namedHelperFunc(100, 100);
    expect(namedHelperFunc).toHaveBeenCalledTimes(1);
  });
});

/**
 * again, we tell jest.fn to always return the same number, this time, 99
 */
describe('testing function that uses a default import', () => {
  it('should return the return value of namedHelperFunc', () => {
    expect(functionUsingDefaultHelper(100, 100)).toBe(99);
  });

  it('should call defaultHelperFunc when executing', () => {
    defaultHelperFunc(100, 100);
    expect(defaultHelperFunc).toHaveBeenCalledTimes(1);
  });
});

/**
 * functionUsingGlobalModule uses new Date() - which will create a js date object with
 * the time the constructor was invoked, which, for testing purposes, will be incosistent.
 * we want to know exactly what the date object will be in our testing environment.
 */
describe('testing function that uses a global module', () => {
  it('add a dateAdded key value pair onto the passed object', () => {
    expect(functionUsingGlobalModule({})).toEqual({ dateAdded: new Date(0) });
  });
});

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string | null | undefined): string | null | undefined => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Removes separators from a string and converts it to title case.
 * @param str The string to process.
 * @returns The title cased string.
 */
export const removeSeparator = (str: string): string => {
  return str.split("_").filter(Boolean).join(" ");
};

/**
 * Checks if a str is null or empty and returns a string.
 * @param str The str to check.
 * @returns The checked str or a placeholder.
 */
export const isNull = (str: string | null): string => {
  return str === null || str === undefined ? "N/A" : str.toString();
};

/**
 * Converts height in inches to feet and inches.
 * @param {number} inches - The height in inches.
 * @returns {string} The height in feet and inches.
 */
export const convertHeightToFeet = (inches: number): string | null => {
  if (inches === 0) return null;
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}ft ${remainingInches}in`;
};

/**
 * Converts weight into a string.
 * @param {number} weight - The weight in pounds.
 * @returns {string | null} The weight in pounds.
 */
export const convertWeight = (weight: number): string | null => {
  if (weight === 0) return null;
  return `${weight} lbs`;
};

/**
 * Finds the longest string from a list of strings.
 * @param str1 The first string.
 * @param str2 The second string.
 * @param str3 The third string.
 * @returns The longest string.
 */
export const findLonestDetail = (
  str1: string | null,
  str2: string | null,
  str3: string | null,
): string => {
  // Handle null values (if needed)
  str1 = str1 || "";
  str2 = str2 || "";
  str3 = str3 || "";

  // Compare lengths
  const length1: number = str1.length;
  const length2: number = str2.length;
  const length3: number = str3.length;

  if (length1 >= length2 && length1 >= length3) return str1;
  if (length2 >= length1 && length2 >= length3) return str2;

  return str3;
};

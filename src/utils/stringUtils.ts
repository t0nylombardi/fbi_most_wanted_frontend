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
 * Finds the longest string from a list of strings and its name.
 * @param description The description string.
 * @param details The details string.
 * @param caution The caution string.
 * @returns An array where the first element is the longest string and the second element is the name of that string.
 */
export const findLongestDetails = (
  description: string | null,
  details: string | null,
  caution: string | null,
): [string, string] => {
  description = description || "";
  details = details || "";
  caution = caution || "";

  const length1: number = description.length;
  const length2: number = details.length;
  const length3: number = caution.length;

  if (length1 >= length2 && length1 >= length3) return [description, "description"];
  if (length2 >= length1 && length2 >= length3) return [details, "details"];

  return [caution, "caution"];
};

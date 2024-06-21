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

/*
 * Splits an array in half and returns the two halves.
 * @param arr The array to split.
 * @returns The two halves of the array.
 */
export const splitArrayInHalf = (arr) => {
    const middleIndex = Math.floor(arr.length / 2);
    const firstHalf = arr.slice(0, middleIndex);
    const secondHalf = arr.slice(middleIndex);
    return [firstHalf, secondHalf];
};

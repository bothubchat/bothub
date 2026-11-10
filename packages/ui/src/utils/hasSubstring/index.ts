/**
 * Case-insensitive substring check. A plain string search is used instead of
 * a RegExp, so special characters in `subStr` need no escaping and no RegExp
 * is created for every checked string.
 */
export const hasSubstring = (
  str: string | string[],
  subStr: string,
): boolean => {
  const lowerSubStr = subStr.toLowerCase();

  if (typeof str === 'string') {
    return str.toLowerCase().includes(lowerSubStr);
  }

  return str.some((val) => val.toLowerCase().includes(lowerSubStr));
};

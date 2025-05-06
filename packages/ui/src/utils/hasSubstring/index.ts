export const hasSubstring = (
  str: string | string[],
  subStr: string
): boolean => {
  const escapedSubStr = subStr.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

  if (typeof str === 'string') {
    return new RegExp(escapedSubStr, 'i').test(str);
  }

  return str.some((val) => new RegExp(escapedSubStr, 'i').test(val));
};

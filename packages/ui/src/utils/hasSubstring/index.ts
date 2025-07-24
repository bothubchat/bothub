export const hasSubstring = (
  str: string | string[],
  subStr: string
): boolean => {
  const escapedSubStr = subStr.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regExp = new RegExp(escapedSubStr, 'i');

  if (typeof str === 'string') {
    return regExp.test(str);
  }

  return str.some((val) => regExp.test(val));
};

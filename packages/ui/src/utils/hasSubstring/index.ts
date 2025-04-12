export const hasSubstring = (str: string, subStr: string): boolean => {
  const escapedSubStr = subStr.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

  return new RegExp(escapedSubStr, 'i').test(str);
};

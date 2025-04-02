export const hasSubstring = (str: string, subStr: string): boolean =>
  new RegExp(subStr, 'i').test(str);

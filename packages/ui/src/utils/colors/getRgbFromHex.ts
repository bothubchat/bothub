export const getRgbFromHex = (hex: string): [number, number, number] => {
  if (!/#[\d, a-fA-F]{8}|#[\d, a-fA-F]{6}|#[\d, a-fA-F]{3}/.test(hex)) {
    throw new Error('Invalid HEX. Source: getRgbFromHex function');
  }

  let execValue: Array<string> | null;

  if (hex.length === 4) {
    execValue = /#([\d, a-fA-F])([\d, a-fA-F])([\d, a-fA-F])/.exec(hex);
  } else {
    execValue = /#([\d, a-fA-F]{2})([\d, a-fA-F]{2})([\d, a-fA-F]{2})/.exec(
      hex
    );
  }

  if (execValue === null) {
    throw new Error('No execValue. Source: getRgbFromHex function');
  }

  const [r, g, b] = execValue
    .slice(1)
    .map((num) => Number.parseInt(num.length === 1 ? num + num : num, 16));

  return [r, g, b];
};

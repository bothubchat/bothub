/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function interopDefaultCJSImport<T>(mod: any): T {
  // eslint-disable-next-line no-underscore-dangle
  if (mod.__esModule) {
    return mod.default;
  }

  return mod;
}


export type FileSizeProps = {
  sizeInBytes: number;
  precision?: number;
};

export const FileSize = ({ sizeInBytes, precision = 0 }: FileSizeProps) => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }

  const sizeInKB = sizeInBytes / 1024;

  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(precision)} KB`;
  }

  const sizeInMB = sizeInKB / 1024;

  if (sizeInMB < 1024) {
    return `${sizeInMB.toFixed(precision)} MB`;
  }

  const sizeInGB = sizeInMB / 1024;

  return `${sizeInGB.toFixed(precision)} GB`;
};

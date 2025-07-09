import { IInputMessageFile } from '@/ui/components';

export const getPreviewUrlForFile = async (file: File) => {
  if (
    file.name.match(/.png$/i) ||
    file.name.match(/.jpg$/i) ||
    file.name.match(/.jpeg$/i)
  ) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const previewUrl: string | null = reader.result?.toString() ?? null;

        if (previewUrl === null) {
          return reject(new Error('result not found'));
        }

        resolve(previewUrl);
      });
      reader.readAsDataURL(file);
    });
  }

  return null;
};

export const formatUploadFiles = async (
  files: File[]
): Promise<IInputMessageFile[]> => {
  const previewsUrls: (string | null)[] = await Promise.all(
    files.map(getPreviewUrlForFile)
  );
  const newFiles: IInputMessageFile[] = files.map((nativeFile, index) => ({
    name: nativeFile.name,
    previewUrl: previewsUrls[index],
    native: nativeFile
  }));

  const fileMap = new Map([...newFiles].map((file) => [file.name, file]));

  return [...fileMap.values()];
};

export const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = remainingSeconds
    .toFixed(1)
    .padStart(2, '0')
    .replace('.', ',');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export function isFileTypeAccepted(
  fileType: string,
  acceptStr?: string
): boolean {
  if (!acceptStr || acceptStr.trim() === '') return true;

  const acceptList = acceptStr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return acceptList.some((acceptType) => {
    if (acceptType.endsWith('/*')) {
      const baseType = acceptType.slice(0, acceptType.length - 1);
      return fileType.startsWith(baseType);
    }
    return acceptType === fileType;
  });
}

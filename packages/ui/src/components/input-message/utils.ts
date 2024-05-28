import { IInputMessageFile } from '@/ui/components';

export const getPreviewUrlForFile = async (file: File) => {
  if (file.name.match(/.png$/) || file.name.match(/.jpg$/) || file.name.match(/.jpeg$/)) {
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

export const formatUploadFiles = async (files: File[]): Promise<IInputMessageFile[]> => {
  const previewsUrls: (string | null)[] = await Promise.all(files.map(getPreviewUrlForFile));
  const newFiles: IInputMessageFile[] = files.map((nativeFile, index) => ({
    name: nativeFile.name,
    previewUrl: previewsUrls[index],
    native: nativeFile
  }));

  const fileMap = new Map([
    ...newFiles
  ].filter((file) => (
    file.name.match(/.(png|jpg|jpeg|txt|text|docx|xlsx|pdf)$/)
  ))
    .map((file) => [file.name, file]));
  return [...fileMap.values()];
};

import { useCallback } from 'react';
import { useControllableState, useEventCallback } from '@/ui/utils';
import { IInputMessageFile, InputMessageErrorEvent } from './types';
import {
  formatUploadFiles,
  getClipboardFiles,
  isFileTypeAccepted,
  isSameNativeFile,
  shouldPasteClipboardFiles,
} from './utils';

interface UseFilesProps {
  initialFiles?: IInputMessageFile[];
  uploadFileAccept?: string;
  uploadFileLimit: number;
  uploadFileDisabled?: boolean;
  emitError?: (e: InputMessageErrorEvent) => unknown;
  onFilesChange?: (files: IInputMessageFile[]) => unknown;
  onUploadFileChange?: () => unknown;
}

export const useFiles = ({
  initialFiles,
  uploadFileAccept,
  uploadFileLimit,
  uploadFileDisabled,
  emitError,
  onFilesChange,
}: UseFilesProps) => {
  const [files, setFiles] = useControllableState<IInputMessageFile[]>({
    value: initialFiles,
    defaultValue: [],
    onChange: onFilesChange,
  });
  const handleError = useEventCallback(emitError);

  // Один путь для выбора, перетаскивания и вставки: проверка accept,
  // без дублей и без потери файлов, добавленных пока читались превью
  const handleSideUploadFiles = useCallback(
    async (uploadFiles: File[]) => {
      if (uploadFileDisabled || !uploadFiles.length) return;

      const acceptedFiles: File[] = [];
      const rejectedFiles: File[] = [];

      for (const file of uploadFiles) {
        if (isFileTypeAccepted(file.type, uploadFileAccept, file.name)) {
          acceptedFiles.push(file);
        } else {
          rejectedFiles.push(file);
        }
      }

      if (rejectedFiles.length > 0) {
        handleError({ name: 'WRONG_FILES', payload: rejectedFiles });
      }
      if (acceptedFiles.length === 0) return;

      const newFiles = await formatUploadFiles(acceptedFiles);

      setFiles((prevFiles) =>
        [
          ...prevFiles.filter(
            (prevFile) =>
              !newFiles.some((newFile) =>
                isSameNativeFile(prevFile.native, newFile.native),
              ),
          ),
          ...newFiles,
        ].slice(0, uploadFileLimit),
      );
    },
    [
      uploadFileAccept,
      uploadFileDisabled,
      uploadFileLimit,
      handleError,
      setFiles,
    ],
  );

  const handleFilePaste = useCallback<React.ClipboardEventHandler>(
    async (event) => {
      if (uploadFileDisabled) return;

      const { clipboardData } = event;
      const pastedFiles = getClipboardFiles(clipboardData);

      if (
        pastedFiles.length === 0 ||
        !shouldPasteClipboardFiles(clipboardData)
      ) {
        return;
      }

      event.preventDefault();
      await handleSideUploadFiles(pastedFiles);
    },
    [handleSideUploadFiles, uploadFileDisabled],
  );

  const handleFileInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    async (event) => {
      if (!event.target.files) {
        return;
      }

      await handleSideUploadFiles([...event.target.files]);
    },
    [handleSideUploadFiles],
  );

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    },
    [setFiles],
  );

  return {
    files,
    setFiles,
    handleSideUploadFiles,
    handleFilePaste,
    handleFileInputChange,
    handleDeleteFile,
  };
};

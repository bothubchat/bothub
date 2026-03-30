import { useCallback, useEffect, useState } from 'react';
import { IInputMessageFile, InputMessageErrorEvent } from './types';
import {
  formatUploadFiles,
  getPreviewUrlForFile,
  isFileTypeAccepted,
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
  onUploadFileChange,
}: UseFilesProps) => {
  const [files, setFiles] = Array.isArray(initialFiles)
    ? [initialFiles, onFilesChange]
    : useState<IInputMessageFile[]>([]);

  const handleSideUploadFiles = useCallback(
    async (uploadFiles: File[]) => {
      if (!uploadFiles.length) return;
      const newFiles: IInputMessageFile[] = [];
      const rejectedFiles: File[] = [];
      const previewsUrls: (string | null)[] = await Promise.all(
        uploadFiles?.map(getPreviewUrlForFile),
      );
      for (const [idx, file] of uploadFiles.entries()) {
        const isValidFile = isFileTypeAccepted(file.type, uploadFileAccept);

        if (isValidFile) {
          newFiles.push({
            previewUrl: previewsUrls[idx],
            name: file.name,
            native: file,
          });
        } else {
          rejectedFiles.push(file);
        }
      }
      if (rejectedFiles.length > 0) {
        emitError?.({ name: 'WRONG_FILES', payload: rejectedFiles });
      }
      if (newFiles?.length > 0) {
        setFiles?.([...files, ...newFiles].slice(0, uploadFileLimit));
      }
    },
    [uploadFileAccept, emitError, uploadFileLimit, files],
  );

  const handleFilePaste = useCallback<React.ClipboardEventHandler>(
    async (event) => {
      if (uploadFileDisabled) return;

      const { clipboardData } = event;

      const hasText =
        clipboardData.getData('text/plain')?.length > 0 ||
        clipboardData.getData('text/html')?.length > 0;

      if (hasText) {
        return;
      }

      if (clipboardData.files.length > 0) {
        event.preventDefault();
        await handleSideUploadFiles([...clipboardData.files]);
      }
    },
    [handleSideUploadFiles, uploadFileDisabled],
  );

  const handleFileInputChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    async (event) => {
      if (!setFiles || !event.target.files) {
        return;
      }

      const newFormatted = await formatUploadFiles([...event.target.files]);

      const existingNames = new Set(newFormatted.map((f) => f.name));
      const keptExisting = files.filter((f) => !existingNames.has(f.name));

      setFiles([...keptExisting, ...newFormatted].slice(0, uploadFileLimit));
      onUploadFileChange?.();
    },
    [files, setFiles, uploadFileLimit],
  );

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles?.(files.filter((_, i) => i !== index));
    },
    [setFiles, files],
  );

  useEffect(() => {
    if (setFiles && initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  return {
    files,
    setFiles,
    handleSideUploadFiles,
    handleFilePaste,
    handleFileInputChange,
    handleDeleteFile,
  };
};

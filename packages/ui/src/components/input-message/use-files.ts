import { useCallback, useEffect, useRef } from 'react';
import { useControllableState, useEventCallback } from '@/ui/utils';
import { IInputMessageFile, InputMessageErrorEvent } from './types';
import { revokeObjectUrl } from './object-urls';
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
  // Файлами родителя он и владеет: держит их в черновиках и возвращает
  // в поле после ошибки отправки. Превью их освобождается само, когда
  // файл никто не держит (object-urls.ts)
  const isControlled = initialFiles !== undefined;
  const isControlledRef = useRef(isControlled);
  isControlledRef.current = isControlled;
  const filesRef = useRef(files);
  filesRef.current = files;
  const handleError = useEventCallback(emitError);

  // Один путь для выбора, перетаскивания и вставки: проверка accept
  // и без дублей
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

      const newFiles = formatUploadFiles(acceptedFiles);

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
      const deletedFile = filesRef.current[index];

      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

      if (deletedFile && !isControlledRef.current) {
        revokeObjectUrl(deletedFile.native);
      }
    },
    [setFiles],
  );

  // Неотправленные файлы без родителя больше никому не нужны.
  // Отправленные ушли в onSend: их превью освобождается, когда их отпустят
  useEffect(
    () => () => {
      if (!isControlledRef.current) {
        for (const file of filesRef.current) {
          revokeObjectUrl(file.native);
        }
      }
    },
    [],
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

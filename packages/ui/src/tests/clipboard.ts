export interface ClipboardDataMock {
  files?: File[];
  /** Файлы в items; по умолчанию совпадают с files */
  itemFiles?: File[];
  /** Строковые данные по MIME-типу: text/plain, text/html */
  data?: Record<string, string>;
}

/** jsdom не реализует DataTransfer — минимальная замена для paste-событий */
export const createClipboardData = ({
  files = [],
  itemFiles = files,
  data = {},
}: ClipboardDataMock): DataTransfer =>
  ({
    files,
    items: [
      ...Object.keys(data).map((type) => ({
        kind: 'string',
        type,
        getAsFile: () => null,
      })),
      ...itemFiles.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
    ],
    getData: (type: string) => data[type] ?? '',
  }) as unknown as DataTransfer;

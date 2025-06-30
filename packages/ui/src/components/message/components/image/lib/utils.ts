export const getExifOrientation = (blob: Blob): Promise<number> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const dataView = new DataView(arrayBuffer);

      if (dataView.getUint16(0, false) !== 0xffd8) {
        resolve(1);
        return;
      }

      const length = dataView.byteLength;
      let offset = 2;

      while (offset < length) {
        const marker = dataView.getUint16(offset, false);
        offset += 2;

        if (marker === 0xffe1) {
          const exifLength = dataView.getUint16(offset, false);
          const exifEnd = offset + exifLength;
          offset += 2;

          if (offset + 4 > exifEnd) {
            resolve(1);
            return;
          }

          if (dataView.getUint32(offset, false) !== 0x45786966) {
            resolve(1);
            return;
          }

          const tiffOffset = offset + 6;

          if (tiffOffset + 8 > exifEnd) {
            resolve(1);
            return;
          }

          const littleEndian = dataView.getUint16(tiffOffset, false) === 0x4949;
          const firstIFDOffset = dataView.getUint32(
            tiffOffset + 4,
            littleEndian
          );

          const ifdStart = tiffOffset + firstIFDOffset;

          if (ifdStart + 2 > exifEnd) {
            resolve(1);
            return;
          }

          const tagCount = dataView.getUint16(ifdStart, littleEndian);

          if (ifdStart + 2 + tagCount * 12 > exifEnd) {
            resolve(1);
            return;
          }

          for (let i = 0; i < tagCount; i++) {
            const tagOffset = ifdStart + 2 + i * 12;
            const tag = dataView.getUint16(tagOffset, littleEndian);

            if (tag === 0x0112) {
              if (tagOffset + 10 > exifEnd) {
                resolve(1);
                return;
              }

              const orientation = dataView.getUint16(
                tagOffset + 8,
                littleEndian
              );
              resolve(orientation);
              return;
            }
          }

          offset = exifEnd;
          continue;
        }

        const markerHighByte = Math.floor(marker / 256);
        if (markerHighByte !== 0xff) break;

        if (offset + 2 > length) break;

        offset += dataView.getUint16(offset, false);
      }

      resolve(1);
    };

    reader.onerror = () => resolve(1);
    reader.readAsArrayBuffer(blob);
  });

export const applyExifTransform = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  orientation: number
) => {
  const { width, height } = img;

  switch (orientation) {
    case 2:
      // Горизонтальное отражение
      canvas.width = width;
      canvas.height = height;
      ctx.transform(-1, 0, 0, 1, width, 0);
      break;
    case 3:
      // Поворот на 180°
      canvas.width = width;
      canvas.height = height;
      ctx.transform(-1, 0, 0, -1, width, height);
      break;
    case 4:
      // Вертикальное отражение
      canvas.width = width;
      canvas.height = height;
      ctx.transform(1, 0, 0, -1, 0, height);
      break;
    case 5:
      // Поворот на 90° + горизонтальное отражение
      canvas.width = height;
      canvas.height = width;
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      // Поворот на 90° по часовой стрелке
      canvas.width = height;
      canvas.height = width;
      ctx.transform(0, 1, -1, 0, height, 0);
      break;
    case 7:
      // Поворот на 90° + вертикальное отражение
      canvas.width = height;
      canvas.height = width;
      ctx.transform(0, -1, -1, 0, height, width);
      break;
    case 8:
      // Поворот на 90° против часовой стрелки
      canvas.width = height;
      canvas.height = width;
      ctx.transform(0, -1, 1, 0, 0, width);
      break;
    default:
      // Нормальная ориентация
      canvas.width = width;
      canvas.height = height;
      break;
  }
};

export const createCorrectedImage = async (blob: Blob): Promise<string> => {
  const orientation = await getExifOrientation(blob);

  if (orientation === 1) {
    return URL.createObjectURL(blob);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(URL.createObjectURL(blob));
        return;
      }

      applyExifTransform(canvas, ctx, img, orientation);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (correctedBlob) => {
          if (correctedBlob) {
            resolve(URL.createObjectURL(correctedBlob));
          } else {
            resolve(URL.createObjectURL(blob));
          }
        },
        'image/jpeg',
        0.92
      );
    };

    img.onerror = () => {
      resolve(URL.createObjectURL(blob));
    };

    img.src = URL.createObjectURL(blob);
  });
};

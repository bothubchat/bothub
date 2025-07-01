export const getImageOrientation = (file: Blob): Promise<number> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          resolve(1);
          return;
        }

        const view = new DataView(arrayBuffer);
        if (view.getUint16(0, false) !== 0xffd8) {
          resolve(1);
          return;
        }

        const length = view.byteLength;
        let offset = 2;

        while (offset < length) {
          if (offset + 2 > length) break;

          const marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xffe1) {
            if (offset + 2 > length) break;

            offset += 2;

            if (offset + 4 > length) break;

            if (view.getUint32(offset, false) !== 0x45786966) {
              resolve(1);
              return;
            }

            const tiffOffset = offset + 6;
            if (tiffOffset + 8 > length) break;

            const littleEndian = view.getUint16(tiffOffset, false) === 0x4949;
            const firstIFDOffset = view.getUint32(tiffOffset + 4, littleEndian);

            const ifdStart = tiffOffset + firstIFDOffset;
            if (ifdStart + 2 > length) break;

            const tagCount = view.getUint16(ifdStart, littleEndian);

            for (let i = 0; i < tagCount; i++) {
              const tagOffset = ifdStart + 2 + i * 12;
              if (tagOffset + 12 > length) break;

              if (view.getUint16(tagOffset, littleEndian) === 0x0112) {
                const orientation = view.getUint16(tagOffset + 8, littleEndian);
                resolve(orientation);
                return;
              }
            }
          }
          const markerHighByte = Math.floor(marker / 256);
          if (markerHighByte !== 0xff) break;

          if (offset + 2 > length) break;
          offset += view.getUint16(offset, false);
        }

        resolve(1);
      } catch (error) {
        console.error('Error reading EXIF data:', error);
        resolve(1);
      }
    };

    reader.onerror = () => {
      resolve(1);
    };

    reader.readAsArrayBuffer(file);
  });

export const getTransformStyle = (orientation: number): React.CSSProperties => {
  switch (orientation) {
    case 2:
      return { transform: 'scaleX(-1)' };
    case 3:
      return { transform: 'rotate(180deg)' };
    case 4:
      return { transform: 'scaleY(-1)' };
    case 5:
      return { transform: 'rotate(90deg) scaleX(-1)' };
    case 6:
      return { transform: 'rotate(90deg)' };
    case 7:
      return { transform: 'rotate(-90deg) scaleX(-1)' };
    case 8:
      return { transform: 'rotate(-90deg)' };
    default:
      return {};
  }
};

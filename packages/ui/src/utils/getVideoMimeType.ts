export function getVideoMimeType(src: string): string {
  const extMatch = src.match(/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv)(\?.*)?$/i);
  if (!extMatch) return 'video/mp4';

  switch (extMatch[1].toLowerCase()) {
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'ogg':
      return 'video/ogg';
    case 'mov':
      return 'video/quicktime';
    case 'avi':
      return 'video/x-msvideo';
    case 'mkv':
      return 'video/x-matroska';
    case 'flv':
      return 'video/x-flv';
    case 'wmv':
      return 'video/x-ms-wmv';
    default:
      return 'video/mp4';
  }
}

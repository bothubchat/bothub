import {
  AttachFileIcon,
  PdfIcon,
  TxtIcon,
  WordIcon,
  XlsIcon,
} from '@/ui/icons';

export type FileIconProps = {
  filename: string;
  size?: number;
};

export const FileIcon = ({ filename, size = 24 }: FileIconProps) => {
  let iconNode: React.ReactNode;

  if (filename.match(/.txt$/i)) {
    iconNode = <TxtIcon size={size} />;
  } else if (filename.match(/.docx$/i) || filename.match(/.doc$/i)) {
    iconNode = <WordIcon size={size} />;
  } else if (filename.match(/.xlsx$/i) || filename.match(/.xls$/i)) {
    iconNode = <XlsIcon size={size} />;
  } else if (filename.match(/.pdf$/i)) {
    iconNode = <PdfIcon size={size} />;
  } else {
    iconNode = <AttachFileIcon size={size} />;
  }

  return iconNode;
};

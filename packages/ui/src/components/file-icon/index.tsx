import {
  AttachFileIcon, PdfIcon, TxtIcon, WordIcon, XlsIcon 
} from '@/ui/icons';

export type FileIconProps = {
  filename: string;
};

export const FileIcon = ({ filename }: FileIconProps) => {
  let iconNode: React.ReactNode;

  if (filename.match(/.txt$/i)) {
    iconNode = <TxtIcon />;
  } else if (filename.match(/.docx$/i)) {
    iconNode = <WordIcon />;
  } else if (filename.match(/.xlsx$/i)) {
    iconNode = <XlsIcon />;
  } else if (filename.match(/.pdf$/i)) {
    iconNode = <PdfIcon />;
  } else {
    iconNode = <AttachFileIcon />;
  }

  return iconNode;
};

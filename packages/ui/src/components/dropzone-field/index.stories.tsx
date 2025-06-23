import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StoryDecorator } from '@/ui/story-decorator';
import { DropzoneField } from '.';
import { Typography } from '../typography';
import { useTheme } from '@/ui/theme';

export type DropzoneFieldMeta = Meta<typeof DropzoneField>;

export type DropzoneFieldStory = StoryObj<typeof DropzoneField>;

export const Default = () => <DropzoneField placeholder="placeholder" />;

export const Label = () => {
  const theme = useTheme();
  const [files, setFiles] = useState<File[]>([]);

  return (
    <DropzoneField
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      files={files}
      onChange={(files) => setFiles(files)}
      leftLabel="Перетащите документ сюда:"
      rightLabels={[
        'Допустимые форматы: .xlsx (до 20MB)',
        'Доступны: 5/5 очередей'
      ]}
      placeholder={
        <div
          style={{
            maxWidth: '340px',
            height: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <div>
            <Typography
              variant="body-l-semibold"
              component="span"
            >
              Excel таблица .xlsx
            </Typography>
            <Typography
              variant="body-m-regular"
              component="span"
            >
              {' '}
              — промпты находятся в определённом столбце заданного листа.
              Стандартное состояние Лист 1/Столбец А.
            </Typography>
          </div>
          <Typography
            variant="body-s-regular"
            style={{
              color: theme.colors.accent.primary
            }}
          >
            <u>Шаблон</u>
          </Typography>
        </div>
      }
    />
  );
};

export default {
  title: 'UI Components/Fields/Dropzone',
  component: DropzoneField,
  decorators: [StoryDecorator({ margin: '50px 0px' })]
} as DropzoneFieldMeta;

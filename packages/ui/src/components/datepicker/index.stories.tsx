import { Meta } from '@storybook/react-vite';
import React, { useState } from 'react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Datepicker } from '.';
import { TextField } from '@/ui/components';

export type DatepickerFieldMeta = Meta<typeof Datepicker>;

const dateText = (str: string | number) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(new Date(str));

export const RangeDatepicker = () => {
  const [value, setValue] = useState<[Date, Date | null] | null>(null);

  let textValue = '';
  if (Array.isArray(value)) {
    if (value[0]) textValue += dateText(value[0].getTime());
    if (value[1]) textValue += ` - ${dateText(value[1]?.getTime())}`;
  }

  return (
    <Datepicker
      range
      value={value}
      onChange={setValue}
      locale="ru-RU"
    >
      {(setRef, setOpen) => (
        <div
          ref={setRef}
          style={{ display: 'inline-block' }}
        >
          <TextField
            readonly
            type="text"
            placeholder="start date - end date"
            value={textValue}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      )}
    </Datepicker>
  );
};

export const SingleDatepicker = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Datepicker
      range={false}
      value={value}
      onChange={setValue}
      locale="en-US"
    >
      {(setRef, setOpen) => (
        <div
          ref={setRef}
          style={{ display: 'inline-block' }}
        >
          <TextField
            readonly
            type="text"
            placeholder="choose date"
            value={value ? dateText(value.getTime()) : ''}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      )}
    </Datepicker>
  );
};

export default {
  title: 'UI Components/Datepicker',
  component: Datepicker,
  decorators: [StoryDecorator({ margin: '50px 0px' })],
} as DatepickerFieldMeta;

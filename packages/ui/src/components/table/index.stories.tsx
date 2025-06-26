import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryDecorator } from '@/ui/story-decorator';
import {
  Table,
  TableBody,
  TableCell,
  TableCellText,
  TableHead,
  TableRow
} from '.';
import { InfoIcon } from '@/ui/icons';
import { Tooltip } from '@/ui/components/tooltip';
import { Button } from '@/ui/components/button';

export type TableMeta = Meta<typeof Table>;

export type TableStory = StoryObj<typeof Table>;

export const Basic: TableStory = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableCell
              size="sm"
              colSpan={2}
            />
            <TableCell
              size="sm"
              colSpan={2}
            >
              <TableCellText>
                Стоимость в Caps
                <Tooltip
                  label={
                    'Caps - это внутрення валюта БотаХаб. 1 Caps равен по стоимости цене одного токена самой дешёвой модели GPT-3.5.\n1000 Caps = 20 копеек.'
                  }
                >
                  <Button variant="text">
                    <InfoIcon />
                  </Button>
                </Tooltip>
              </TableCellText>
            </TableCell>
            <TableCell
              size="sm"
              colSpan={2}
            >
              Стоимость в руб
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Модель</TableCell>
            <TableCell>{'Размер контекста\n(в токенах)'}</TableCell>
            <TableCell>{'Стоимость промта\n(за 1 токен)'}</TableCell>
            <TableCell>{'Стоимость ответа\n(за 1 токен)'}</TableCell>
            <TableCell>{'Стоимость промта\n(за 1к токенов)'}</TableCell>
            <TableCell>{'Стоимость ответа\n(за 1к токенов)'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>GPT-3.5</TableCell>
            <TableCell>4 095</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>0,2</TableCell>
            <TableCell>0,2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GPT-3.5-16k</TableCell>
            <TableCell>16 383</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>0,4</TableCell>
            <TableCell>0,4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GPT-4</TableCell>
            <TableCell>8 191</TableCell>
            <TableCell>30</TableCell>
            <TableCell>30</TableCell>
            <TableCell>6</TableCell>
            <TableCell>6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GPT-4-32k</TableCell>
            <TableCell>32 767</TableCell>
            <TableCell>60</TableCell>
            <TableCell>60</TableCell>
            <TableCell>12</TableCell>
            <TableCell>12</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Claude V2</TableCell>
            <TableCell>100 000</TableCell>
            <TableCell>15</TableCell>
            <TableCell>15</TableCell>
            <TableCell>3</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
      </>
    )
  }
};

export default {
  title: 'UI Components/Table',
  component: Table,
  decorators: [StoryDecorator({ margin: '100px 0px' })],
  argTypes: {
    head: {
      table: {
        disable: true
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as TableMeta;

import { useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import { useTheme } from '@/ui/theme';
import {
  remarkMath,
  rehypeKatex,
  remarkCite,
  remarkHtmlBreak,
} from './markdown-plugins';

const remarkPlugins: PluggableList = [
  remarkGfm,
  [remarkMath, { singleDollarTextMath: true }],
  remarkCite,
  remarkHtmlBreak,
];

export const useMarkdownPlugins = (): {
  remarkPlugins: PluggableList;
  rehypePlugins: PluggableList;
} => {
  const errorColor = useTheme().colors.orange;

  const rehypePlugins = useMemo<PluggableList>(
    () => [
      [
        rehypeKatex,
        {
          output: 'html',
          errorColor,
          strict: false,
        },
      ],
    ],
    [errorColor],
  );

  return { remarkPlugins, rehypePlugins };
};

import { useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import { useTheme } from '@/ui/theme';
import { remarkMath, rehypeKatex, remarkCite } from './markdown-plugins';

export const useMarkdownPlugins = (): {
  remarkPlugins: PluggableList;
  rehypePlugins: PluggableList;
} => {
  const theme = useTheme();

  const remarkPlugins = useMemo<PluggableList>(
    () => [remarkGfm, [remarkMath, { singleDollarTextMath: true }], remarkCite],
    [],
  );

  const rehypePlugins = useMemo<PluggableList>(
    () => [
      [
        rehypeKatex,
        {
          output: 'html',
          errorColor: theme.colors.orange,
          strict: false,
        },
      ],
    ],
    [theme],
  );

  return { remarkPlugins, rehypePlugins };
};

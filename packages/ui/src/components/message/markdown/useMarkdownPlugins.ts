import { useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/ui/theme';
import { remarkMath, rehypeKatex } from './markdown-plugins';

export const useMarkdownPlugins = () => {
  const theme = useTheme();

  const remarkPlugins = useMemo(
    () => [remarkGfm, [remarkMath, { singleDollarTextMath: true }]],
    [],
  );

  const rehypePlugins = useMemo(
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

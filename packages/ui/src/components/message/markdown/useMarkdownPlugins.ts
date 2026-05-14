import { useCallback, useMemo, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/ui/theme';
import { remarkMath, rehypeKatex } from './markdown-plugins';

export const useMarkdownPlugins = () => {
  const theme = useTheme();
  const [singleDollarTextMath, setSingleDollarTextMath] = useState(true);

  const handleKatexStrict = useCallback(() => {
    if (singleDollarTextMath)
      queueMicrotask(() => setSingleDollarTextMath(false));
  }, [singleDollarTextMath]);

  const remarkPlugins = useMemo(
    () => [remarkGfm, [remarkMath, { singleDollarTextMath }]],
    [singleDollarTextMath],
  );

  const rehypePlugins = useMemo(
    () => [
      [
        rehypeKatex,
        {
          displayMode: true,
          output: 'html',
          errorColor: theme.colors.orange,
          strict: handleKatexStrict,
        },
      ],
    ],
    [handleKatexStrict, theme],
  );

  return { remarkPlugins, rehypePlugins, singleDollarTextMath };
};

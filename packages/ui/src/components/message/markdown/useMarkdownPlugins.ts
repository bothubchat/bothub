import { useCallback, useEffect, useMemo, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/ui/theme';

type Plugins = typeof import('./markdown-plugins') | null;

let globalPlugins: Plugins = null;

const getPlugins = async () => {
  if (globalPlugins) return globalPlugins;
  globalPlugins = await import('./markdown-plugins');
  return globalPlugins;
};

const hasMathBlock = (children: string) => {
  let dollarCount = 0;

  for (let i = 0; i < children.length; i++) {
    const char = children[i];

    if (char === '$') {
      dollarCount++;
    }

    if (dollarCount === 2) {
      return true;
    }
  }

  return false;
};

export type UseMarkdownPluginsProps = {
  children: string;
};

export const useMarkdownPlugins = ({ children }: UseMarkdownPluginsProps) => {
  const theme = useTheme();
  const [singleDollarTextMath, setSingleDollarTextMath] = useState(true);

  const [plugins, setPlugins] = useState<Plugins>(null);

  const handleKatexStrict = useCallback(() => {
    if (singleDollarTextMath)
      queueMicrotask(() => setSingleDollarTextMath(false));
  }, [singleDollarTextMath]);

  useEffect(() => {
    async function checkMathRequirements() {
      if (typeof children === 'string' && hasMathBlock(children)) {
        const p = await getPlugins();
        setPlugins(p);
      }
    }

    if (plugins) {
      return;
    }

    checkMathRequirements();
  }, [children, plugins]);

  const remarkPlugins = useMemo(() => {
    if (plugins !== null) {
      return [remarkGfm, [plugins.remarkMath, { singleDollarTextMath }]];
    }

    return [remarkGfm];
  }, [singleDollarTextMath, plugins]);

  const rehypePlugins = useMemo(() => {
    if (plugins !== null) {
      return [
        [
          plugins.rehypeKatex,
          {
            displayMode: true,
            output: 'html',
            errorColor: theme.colors.orange,
            strict: handleKatexStrict,
          },
        ],
      ];
    }

    return [];
  }, [handleKatexStrict, theme, plugins]);

  return { remarkPlugins, rehypePlugins, singleDollarTextMath };
};

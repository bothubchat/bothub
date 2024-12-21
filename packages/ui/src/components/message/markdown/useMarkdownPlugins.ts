import {
  useCallback, useEffect, useMemo, useState 
} from 'react';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/ui/theme';

type RemarkMath = null | typeof import('remark-math');
type RehypeKatex = null | typeof import('rehype-katex');

let globalRemarkMath: RemarkMath = null;
let globalRehypeKatex: RehypeKatex = null;

const getRemarkMath = async () => {
  if (globalRemarkMath) return globalRemarkMath;
  globalRemarkMath = await import('remark-math');
  return globalRemarkMath;
};

const getRehypeKatex = async () => {
  if (globalRehypeKatex) return globalRehypeKatex;
  globalRehypeKatex = await import('rehype-katex');
  return globalRehypeKatex;
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

  const [remarkMath, setRemarkMath] = useState<RemarkMath>(
    globalRemarkMath ?? null
  );
  const [rehypeKatex, setRehypeKatex] = useState<RehypeKatex>(
    globalRehypeKatex ?? null
  );

  const handleKatexStrict = useCallback(() => {
    if (singleDollarTextMath) queueMicrotask(() => setSingleDollarTextMath(false));
  }, [singleDollarTextMath]);

  useEffect(() => {
    async function checkMathRequirements() {
      if (typeof children === 'string' && hasMathBlock(children)) {
        const [math, katex] = await Promise.all([
          getRemarkMath(),
          getRehypeKatex(),
        ]);
        setRemarkMath(math);
        setRehypeKatex(katex);
        await import('katex/dist/katex.min.css');
      }
    }

    if (remarkMath && rehypeKatex) {
      return;
    }

    checkMathRequirements();
  }, [children, remarkMath, rehypeKatex]);

  const remarkPlugins = useMemo(() => {
    if (remarkMath !== null) {
      return [remarkGfm, [remarkMath.default, { singleDollarTextMath }]];
    }

    return [remarkGfm];
  }, [singleDollarTextMath, remarkMath]);

  const rehypePlugins = useMemo(() => {
    if (rehypeKatex !== null) {
      return [
        [
          rehypeKatex.default,
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
  }, [handleKatexStrict, theme, rehypeKatex]);

  return { remarkPlugins, rehypePlugins, singleDollarTextMath };
};

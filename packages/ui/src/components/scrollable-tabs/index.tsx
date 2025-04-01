import * as S from './styled';
import { Slider } from '../slider';
import { ITab, Variant } from './types';

type ScrollableTabsProps = {
  variant?: Variant;
  component: 'a' | 'button';
  tabs: ITab[];
  selectedTabId?: string;
  onClick?(id: string): void;
};

export const ScrollableTabs = ({
  tabs,
  variant = 'primary',
  component = 'a',
  selectedTabId,
  onClick
}: ScrollableTabsProps) => (
  <Slider
    arrowsSize={variant === 'primary' ? 'md' : 'sm'}
    gap={variant === 'primary' ? 20 : 8}
  >
    {tabs.map(({ id, label, icon, href }) => (
      <S.ScrollableTabsTab
        key={id}
        as={component}
        $variant={variant}
        $selected={id === selectedTabId}
        onClick={() => onClick?.(id)}
        href={component === 'a' ? href : undefined}
      >
        {icon}
        <S.ScrollableTabsTabLabel $variant={variant}>
          {label}
        </S.ScrollableTabsTabLabel>
      </S.ScrollableTabsTab>
    ))}
  </Slider>
);

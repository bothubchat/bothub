import * as S from './styled';
import { Slider } from '../slider';
import { ITab, ITabButton, ITabLink, Variant } from './types';

type ScrollableTabsProps = {
  variant?: Variant;
  component: 'a' | 'button';
  tabs: ITab[];
  selectedTabId?: string;
};

export const ScrollableTabs = ({
  tabs,
  variant = 'primary',
  component = 'a',
  selectedTabId
}: ScrollableTabsProps) => (
  <Slider gap={variant === 'primary' ? 20 : 8}>
    {tabs.map(({ id, label, icon, ...rest }) => {
      const props = {
        as: component,
        key: id,
        $variant: variant,
        $selected: id === selectedTabId,
        onClick:
          component === 'button'
            ? () => (rest as ITabButton).onClick?.(id)
            : undefined,
        href: component === 'a' ? (rest as ITabLink).href : undefined
      };

      return (
        <S.ScrollableTabsTab {...props}>
          {icon}
          <S.ScrollableTabsTabLabel $variant={variant}>
            {label}
          </S.ScrollableTabsTabLabel>
        </S.ScrollableTabsTab>
      );
    })}
  </Slider>
);

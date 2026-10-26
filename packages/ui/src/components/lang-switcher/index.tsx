import { useTransition } from '@react-spring/web';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  LangSwitcherButton,
  LangSwitcherIcon,
  LangSwitcherInput,
  LangSwitcherItem,
  LangSwitcherLabel,
  LangSwitcherList,
  LangSwitcherStyled,
} from './styled';
import {
  SelectFieldDataItem,
  SelectFieldDataItemComplex,
} from '../select-field';
import { useDropdownDismiss } from '@/ui/utils';

export type LangSwitcherProps = {
  region: {
    value: string;
    label: string;
  };
  lang: {
    value: string;
    label: string;
  };
  dataRegions: SelectFieldDataItemComplex[];
  dataLanguages: SelectFieldDataItemComplex[];
  onChange: ({ lang, region }: { lang: string; region: string }) => void;
};

const LangSwitcherComponent: React.FC<LangSwitcherProps> = ({
  lang,
  region,
  dataRegions,
  dataLanguages,
  onChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentRegion = useMemo(
    () =>
      dataRegions.find(
        (item) => typeof item === 'object' && item.value === region.value,
      ),
    [dataRegions, region],
  );
  const currentLanguage = useMemo(
    () =>
      dataLanguages.find(
        (item) => typeof item === 'object' && item.value === lang.value,
      ),
    [dataLanguages, lang],
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleChange = useCallback(
    (e: SelectFieldDataItem, type: 'lang' | 'region') => {
      if (typeof e === 'object' && e.value) {
        onChange({
          lang: type === 'lang' ? e.value : lang.value,
          region: type === 'region' ? e.value : region.value,
        });
      }
    },
    [onChange, lang.value, region.value],
  );

  const handleLangChange = useCallback(
    (item: SelectFieldDataItem) => handleChange(item, 'lang'),
    [handleChange],
  );

  const handleRegionChange = useCallback(
    (item: SelectFieldDataItem) => handleChange(item, 'region'),
    [handleChange],
  );

  // The document and the window are listened to only while the dropdown is
  // open. A click (not mousedown) is used: options of the inner selects are
  // rendered in a portal, and their click must land before this closes.
  useDropdownDismiss(dropdownRef, handleClose, isOpen, {
    outsideEvent: 'click',
    closeOnScroll: true,
  });

  const dropdownTransition = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'scale(0)',
    },
    enter: {
      opacity: isOpen ? 1 : 0.5,
      transform: `scale(${isOpen ? 1 : 0.999})`,
    },
    leave: { opacity: 0, transform: 'scale(0.999)' },
    config: { duration: 150 },
  });

  return (
    <LangSwitcherStyled ref={dropdownRef}>
      <LangSwitcherButton
        onClick={handleToggle}
        disableHoverColor
        endIcon={<LangSwitcherIcon $open={isOpen} />}
      >
        <LangSwitcherItem>
          {typeof currentRegion === 'object' && currentRegion.icon}
          {'/ '}
          {typeof currentLanguage === 'object' && currentLanguage.value}
        </LangSwitcherItem>
      </LangSwitcherButton>
      {dropdownTransition(
        (style, item) =>
          item && (
            <LangSwitcherList style={style}>
              <LangSwitcherLabel>{lang.label}</LangSwitcherLabel>
              <LangSwitcherInput
                contentHeight="fit-content"
                compactWidth
                onOptionClick={handleLangChange}
                value={currentLanguage}
                data={dataLanguages}
                dataTest="lang-select"
              />
              <LangSwitcherLabel>{region.label}</LangSwitcherLabel>
              <LangSwitcherInput
                contentHeight="fit-content"
                compactWidth
                onOptionClick={handleRegionChange}
                value={currentRegion}
                data={dataRegions}
                dataTest="region-select"
              />
            </LangSwitcherList>
          ),
      )}
    </LangSwitcherStyled>
  );
};

export const LangSwitcher = memo(LangSwitcherComponent);

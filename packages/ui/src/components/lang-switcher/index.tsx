import { useTransition } from '@react-spring/web';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
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

export const LangSwitcher: React.FC<LangSwitcherProps> = ({
  lang,
  region,
  dataRegions,
  dataLanguages,
  onChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

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

  useEffect(() => {
    const checkDropdownPosition = () => {
      const dropdownElement = document.getElementById(id);
      const rect = dropdownElement?.getBoundingClientRect();
      if (!rect || !dropdownElement) return;
      if (rect.left < 0) {
        dropdownElement.style.transform = `translateX(${-rect.left - 4}px)`;
      }
      if (rect.right > window.innerWidth) {
        dropdownElement.style.transform = `translateX(${
          window.innerWidth - rect.right - 4
        }px)`;
      }
    };
    if (!isOpen) return;

    dropdownRef.current?.addEventListener(
      'transitionend',
      checkDropdownPosition,
    );

    return () => {
      dropdownRef.current?.removeEventListener(
        'transitionend',
        checkDropdownPosition,
      );
    };
  }, [isOpen]);

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
    [onChange],
  );

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener);
      window.addEventListener('blur', blurListener);

      return () => {
        document.removeEventListener('click', clickListener);
        window.removeEventListener('blur', blurListener);
      };
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleScrollEvent = (event: Event) => {
      const dropdownEl = dropdownRef.current;
      const scrollTarget = event.target as Element;

      if (dropdownEl && dropdownEl.contains(scrollTarget)) {
        return;
      }

      handleClose();
    };

    window.addEventListener('scroll', handleScrollEvent, true);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const dropdownEl: HTMLDivElement | null = dropdownRef.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      const blurListener = () => setIsOpen(false);

      document.addEventListener('click', clickListener);
      window.addEventListener('blur', blurListener);

      return () => {
        document.removeEventListener('click', clickListener);
        window.removeEventListener('blur', blurListener);
      };
    }
  }, []);

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
            <LangSwitcherList
              style={style}
              id={id}
            >
              <LangSwitcherLabel>{lang.label}</LangSwitcherLabel>
              <LangSwitcherInput
                contentHeight="fit-content"
                compactWidth
                onOptionClick={(e) => handleChange(e, 'lang')}
                value={currentLanguage}
                data={dataLanguages}
                dataTest="lang-select"
              />
              <LangSwitcherLabel>{region.label}</LangSwitcherLabel>
              <LangSwitcherInput
                contentHeight="fit-content"
                compactWidth
                onOptionClick={(e) => handleChange(e, 'region')}
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

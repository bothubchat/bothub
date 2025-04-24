import { useEffect, useRef, useState } from 'react';
import { MultiLevelMenuStyled, MultiLevelMenuWrapper } from './styled';
import { MultiLevelMenuAccordion } from './multi-level-menu-accordion';
import { TMenuItem } from './types';

interface IMultilevelMenu {
  config?: TMenuItem[];
}
export const MultilevelMenu: React.FC<IMultilevelMenu> = ({ config }) => {
  const menuItems = config;

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const dropdownEl: HTMLUListElement | null = ref.current;

    if (dropdownEl !== null) {
      const clickListener = (event: Event) => {
        if (!dropdownEl.contains(event.target as Node)) {
          setOpenAccordion(null);
        }
      };
      const blurListener = () => setOpenAccordion(null);

      document.addEventListener('click', clickListener);
      window.addEventListener('blur', blurListener);

      return () => {
        document.removeEventListener('click', clickListener);
        window.removeEventListener('blur', blurListener);
      };
    }
  }, []);

  const handleAccordionToggle = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <MultiLevelMenuStyled>
      <MultiLevelMenuWrapper ref={ref}>
        {menuItems &&
          menuItems.map((menuItem, indexMenuItem) => (
            <MultiLevelMenuAccordion
              openAccordion={indexMenuItem === openAccordion}
              handleAccordionToggle={() => handleAccordionToggle(indexMenuItem)}
              menuItem={menuItem}
              key={indexMenuItem}
            />
          ))}
      </MultiLevelMenuWrapper>
    </MultiLevelMenuStyled>
  );
};

export * from './styled';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MultiLevelMenuStyled, MultiLevelMenuWrapper } from './styled';
import { MultiLevelMenuAccordion } from './multi-level-menu-accordion';
import { TMenuItem } from './types';
import { useOnClickOutside } from '@/ui/utils';

interface IMultilevelMenu {
  config?: TMenuItem[];
}
export const MultilevelMenu: React.FC<IMultilevelMenu> = ({ config }) => {
  const menuItems = config;

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const ref = useRef<HTMLUListElement>(null);

  const handleCloseAccordion = useCallback(() => setOpenAccordion(null), []);

  // Listen to the document and the window only while an accordion is open.
  const isAnyAccordionOpen = openAccordion !== null;

  useOnClickOutside(ref, handleCloseAccordion, isAnyAccordionOpen);

  useEffect(() => {
    if (!isAnyAccordionOpen) return;

    window.addEventListener('blur', handleCloseAccordion);

    return () => window.removeEventListener('blur', handleCloseAccordion);
  }, [isAnyAccordionOpen, handleCloseAccordion]);

  const handleAccordionToggle = (index: number) => {
    setOpenAccordion((openAccordion) =>
      openAccordion === index ? null : index,
    );
  };
  return (
    <MultiLevelMenuStyled>
      <MultiLevelMenuWrapper ref={ref}>
        {menuItems &&
          menuItems.map((menuItem, indexMenuItem) => (
            <MultiLevelMenuAccordion
              accordionIndex={indexMenuItem}
              openAccordion={indexMenuItem === openAccordion}
              handleAccordionToggle={() => handleAccordionToggle(indexMenuItem)}
              handleCloseAccordion={handleCloseAccordion}
              menuItem={menuItem}
              key={indexMenuItem}
            />
          ))}
      </MultiLevelMenuWrapper>
    </MultiLevelMenuStyled>
  );
};

export * from './styled';

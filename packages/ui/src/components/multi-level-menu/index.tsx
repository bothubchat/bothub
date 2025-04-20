import { useState } from 'react';
import { menuItems } from './config';
import { MultiLevelMenuStyled, MultiLevelMenuWrapper } from './styled';
import { MultiLevelMenuAccordion } from './multi-level-menu-accordion';

export const MultilevelMenu = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const handleAccordionToggle = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  return (
    <MultiLevelMenuStyled>
      <MultiLevelMenuWrapper>
        {menuItems.map((menuItem, indexMenuItem) => (
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

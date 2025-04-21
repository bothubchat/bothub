import { useState } from 'react';
import { useTransition } from '@react-spring/web';
import {
  MultiLevelMenuArrowDownIcon,
  MultiLevelMenuFirstLevelWrapper,
  MultiLevelMenuHeader,
  MultiLevelMenuLi,
  MultiLevelMenuTitle
} from './styled';
import { TMenuItem } from '../../types';
import { MultiLevelMenuFirstLevelItem } from '../../multi-level-menu-first-level';

interface IMultiLevelMenuAccordion {
  menuItem: TMenuItem;
  openAccordion: boolean;
  handleAccordionToggle: () => void;
}
export const MultiLevelMenuAccordion: React.FC<IMultiLevelMenuAccordion> = ({
  menuItem,
  openAccordion,
  handleAccordionToggle
}) => {
  const [openFirstLevelMenu, setOpenFirstLevelMenu] = useState<number | null>(
    null
  );

  const handleFirstLevelToggle = (index: number) => {
    setOpenFirstLevelMenu(openFirstLevelMenu === index ? null : index);
  };

  const dropdownTransition = useTransition(openAccordion, {
    from: { opacity: 0, height: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, height: 'auto', transform: 'translateY(0)' },
    leave: { opacity: 0, height: 0, transform: 'translateY(-20px)' },
    config: { duration: 200 }
  });

  return (
    <MultiLevelMenuLi>
      <MultiLevelMenuHeader
        onClick={handleAccordionToggle}
        $active={openAccordion}
      >
        <MultiLevelMenuTitle>{menuItem.accordion_title}</MultiLevelMenuTitle>
        <MultiLevelMenuArrowDownIcon $open={openAccordion} />
      </MultiLevelMenuHeader>
      {dropdownTransition(
        (style, item) =>
          item && (
            <MultiLevelMenuFirstLevelWrapper
              $open={openAccordion && !!item}
              style={style}
            >
              {menuItem.first_level &&
                menuItem.first_level.map((item, indexItem) => (
                  <MultiLevelMenuFirstLevelItem
                    openFirstLevelMenu={openFirstLevelMenu === indexItem}
                    handleFirstLevelToggle={() =>
                      handleFirstLevelToggle(indexItem)
                    }
                    onMouseEnter={() => setOpenFirstLevelMenu(indexItem)}
                    onMouseLeave={() => setOpenFirstLevelMenu(null)}
                    firstLevelItem={item}
                    key={indexItem}
                    accordion_title={menuItem.accordion_title}
                  />
                ))}
            </MultiLevelMenuFirstLevelWrapper>
          )
      )}
    </MultiLevelMenuLi>
  );
};

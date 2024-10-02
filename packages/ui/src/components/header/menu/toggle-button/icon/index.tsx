import { icon } from '@/ui/components/icon';
import { useHeader } from '../../../context';
import { StyledBurgerIcon, StyledLine } from './styled';

export type HeaderMenuToggleIconProps = {
  isMenuOpen: boolean;
};

export const HeaderMenuToggleIcon = icon((
  () => {
    const { isMenuOpen } = useHeader();

    return ((
      <StyledBurgerIcon isOpen={isMenuOpen}>
        <StyledLine />
        <StyledLine />
        <StyledLine />
      </StyledBurgerIcon>
    ));
  }
));

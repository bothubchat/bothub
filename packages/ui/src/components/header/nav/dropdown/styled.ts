import { styled, css } from 'styled-components';
import { HeaderNavLinkStyled } from '../link/styled';
import { ArrowDownIcon } from '../../../icons';
import { motion } from 'framer-motion';

export const HeaderNavDropdownStyled = styled.div<{ $inMenu: boolean }>`
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
  `}
`;

export const HeaderNavDropdownArrow = styled(ArrowDownIcon)``;

export const HeaderNavDropdownHead = styled(HeaderNavLinkStyled)<{ $active: boolean, $inMenu: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  ${({ $active }) => ($active ? css`
    color: ${({ theme }) => theme.colors.accent.primaryLight};
    > ${HeaderNavDropdownArrow} path {
      stroke: ${({ theme }) => theme.colors.accent.primaryLight};
    }
  ` : css`
    &:hover {
      color: ${({ theme }) => theme.colors.accent.primary};
      > ${HeaderNavDropdownArrow} path {
        stroke: ${({ theme }) => theme.colors.accent.primary};
      }
    }
  `)}
  ${({ $inMenu }) => $inMenu && css`
    width: 100%;
    justify-content: space-between;
  `}
`;

export const HeaderNavDropdownBody = styled(motion.div)<{ $inMenu: boolean }>`
  ${({ theme, $inMenu }) => {
    if ($inMenu) {
      return css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: ${theme.colors.grayScale.gray3};
        padding: 10px;
        border-radius: 6px;
        margin-top: 14px;
        width: 100%;
      `;
    }

    return css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: ${theme.colors.grayScale.gray3};
      border: 1px solid ${theme.colors.grayScale.gray2};
      border-radius: 17px;
      padding: 20px;
      position: absolute;
      margin-top: 50px;
      width: 100%;
      max-width: 700px;
      transform-origin: top left;
    `;
  }}
`;

export const HeaderNavDropdownList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
  row-gap: 28px;
  width: 100%;
  @media (max-width: 775px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    row-gap: 10px;
  }
`;

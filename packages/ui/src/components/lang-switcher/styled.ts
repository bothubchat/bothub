import { styled } from 'styled-components';
import { animated } from '@react-spring/web';
import { Typography } from '@/ui/components/typography';
import { SelectField } from '@/ui/components/select-field';
import { Button } from '../button';
import { ArrowDownIcon } from '@/ui/icons';

export const LangSwitcherStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  position: relative;
`;

export const LangSwitcherList = styled(animated.ul)`
  position: absolute;
  margin-top: 28px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  row-gap: 16px;
  column-gap: 8px;
  transform-origin: top center;
  flex-direction: column;
  width: fit-content;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.grayScale.gray4};
`;

export const LangSwitcherItem = styled(Typography).attrs({
  variant: 'body-m-semibold',
})`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const LangSwitcherLabel = styled(Typography).attrs({
  variant: 'body-s-medium',
})`
  width: max-content;
`;

export const LangSwitcherInput = styled(SelectField)`
  min-width: 160px;
  & > *:first-child {
    background: ${({ theme }) => theme.colors.grayScale.gray7};
  }
`;

export const LangSwitcherButton = styled(Button).attrs({
  variant: 'text',
})`
  white-space: nowrap;
`;

export const LangSwitcherIcon = styled(ArrowDownIcon)<{
  $open: boolean;
}>`
  pointer-events: none;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $open }) => ($open ? 'rotateZ(-180deg)' : 'rotateZ(0)')};
`;

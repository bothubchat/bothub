import { styled } from 'styled-components';
import { getTypographyStyles } from '@/ui/components/typography/styled';

const defaultSize = 56;

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  --switch-width: ${defaultSize}px;
`;

export const Checkbox = styled.input.attrs((props) => ({
  type: 'checkbox',
  ...props,
}))`
  display: none;
  height: 0;
  width: 0;
  visibility: hidden;
  &:checked + label {
    background-color: ${(props) => props.theme.colors.accent.primary};
    &:after {
      left: calc(100% - 4px);
      transform: translateX(-100%);
    }
  }
`;

export const HiddenLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: var(--switch-width, ${defaultSize});
  aspect-ratio: 56 / 26;
  background: ${({ theme }) => theme.colors.grayScale.gray2};
  display: block;
  border-radius: 100px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 4px;
    bottom: 0;
    margin: auto;
    width: calc(var(--switch-width, ${defaultSize}) * 0.33);
    height: calc(var(--switch-width, ${defaultSize}) * 0.33);
    background: #fff;
    border-radius: 50%;
    transition: 0.2s linear;
  }
`;

export const TextLabel = styled.label`
  ${getTypographyStyles('body-m-medium')}
  color: ${({ theme }) => theme.colors.base.white};
  cursor: pointer;
`;

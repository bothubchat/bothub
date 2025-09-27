import { styled } from 'styled-components';
import { Typography } from '../typography';
import { colorToRgba } from '@/ui/utils';

export const DropzoneFieldStyled = styled.div<{
  $fullWidth: boolean;
}>`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%;' : '')}
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 20px;

  background-color: ${({ theme }) =>
    colorToRgba(theme.colors.grayScale.gray4, 0.75)};
  padding: 20px;
  border-radius: 20px;
  background-image: ${({ theme }) => {
    const dark =
      "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%23222B44FF' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e";
    const light =
      "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%23CDD5DA' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e";

    return `url("${theme.mode === 'light' ? light : dark}")`;
  }};

  transition: background 0.3s ease-out;

  position: relative;

  &:active,
  &[data-dragged='true'] {
    background-color: rgba(28, 100, 242, 0.2);
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%231C64F2FF' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }

  @media (max-width: ${({ theme }) => theme.tablet.maxWidth}) {
    padding: 18px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
    background-image: none;
  }

  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 24px;
  }
`;

export const DropzoneFieldLabels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropzoneFieldRightLabelsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 8px;
  margin-left: auto;
`;

export const DropzoneFieldRightLabel = styled(Typography).attrs({
  variant: 'body-xs-medium',
})`
  color: ${({ theme }) => theme.colors.grayScale.gray1};
`;

export const DropzoneFieldInput = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  inset: 0;
  z-index: 1;
`;

export const DropzoneFieldPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
`;

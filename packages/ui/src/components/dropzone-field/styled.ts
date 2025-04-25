import { styled } from 'styled-components';

export const DropzoneFieldStyled = styled.div<{
  $fullWidth: boolean;
}>`
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%;' : '')}
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 20px;

  background-color: rgba(18, 24, 37, 0.5); // gray4-50
  padding: 20px;
  border-radius: 20px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%23222B44FF' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");

  transition: background 0.3s ease-out;

  position: relative;

  &:active,
  &[data-dragged='true'] {
    background-color: rgba(28, 100, 242, 0.2);
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' vector-effect='non-scaling-stroke' stroke='%231C64F2FF' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;

export const DropzoneFieldInput = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
`;

export const DropzoneFieldPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  position: relative;

  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
`;

export const DropzoneFieldFilesStyled = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

export const DropzoneFieldFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  position: relative;
  z-index: 40;

  padding: 8px 6px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gray2};
  background: ${({ theme }) => theme.colors.grayScale.gray3};
`;

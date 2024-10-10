import { DividerContainer, DividerStyled } from './styled';

export type DividerProps = React.ComponentPropsWithoutRef<'div'>;

export const Divider = ({ children, ...props }: DividerProps) => {
  if (children) {
    return (
      <DividerContainer>
        <DividerStyled {...props} />
        {children}
        <DividerStyled {...props} />
      </DividerContainer>
    );
  }

  return <DividerStyled {...props} />;
};

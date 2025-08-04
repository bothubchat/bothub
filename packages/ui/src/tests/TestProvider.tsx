import { PortalElement } from '../components';
import { BothubUIProvider, BothubUIProviderProps } from '../provider';

export type TestProviderProps = {
  children: React.ReactNode;
} & BothubUIProviderProps;

export const TestProvider = ({ children, ...props }: TestProviderProps) => (
  <BothubUIProvider
    {...props}
    globalStyle={{
      ...props.globalStyle,
      scale: props.globalStyle?.scale ?? 'main',
    }}
  >
    {children}
    <PortalElement />
  </BothubUIProvider>
);

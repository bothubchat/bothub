import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const CheckSmallIcon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 17" fill="none" {...props}>
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path d="M12.7908 4.23434C13.0697 4.54679 13.0697 5.05421 12.7908 5.36666L7.07711 11.7657C6.79813 12.0781 6.34505 12.0781 6.06606 11.7657L3.20924 8.56616C2.93025 8.25371 2.93025 7.74629 3.20924 7.43384C3.48823 7.12139 3.9413 7.12139 4.22029 7.43384L6.5727 10.0659L11.7819 4.23434C12.0609 3.92189 12.514 3.92189 12.793 4.23434H12.7908Z" fill={fill} />
      )}
    </IconConsumer>
  </Icon>
));

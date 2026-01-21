import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const WorkspaceIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <path
            d="M2 18V7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18Z"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 8V17V8Z"
            fill={fill}
          />
          <path
            d="M7 8V17"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

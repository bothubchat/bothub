import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const SquareIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <>
          <mask
            id="path-1-inside-1_1407_38549"
            fill="#ffffff"
          >
            <rect
              x="1"
              y="1"
              width="16"
              height="16"
              rx="1"
            />
          </mask>
          <rect
            x="1"
            y="1"
            width="16"
            height="16"
            rx="1"
            stroke={fill}
            strokeWidth="4"
            mask="url(#path-1-inside-1_1407_38549)"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

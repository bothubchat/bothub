import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const EmptyWordIcon = icon(({ ...props }) => (
  <Icon
    size={34}
    viewBox="0 0 34 34"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ stroke = '#F2DD1C' } = { stroke: '#F2DD1C' }) => (
        <>
          <g clipPath="url(#clip0_1453_17325)">
            <path
              d="M8.70459 1H19.6567L28.7163 10.4463V29.5791C28.7163 31.4651 27.184 32.9998 25.2896 33H8.70459C6.81754 33 5.28369 31.4662 5.28369 29.5791V4.4209C5.28366 2.53386 6.81753 1 8.70459 1Z"
              fill="#0E0C15"
              stroke={stroke}
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.0708 0V9.96655H29.7169L20.0708 0Z"
              fill={stroke}
            />
          </g>
          <defs>
            <clipPath id="clip0_1453_17325">
              <rect
                width="34"
                height="34"
                fill="white"
              />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));

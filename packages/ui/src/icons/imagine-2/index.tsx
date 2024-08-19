import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const Imagine2Icon = icon(({ ...props }) => (
  <Icon size={16} viewBox="0 0 16 16" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#F29C1C' } = { fill: '#F29C1C' }) => (
        <>
          <g clipPath="url(#clip0_2772_15622)">
            <path
              d="M14.7273 0L13.6964 2.25L11.4545 3.27273L13.6964 4.30364L14.7273 6.54545L15.75 4.30364L18 3.27273L15.75 2.25M6.54545 2.45455L4.5 6.95455L0 9L4.5 11.0455L6.54545 15.5455L8.59091 11.0455L13.0909 9L8.59091 6.95455M14.7273 11.4545L13.6964 13.6964L11.4545 14.7273L13.6964 15.75L14.7273 18L15.75 15.75L18 14.7273L15.75 13.6964"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0_2772_15622">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));

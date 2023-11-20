import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const UserProfileIcon = icon(({ ...props }) => (
  <Icon size={18} height={19} viewBox="0 0 18 19" fill="none" {...props}>
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <>
          <g clipPath="url(#clip0_258_8229)">
            <path d="M9 9.5C11.525 9.5 13.5714 7.48555 13.5714 5C13.5714 2.51445 11.525 0.5 9 0.5C6.475 0.5 4.42857 2.51445 4.42857 5C4.42857 7.48555 6.475 9.5 9 9.5ZM12.2 10.625H11.6036C10.8107 10.9836 9.92857 11.1875 9 11.1875C8.07143 11.1875 7.19286 10.9836 6.39643 10.625H5.8C3.15 10.625 1 12.7414 1 15.35V16.8125C1 17.7441 1.76786 18.5 2.71429 18.5H15.2857C16.2321 18.5 17 17.7441 17 16.8125V15.35C17 12.7414 14.85 10.625 12.2 10.625Z" fill={fill} />
          </g>
          <defs>
            <clipPath id="clip0_258_8229">
              <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));

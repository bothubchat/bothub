import { Icon, IconConsumer, icon } from '../../icon';

export const EmailCircleIcon = icon(({ ...props }) => (
  <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
    <IconConsumer>
      {({ fill } = { fill: '#616D8D' }) => (
        <>
          <g clipPath="url(#clip0_62_477)">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM5.39133 17.2747C5.65267 17.536 5.96667 17.6667 6.33333 17.6667H17C17.3662 17.6671 17.68 17.5367 17.9413 17.2753C18.2027 17.014 18.3333 16.7 18.3333 16.3333V8.33333C18.3338 7.96711 18.2033 7.65333 17.942 7.392C17.6807 7.13067 17.3667 7 17 7H6.33333C5.96711 6.99956 5.65333 7.13 5.392 7.39133C5.13067 7.65267 5 7.96667 5 8.33333V16.3333C4.99956 16.6996 5.13 17.0133 5.39133 17.2747ZM17 9.66667L11.6667 13L6.33333 9.66667V8.33333L11.6667 11.6667L17 8.33333V9.66667Z" fill={fill} />
          </g>
          <defs>
            <clipPath id="clip0_62_477">
              <rect width="24" height="24" fill={fill} />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));

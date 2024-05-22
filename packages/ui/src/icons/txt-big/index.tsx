import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TxtBigIcon = icon(({ ...props }) => (
  <Icon size={46} viewBox="0 0 46 46" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#1A347C' } = { fill: '#1A347C' }) => (
        <>
          <g clipPath="url(#clip0_1803_39835)">
            <circle cx="23" cy="23" r="23" fill={fill} />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.6874 8H25.7174L34.2181 16.8606V34.0945C34.2181 36.2534 32.4715 38 30.3201 38H15.6874C13.5285 38 11.7819 36.2534 11.7819 34.0945V11.9055C11.7818 9.74662 13.5284 8 15.6874 8Z" fill="#0263D1" />
            <path fillRule="evenodd" clipRule="evenodd" d="M25.7099 8V16.7931H34.2182L25.7099 8Z" fill="black" />
            <path d="M17.449 29.904V25.6387H15.8898V24.4543H20.395V25.6387H18.8433V29.904H17.449ZM25.4625 29.904H24.0007L23.0037 28.2324L22.0067 29.904H20.5374L22.2691 26.9955L20.7549 24.4543H22.2166L23.0037 25.7736L23.7834 24.4543H25.2526L23.7384 27.003L25.4625 29.904ZM27.1567 29.904V25.6387H25.6049V24.4543H30.1102V25.6387H28.551V29.904H27.1567Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_1803_39835">
              <rect width="46" height="46" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));

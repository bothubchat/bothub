import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TelegramLogoGradient = icon(({ ...props }) => (
  <Icon size={108} viewBox="0 0 108 108" fill="none" {...props}>
    <IconConsumer>
      {() => (
        <>
          <circle cx="54" cy="54" r="54" fill="url(#paint0_linear_2015_61687)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.1488 36.3366C72.7254 36.0939 73.3565 36.0102 73.9764 36.0942C74.5964 36.1782 75.1825 36.4268 75.6737 36.8142C76.165 37.2016 76.5434 37.7135 76.7696 38.2968C76.9959 38.88 77.0617 39.5133 76.9601 40.1306L71.6681 72.2303C71.1548 75.3266 67.7574 77.1023 64.9178 75.5599C62.5424 74.2696 59.0144 72.2816 55.8411 70.2072C54.2544 69.1689 49.3941 65.8439 49.9914 63.4779C50.5048 61.4549 58.6714 53.8529 63.3381 49.3333C65.1698 47.5576 64.3344 46.5333 62.1714 48.1666C56.8001 52.2219 48.1761 58.3889 45.3248 60.1249C42.8094 61.6556 41.4981 61.9169 39.9301 61.6556C37.0694 61.1796 34.4164 60.4423 32.2511 59.5439C29.3251 58.3306 29.4674 54.3079 32.2488 53.1366L72.1488 36.3366Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2015_61687"
              x1="11.5"
              y1="-15"
              x2="76"
              y2="149.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4584FF" />
              <stop offset="1" stopColor="#185CE3" />
            </linearGradient>
          </defs>
        </>

      )}
    </IconConsumer>
  </Icon>
));

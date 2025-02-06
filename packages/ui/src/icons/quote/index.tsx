import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const QuoteIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <>
          <path
            d="M12.8462 4C14.588 4 16 5.41238 16 7.15479C16 8.8966 14.588 10.309 12.8462 10.309C12.8462 10.309 12.8615 11.4808 13.8135 13.1674C13.9192 13.5054 13.7307 13.8653 13.3926 13.9704C13.1526 14.0459 12.9002 13.9725 12.7371 13.8017C10.5481 11.4075 9.69123 8.58956 9.69123 7.15479C9.69123 5.41238 11.1032 4 12.8462 4Z"
            fill={fill}
          />
          <path
            d="M5.24855 4C6.99036 4 8.40234 5.41241 8.40234 7.15479C8.40234 8.8966 6.99036 10.309 5.24855 10.309C5.24855 10.309 5.26381 11.4808 6.21582 13.1674C6.32157 13.5054 6.13304 13.8653 5.79491 13.9704C5.55498 14.0459 5.30251 13.9725 5.1395 13.8017C2.95045 11.4075 2.09355 8.58956 2.09355 7.15479C2.09355 5.41238 3.50554 4 5.24855 4Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

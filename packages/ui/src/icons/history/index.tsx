import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const HistoryIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ stroke = 'white' } = { stroke: 'white' }) => (
        <>
          <path
            d="M5.52769 17.2023C6.66003 18.7608 8.31673 19.8584 10.1934 20.2934C12.0701 20.7284 14.0407 20.4716 15.7432 19.5701C17.4458 18.6687 18.7658 17.1832 19.4609 15.3865C20.156 13.5898 20.1794 11.6027 19.5268 9.79011C18.8743 7.97756 17.5896 6.46135 15.9088 5.52005C14.228 4.57875 12.2639 4.27558 10.3775 4.66623C8.49112 5.05689 6.80902 6.11514 5.64028 7.64656C4.47154 9.17797 3.89465 11.0797 4.01562 13.0023M4.01562 13.0023L2.51562 11.5023M4.01562 13.0023L5.51562 11.5023"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.5V12.5L15 15.5"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const DeleteChatIcon = icon(({ ...props }) => (
  <Icon
    size={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ stroke = 'white' } = { stroke: 'white' }) => (
        <>
          <path
            d="M15.75 8.04763V5.39768C15.75 4.55924 15.75 4.1394 15.5866 3.81885C15.4429 3.5366 15.2132 3.3073 14.9309 3.16349C14.6101 3 14.1902 3 13.3501 3H4.65015C3.81007 3 3.38972 3 3.06885 3.16349C2.7866 3.3073 2.5573 3.5366 2.41349 3.81885C2.25 4.13972 2.25 4.56007 2.25 5.40015V14.0034C2.25 14.8027 2.25 15.2022 2.41385 15.4075C2.55634 15.586 2.77233 15.6898 3.00073 15.6896C3.26336 15.6893 3.57558 15.4396 4.19971 14.9402L5.34268 14.0259L5.34542 14.0236C5.58723 13.8302 5.70862 13.7331 5.84376 13.6641C5.96412 13.6026 6.09209 13.5578 6.22449 13.5306C6.37372 13.5 6.52989 13.5 6.84192 13.5H9.5"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 11L13.875 12.875M13.875 12.875L15.75 14.75M13.875 12.875L15.75 11M13.875 12.875L12 14.75"
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

import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const StabilityAIIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {() => (
        <>
          <rect
            width="24"
            height="24"
            rx="5"
            fill="#2F0463"
          />
          <path
            d="M8.89778 21.7511C13.4396 21.7511 16.3937 19.3456 16.3937 15.7268C16.3937 12.9205 14.597 11.1372 11.3844 10.3987L9.32188 9.78005C7.5125 9.37385 6.4564 8.8861 6.70522 7.64007C6.91222 6.6035 7.53152 6.0183 8.97162 6.0183C13.5497 6.0183 15.246 7.64007 15.246 7.64007V3.73945C15.246 3.73945 13.5945 2.2489 8.97162 2.2489C4.61437 2.2489 2.25 4.49092 2.25 7.96195C2.25 10.7683 3.88851 12.4004 7.21185 13.1758C7.44443 13.234 7.5633 13.2638 7.56847 13.2654C8.07397 13.4219 8.7561 13.6286 9.61485 13.8855C11.3134 14.2917 11.7502 14.7228 11.7502 16.0152C11.7502 17.1969 10.5225 17.8685 8.89778 17.8685C4.21739 17.8685 2.25 15.5008 2.25 15.5008V19.8224C2.25 19.8224 3.48031 21.7511 8.89778 21.7511Z"
            fill="#FCFBFC"
          />
          <path
            d="M19.9449 21.4589C21.5527 21.4589 22.75 20.2958 22.75 18.7222C22.75 17.1144 21.5869 15.9855 19.9449 15.9855C18.3371 15.9855 17.174 17.1144 17.174 18.7222C17.174 20.33 18.3371 21.4589 19.9449 21.4589Z"
            fill="#E80000"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

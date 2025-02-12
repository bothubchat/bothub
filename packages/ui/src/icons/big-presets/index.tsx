import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BigPresetsIcon = icon(({ ...props }) => (
  <Icon
    size={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <rect
            width="24"
            height="24"
            rx="4"
            fill="#313E62"
          />
          <path
            d="M9.10714 15.4483V17.0392C9.10714 17.2601 9.03683 17.448 8.89621 17.6026C8.75558 17.7573 8.58482 17.8346 8.38393 17.8346H5.97321C5.77232 17.8346 5.60156 17.7573 5.46094 17.6026C5.32031 17.448 5.25 17.2601 5.25 17.0392V15.4483C5.25 15.2273 5.32031 15.0395 5.46094 14.8848C5.60156 14.7302 5.77232 14.6528 5.97321 14.6528H8.38393C8.58482 14.6528 8.75558 14.7302 8.89621 14.8848C9.03683 15.0395 9.10714 15.2273 9.10714 15.4483ZM9.10714 11.2058V12.7968C9.10714 13.0177 9.03683 13.2055 8.89621 13.3602C8.75558 13.5149 8.58482 13.5922 8.38393 13.5922H5.97321C5.77232 13.5922 5.60156 13.5149 5.46094 13.3602C5.32031 13.2055 5.25 13.0177 5.25 12.7968V11.2058C5.25 10.9849 5.32031 10.7971 5.46094 10.6424C5.60156 10.4877 5.77232 10.4104 5.97321 10.4104H8.38393C8.58482 10.4104 8.75558 10.4877 8.89621 10.6424C9.03683 10.7971 9.10714 10.9849 9.10714 11.2058ZM18.75 15.4483V17.0392C18.75 17.2601 18.6797 17.448 18.5391 17.6026C18.3984 17.7573 18.2277 17.8346 18.0268 17.8346H10.7946C10.5938 17.8346 10.423 17.7573 10.2824 17.6026C10.1417 17.448 10.0714 17.2601 10.0714 17.0392V15.4483C10.0714 15.2273 10.1417 15.0395 10.2824 14.8848C10.423 14.7302 10.5938 14.6528 10.7946 14.6528H18.0268C18.2277 14.6528 18.3984 14.7302 18.5391 14.8848C18.6797 15.0395 18.75 15.2273 18.75 15.4483ZM9.10714 6.96342V8.55433C9.10714 8.77529 9.03683 8.96311 8.89621 9.11778C8.75558 9.27245 8.58482 9.34979 8.38393 9.34979H5.97321C5.77232 9.34979 5.60156 9.27245 5.46094 9.11778C5.32031 8.96311 5.25 8.77529 5.25 8.55433V6.96342C5.25 6.74246 5.32031 6.55465 5.46094 6.39998C5.60156 6.2453 5.77232 6.16797 5.97321 6.16797H8.38393C8.58482 6.16797 8.75558 6.2453 8.89621 6.39998C9.03683 6.55465 9.10714 6.74246 9.10714 6.96342ZM18.75 11.2058V12.7968C18.75 13.0177 18.6797 13.2055 18.5391 13.3602C18.3984 13.5149 18.2277 13.5922 18.0268 13.5922H10.7946C10.5938 13.5922 10.423 13.5149 10.2824 13.3602C10.1417 13.2055 10.0714 13.0177 10.0714 12.7968V11.2058C10.0714 10.9849 10.1417 10.7971 10.2824 10.6424C10.423 10.4877 10.5938 10.4104 10.7946 10.4104H18.0268C18.2277 10.4104 18.3984 10.4877 18.5391 10.6424C18.6797 10.7971 18.75 10.9849 18.75 11.2058ZM18.75 6.96342V8.55433C18.75 8.77529 18.6797 8.96311 18.5391 9.11778C18.3984 9.27245 18.2277 9.34979 18.0268 9.34979H10.7946C10.5938 9.34979 10.423 9.27245 10.2824 9.11778C10.1417 8.96311 10.0714 8.77529 10.0714 8.55433V6.96342C10.0714 6.74246 10.1417 6.55465 10.2824 6.39998C10.423 6.2453 10.5938 6.16797 10.7946 6.16797H18.0268C18.2277 6.16797 18.3984 6.2453 18.5391 6.39998C18.6797 6.55465 18.75 6.74246 18.75 6.96342Z"
            fill={fill}
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

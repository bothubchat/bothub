import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const StableDiffusionIcon = icon(({ ...props }) => (
  <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#000000' } = { fill: '#000000' }) => (
        <>
          <rect width="24" height="24" rx="5" fill={fill} />
          <path
            d="M8.89778 21.5022C13.4396 21.5022 16.3937 19.0967 16.3937 15.4779C16.3937 12.6716 14.597 10.8883 11.3844 10.1498L9.32188 9.53115C7.5125 9.12495 6.4564 8.6372 6.70522 7.39117C6.91222 6.3546 7.53152 5.7694 8.97162 5.7694C13.5497 5.7694 15.246 7.39117 15.246 7.39117V3.49055C15.246 3.49055 13.5945 2 8.97162 2C4.61437 2 2.25 4.24202 2.25 7.71305C2.25 10.5194 3.88851 12.1515 7.21185 12.9269C7.44443 12.9851 7.5633 13.0149 7.56847 13.0165C8.07397 13.173 8.7561 13.3797 9.61485 13.6366C11.3134 14.0428 11.7502 14.4739 11.7502 15.7663C11.7502 16.948 10.5225 17.6196 8.89778 17.6196C4.21739 17.6196 2.25 15.2519 2.25 15.2519V19.5735C2.25 19.5735 3.48031 21.5022 8.89778 21.5022Z"
            fill="white"
          />
          <path d="M17 12H14V20H17V12Z" fill={fill} />
          <path
            d="M16.7145 9H11.5C11.5 9 11 9 11 9.5001L11 21.8652C11 22.0197 11.1247 22.1444 11.2792 22.1444H16.7133C20.4718 22.1444 23 19.5028 23 15.571C23 11.6403 20.4731 9 16.7145 9ZM16.5537 19.0727C16.5188 19.0727 16.4864 19.064 16.4552 19.0528C16.4477 19.054 16.4415 19.0565 16.434 19.0565C16.4241 19.0578 16.4166 19.0615 16.4066 19.0615H14.5741C14.4245 19.0615 14.3048 18.9406 14.3048 18.7922V12.3509C14.3048 12.2026 14.4245 12.0817 14.5741 12.0817H16.4066C16.4166 12.0817 16.4241 12.0854 16.434 12.0866C16.4403 12.0866 16.4477 12.0891 16.4552 12.0904C16.4864 12.0792 16.5188 12.0704 16.5537 12.0704C16.6073 12.0704 16.6609 12.0754 16.7145 12.0779C16.808 12.0817 16.9015 12.0891 16.9938 12.1004C18.6281 12.3036 19.6977 13.6449 19.6977 15.571C19.6977 17.497 18.6268 18.8384 16.9938 19.0416C16.9015 19.0528 16.808 19.0603 16.7145 19.064C16.6609 19.0677 16.6073 19.0727 16.5537 19.0727Z"
            fill="#9D39FF"
          />
        </>
      )}
    </IconConsumer>
  </Icon>
));

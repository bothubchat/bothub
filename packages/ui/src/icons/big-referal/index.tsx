import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const BigReferalIcon = icon(({ ...props }) => (
  <Icon size={24} viewBox="0 0 24 24" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#4785FF' } = { fill: '#4785FF' }) => (
        <>
          <rect width="24" height="24" rx="4" fill="#313E62" />
          <g clipPath="url(#clip0_2259_25017)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6 5C12.3864 5.00006 13.1512 5.25037 13.7776 5.71271C14.4039 6.17505 14.8574 6.82399 15.0688 7.56044L15.1104 7.71989L16.6064 7.35667C16.7157 7.33021 16.8296 7.3265 16.9405 7.3458C17.0514 7.36509 17.1569 7.40695 17.2501 7.46863C17.3432 7.53031 17.4218 7.61042 17.4809 7.70372C17.54 7.79701 17.5781 7.90138 17.5928 8.01L17.6 8.11111V9.51889C18.051 9.9393 18.4206 10.4351 18.6912 10.9827L18.8016 11.2222H19.2C19.3959 11.2222 19.5851 11.2922 19.7315 11.4188C19.8779 11.5454 19.9715 11.7198 19.9944 11.909L20 12V14.3333C20 14.4613 19.9675 14.5874 19.9054 14.7003C19.8433 14.8132 19.7535 14.9094 19.644 14.9804L19.5576 15.0287L18.6232 15.4837C18.2407 16.2032 17.6866 16.8232 17.0072 17.292L16.8 17.4273V18.2222C16.8 18.4127 16.728 18.5966 16.5978 18.739C16.4676 18.8813 16.2882 18.9723 16.0936 18.9946L16 19H13.6C13.4041 19 13.2149 18.93 13.0685 18.8034C12.9221 18.6769 12.8285 18.5024 12.8056 18.3132L12.8 18.2222H12C12 18.4127 11.928 18.5966 11.7978 18.739C11.6676 18.8813 11.4882 18.9723 11.2936 18.9946L11.2 19H8.8C8.60405 19 8.41493 18.93 8.2685 18.8034C8.12207 18.6769 8.02853 18.5024 8.0056 18.3132L8 18.2222V17.4273C7.42207 17.0681 6.92284 16.6014 6.53102 16.054C6.13919 15.5066 5.86248 14.8893 5.7168 14.2377C5.24506 14.1012 4.82785 13.827 4.52164 13.4524C4.21543 13.0778 4.03501 12.6207 4.0048 12.1431L4 12V11.6111C4.00023 11.4129 4.0783 11.2222 4.21828 11.078C4.35825 10.9339 4.54956 10.8472 4.75312 10.8355C4.95667 10.8239 5.1571 10.8883 5.31347 11.0155C5.46983 11.1428 5.57032 11.3233 5.5944 11.5201L5.6 11.6111V12C5.6 12.1151 5.6256 12.2248 5.672 12.3228C5.79411 11.6226 6.0665 10.9552 6.47146 10.3641C6.87642 9.77298 7.40486 9.2714 8.0224 8.892C7.96564 8.40238 8.01585 7.90662 8.16975 7.43716C8.32365 6.96771 8.57777 6.53513 8.91548 6.16774C9.25319 5.80035 9.66688 5.50643 10.1295 5.3052C10.5921 5.10397 11.0932 4.99997 11.6 5ZM15.2 11.2222C14.9878 11.2222 14.7843 11.3042 14.6343 11.45C14.4843 11.5959 14.4 11.7937 14.4 12C14.4 12.2063 14.4843 12.4041 14.6343 12.55C14.7843 12.6958 14.9878 12.7778 15.2 12.7778C15.4122 12.7778 15.6157 12.6958 15.7657 12.55C15.9157 12.4041 16 12.2063 16 12C16 11.7937 15.9157 11.5959 15.7657 11.45C15.6157 11.3042 15.4122 11.2222 15.2 11.2222ZM11.6 6.55556C11.1154 6.55555 10.6473 6.72659 10.2827 7.03688C9.91811 7.34716 9.68176 7.7756 9.6176 8.24256C10.0053 8.15503 10.402 8.11092 10.8 8.11111H13.5016L13.5576 8.09789C13.4627 7.66152 13.2164 7.27013 12.86 6.98932C12.5036 6.70852 12.0588 6.55537 11.6 6.55556Z"
              fill={fill}
            />
          </g>
          <defs>
            <clipPath id="clip0_2259_25017">
              <rect width="16" height="16" fill="white" transform="translate(4 4)" />
            </clipPath>
          </defs>
        </>
      )}
    </IconConsumer>
  </Icon>
));

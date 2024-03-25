import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const EyeIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = '#ffffff' } = { fill: '#ffffff' }) => (
        <path d="M16.9347 9.18113C16.9108 9.1281 16.3458 7.85458 15.0976 6.58762C13.4275 4.89506 11.3227 4 9.00048 4C6.67827 4 4.57345 4.89506 2.90533 6.58762C1.65714 7.85458 1.09207 9.1281 1.06627 9.18113C1.02257 9.2817 1 9.39041 1 9.50033C1 9.61025 1.02257 9.71896 1.06627 9.81952C1.09014 9.87321 1.65521 11.1461 2.90404 12.413C4.57345 14.1056 6.67827 15 9.00048 15C11.3227 15 13.4275 14.1056 15.095 12.413C16.3438 11.1461 16.9089 9.87321 16.9328 9.81952C16.9768 9.71909 16.9997 9.61045 17 9.50054C17.0003 9.39062 16.9781 9.28184 16.9347 9.18113ZM13.9636 11.3418C12.5786 12.726 10.9092 13.4286 9.00048 13.4286C7.09176 13.4286 5.42235 12.726 4.03934 11.3412C3.49514 10.7946 3.02701 10.1752 2.64795 9.5C3.02712 8.82511 3.49524 8.20589 4.03934 7.65946C5.42299 6.27399 7.09176 5.57143 9.00048 5.57143C10.9092 5.57143 12.578 6.27399 13.9616 7.65946C14.5058 8.20584 14.9739 8.82507 15.353 9.5C14.9739 10.1751 14.5058 10.7946 13.9616 11.3412L13.9636 11.3418ZM9.00048 6.61905C8.43913 6.61905 7.89038 6.78801 7.42363 7.10458C6.95688 7.42114 6.5931 7.87108 6.37828 8.39751C6.16346 8.92393 6.10725 9.5032 6.21676 10.062C6.32628 10.6209 6.5966 11.1342 6.99353 11.5371C7.39047 11.9401 7.8962 12.2144 8.44677 12.3256C8.99733 12.4368 9.56801 12.3797 10.0866 12.1617C10.6053 11.9436 11.0485 11.5743 11.3604 11.1006C11.6723 10.6268 11.8387 10.0698 11.8387 9.5C11.8379 8.73619 11.5386 8.00391 11.0065 7.46382C10.4744 6.92372 9.75297 6.61991 9.00048 6.61905ZM9.00048 10.8095C8.74532 10.8095 8.49589 10.7327 8.28373 10.5888C8.07157 10.4449 7.90622 10.2404 7.80857 10.0011C7.71092 9.76185 7.68538 9.49855 7.73516 9.24452C7.78493 8.9905 7.90781 8.75717 8.08823 8.57403C8.26866 8.39089 8.49853 8.26617 8.74879 8.21564C8.99905 8.16511 9.25845 8.19104 9.49419 8.29016C9.72993 8.38927 9.93141 8.55712 10.0732 8.77247C10.2149 8.98782 10.2906 9.241 10.2906 9.5C10.2906 9.84731 10.1547 10.1804 9.91273 10.426C9.67079 10.6716 9.34264 10.8095 9.00048 10.8095Z" fill={fill} />
      )}
    </IconConsumer>
  </Icon>
));

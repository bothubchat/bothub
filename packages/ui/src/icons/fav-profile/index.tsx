import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const FavProfile = icon(({ ...props }) => (
  <Icon
    size={36}
    viewBox="0 0 36 36"
    fill="none"
    {...props}
  >
    <IconConsumer>
      {({ fill = '#fff' } = { fill: '#fff' }) => (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.5604 8.83521C33.2432 9.14947 33.0989 9.60101 33.1737 10.0435L33.653 12.8771C33.8027 13.7602 33.1096 14.4773 32.3256 14.4773C32.1189 14.4773 31.9051 14.4267 31.6984 14.3165L29.1879 12.9784C28.9919 12.8736 28.7764 12.821 28.5608 12.821C28.3452 12.821 28.1314 12.8736 27.9336 12.9784L25.4231 14.3165C25.2164 14.4267 25.0026 14.4773 24.7959 14.4773C24.0119 14.4773 23.3206 13.7602 23.4685 12.8771L23.9496 10.0435C24.0244 9.60101 23.8783 9.14947 23.5612 8.83521L21.53 6.82866C20.73 6.03762 21.1718 4.66146 22.2765 4.4989L25.0846 4.08538C25.5229 4.02218 25.9024 3.74215 26.0984 3.3394L27.3527 0.760254C27.6004 0.252744 28.0815 0 28.5608 0C29.0418 0 29.5211 0.252744 29.7688 0.760254L31.0249 3.3394C31.2209 3.74215 31.5986 4.02218 32.0387 4.08538L34.845 4.4989C35.9497 4.66146 36.3916 6.03762 35.5916 6.82866L33.5604 8.83521ZM14.207 21.3746C14.1802 21.3746 14.1571 21.371 14.1303 21.371C14.1054 21.371 14.0805 21.3746 14.0555 21.3746C12.1259 21.333 10.5668 19.7347 10.5668 17.7697C10.5668 15.7776 12.1651 14.1576 14.1303 14.1576C16.0956 14.1576 17.6939 15.7776 17.6939 17.7697C17.6939 19.7347 16.1348 21.333 14.207 21.3746ZM19.5219 22.4455C21.0008 20.6973 21.7135 18.2645 20.9455 15.6331C20.2382 13.2076 18.2248 11.2914 15.7892 10.7352C11.1317 9.67142 7.00334 13.2311 7.00334 17.7697C7.00334 19.5631 7.67149 21.1813 8.73876 22.4455C4.1365 24.3491 0.736915 28.7705 0.0170868 33.9539C-0.13258 35.0357 0.720879 36 1.79706 36C2.67902 36 3.4238 35.3442 3.54674 34.4593C4.2826 29.2091 8.70847 25.0248 14.0555 24.9869C14.0805 24.9869 14.1054 24.9939 14.1303 24.9939C14.1571 24.9939 14.1802 24.9869 14.207 24.9869C19.5522 25.0248 23.9799 29.209 24.714 34.461C24.8387 35.3442 25.5835 36 26.4636 36C27.5398 36 28.3933 35.0357 28.2436 33.9557C27.5256 28.7705 24.1242 24.3527 19.5219 22.4455Z"
          fill={fill}
        />
      )}
    </IconConsumer>
  </Icon>
));

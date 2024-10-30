import { Icon, IconConsumer, icon } from '@/ui/components/icon';

export const TextStrikethroughIcon = icon(({ ...props }) => (
  <Icon size={18} viewBox="0 0 18 18" fill="none" {...props}>
    <IconConsumer>
      {({ fill = 'white' } = { fill: 'white' }) => (
        <path
          d="M9.50028 9.50001C10.1159 9.50001 10.7202 9.63228 11.2501 9.88294C11.4895 9.99617 11.71 10.1319 11.9068 10.2862C12.1457 10.4736 12.3501 10.6886 12.5127 10.9252C12.8093 11.3568 12.9555 11.844 12.9362 12.3363C12.9168 12.8285 12.7325 13.3076 12.4027 13.7234C12.0728 14.1392 11.6094 14.4764 11.0609 14.7C10.5124 14.9236 9.89882 15.0255 9.28441 14.9946C8.67 14.9636 8.07754 14.8011 7.56838 14.5243C7.05922 14.2474 6.65222 13.8665 6.39011 13.4208M9.50028 9.50001H4M9.50028 9.50001H14.9999M12.6104 5.57929C12.3482 5.13367 11.9414 4.75254 11.4321 4.47572C10.923 4.1989 10.3302 4.03635 9.71581 4.00542C9.1014 3.9745 8.48781 4.07625 7.93932 4.29983C7.3908 4.52342 6.92742 4.86077 6.59757 5.2766C6.26771 5.69242 6.08349 6.17168 6.06415 6.66393C6.05849 6.80815 6.06708 6.95171 6.08945 7.09381"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </IconConsumer>
  </Icon>
));
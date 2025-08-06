import { Icon, IconConsumer, icon } from '@/ui/components/icon';
import { useTheme } from '@/ui/theme';

export const MailColoredIcon = icon(({ ...props }) => {
  const theme = useTheme();

  return (
    <Icon
      width={28}
      height={21}
      viewBox="0 0 28 21"
      fill="none"
      {...props}
    >
      <IconConsumer>
        {(
          { fill = theme.default.colors.base.white } = {
            fill: theme.default.colors.base.white,
          },
        ) => (
          <path
            d="M3.33854 20.168C2.60521 20.168 1.97721 19.923 1.45454 19.433C0.931877 18.943 0.670988 18.3546 0.671877 17.668V2.66797C0.671877 1.98047 0.933211 1.39172 1.45588 0.901721C1.97854 0.411721 2.6061 0.167138 3.33854 0.167971H24.6719C25.4052 0.167971 26.0332 0.412971 26.5559 0.90297C27.0785 1.39297 27.3394 1.9813 27.3385 2.66797V17.668C27.3385 18.3555 27.0772 18.9442 26.5545 19.4342C26.0319 19.9242 25.4043 20.1688 24.6719 20.168H3.33854ZM14.0052 11.418L24.6719 5.16797V2.66797L14.0052 8.91797L3.33854 2.66797V5.16797L14.0052 11.418Z"
            fill={fill}
          />
        )}
      </IconConsumer>
    </Icon>
  );
});

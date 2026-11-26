import React from 'react';
import { css, styled } from 'styled-components';
import { AIIcon } from '@/ui/icons';
import {
  Badge,
  BadgeSkeleton,
  BadgeStyled,
  BadgeText,
  BadgeVariant,
} from '@/ui/components/badge';
import { Divider } from '@/ui/components/divider';
import { Skeleton, SkeletonVariant } from '@/ui/components/skeleton';
import {
  Typography,
  TypographyAlign,
  TypographyVariant,
} from '@/ui/components/typography';
import { getTypographyStyles } from '@/ui/components/typography/mixin';
import { Theme, ThemeProvider, useTheme } from '@/ui/theme';

// Every variant of the zero-runtime CSS pilot components, the overrides
// consumers write with styled() and a nested theme: the visual regression
// check of a migration compares screenshots of these stories before and
// after it (see docs/zero-runtime-css.md).

const typographyVariants: TypographyVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body-xxxl-regular',
  'banner-h1-bold',
  'banner-h3-black',
  'body-xxl-regular',
  'body-h1-regular',
  'body-xxl-semibold',
  'body-xl-semibold',
  'body-xl-medium',
  'body-xl-regular',
  'body-m-semibold',
  'body-m-medium',
  'body-m-regular',
  'body-s-medium',
  'body-s-semibold',
  'body-l-regular',
  'body-l-medium',
  'body-l-medium-italic',
  'body-s-regular',
  'body-xs-regular',
  'body-xs-medium',
  'body-l-semibold',
  'button-sm',
  'button-md',
  'input-md',
  'input-sm',
];

const badgeVariants: BadgeVariant[] = [
  'info',
  'blue',
  'success',
  'critic',
  'error',
];

const skeletonVariants: (SkeletonVariant | undefined)[] = [
  undefined,
  'rounded',
  'circular',
  'rectangular',
];

const alignments: TypographyAlign[] = ['left', 'center', 'right'];

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

const Label = styled.code`
  color: #888;
  font-size: 11px;
  min-width: 160px;
`;

const Frame = styled.div`
  width: 320px;
  border: 1px dashed #555;
`;

export const TypographyMatrix: React.FC = () => (
  <Page>
    {typographyVariants.map((variant) => (
      <Row key={variant}>
        <Label>{variant}</Label>
        <Typography variant={variant}>Съешь же ещё этих мягких</Typography>
      </Row>
    ))}
    {alignments.map((align) => (
      <Frame key={align}>
        <Typography
          variant="body-m-regular"
          component="p"
          align={align}
          fullWidth
        >
          {align}
        </Typography>
      </Frame>
    ))}
    <Row>
      <Typography
        variant="body-m-medium"
        component="a"
        href="#link"
      >
        component=&quot;a&quot;
      </Typography>
      <Typography
        variant="h3"
        component="h3"
      >
        component=&quot;h3&quot;
      </Typography>
      <Typography
        variant="body-s-regular"
        component="p"
      >
        component=&quot;p&quot;
      </Typography>
      <Typography variant="body-m-regular">
        <Skeleton />
      </Typography>
      <Typography variant="h2">
        <Skeleton />
      </Typography>
    </Row>
  </Page>
);

export const BadgeMatrix: React.FC = () => (
  <Page>
    {badgeVariants.map((variant) => (
      <Row key={variant}>
        <Label>{variant}</Label>
        <Badge variant={variant}>Text</Badge>
        <Badge
          variant={variant}
          icon={<AIIcon />}
        >
          Icon
        </Badge>
        <Badge
          variant={variant}
          icon={<AIIcon />}
          iconSize={12}
          brick
        >
          Brick
        </Badge>
        <Badge
          variant={variant}
          skeleton
        >
          Skeleton
        </Badge>
        <Badge variant={variant}>
          <BadgeText $variant={variant}>BadgeText child</BadgeText>
        </Badge>
        <Badge
          variant={variant}
          icon={<AIIcon />}
        />
      </Row>
    ))}
    <Row>
      <Label>legacy parts</Label>
      <BadgeStyled
        $variant="success"
        $brick={false}
        $rounded
        $skeleton={false}
      >
        <BadgeText>BadgeStyled</BadgeText>
      </BadgeStyled>
      <BadgeStyled
        $variant="blue"
        $brick
        $rounded
        $skeleton
      >
        <BadgeSkeleton />
      </BadgeStyled>
    </Row>
  </Page>
);

export const SkeletonMatrix: React.FC = () => (
  <Page>
    {skeletonVariants.map((variant) => (
      <Row key={variant ?? 'default'}>
        <Label>{variant ?? 'default'}</Label>
        <Skeleton variant={variant} />
        <Skeleton
          variant={variant}
          width={120}
          height="24"
        />
        <Skeleton
          variant={variant}
          width="6rem"
          height="2rem"
        />
        <Skeleton
          variant={variant}
          colors={['#ff0000', '#00ff00']}
        />
        <Skeleton
          variant={variant}
          opacity={[0.3, 0.6]}
        />
      </Row>
    ))}
    <Frame>
      <Skeleton
        fullWidth
        height={12}
      />
    </Frame>
  </Page>
);

export const DividerMatrix: React.FC = () => (
  <Page>
    <Frame>
      <Divider />
    </Frame>
    <Frame>
      <Divider>
        <Typography variant="body-m-regular">or</Typography>
      </Divider>
    </Frame>
    <Frame>
      <Divider>
        <span>plain span</span>
      </Divider>
    </Frame>
    <Frame>
      <Divider style={{ height: 3 }} />
    </Frame>
  </Page>
);

// Overrides written like in the apps: rules of a styled() wrapper must win
// over the component's own styles at the same specificity.

const OverriddenTypography = styled(Typography)`
  color: #ff8800;
  font-size: 20px;
  text-align: right;
`;

const OverriddenTypographyAttrs = styled(Typography).attrs({
  variant: 'body-s-semibold',
  component: 'p',
})`
  margin: 8px 0;
  ${getTypographyStyles('h5')}
`;

const ShareAlert = styled(Badge).attrs({
  variant: 'error',
  brick: true,
})`
  height: auto;
  padding: 4px 12px;
  max-width: 220px;

  ${BadgeText} {
    white-space: normal;
  }
`;

const OverriddenBadge = styled(Badge)`
  background: #7a3cff;
  border-radius: 2px;
  gap: 20px;
`;

const OverriddenSkeleton = styled(Skeleton)`
  border-radius: 12px;
  background: #335;
  width: 80px;
`;

const OverriddenDivider = styled(Divider)`
  background: #ff8800;
  height: 4px;
`;

const MixinBox = styled.div<{ $variant: TypographyVariant }>`
  color: #22cc88;
  ${({ $variant }) => css`
    ${getTypographyStyles($variant)}
  `}
`;

export const Overrides: React.FC = () => (
  <Page>
    <Row>
      <OverriddenTypography variant="body-m-regular">
        styled(Typography)
      </OverriddenTypography>
      <Frame>
        <OverriddenTypography
          variant="h4"
          fullWidth
        >
          styled(Typography) h4
        </OverriddenTypography>
      </Frame>
      <OverriddenTypographyAttrs>.attrs() + mixin</OverriddenTypographyAttrs>
      <OverriddenTypography
        as="h2"
        variant="h2"
      >
        as=&quot;h2&quot;
      </OverriddenTypography>
    </Row>
    <Row>
      <MixinBox $variant="body-l-semibold">getTypographyStyles mixin</MixinBox>
      <MixinBox $variant="body-xs-medium">getTypographyStyles mixin</MixinBox>
    </Row>
    <Row>
      <ShareAlert>
        Длинный текст предупреждения, который должен переноситься на новую
        строку внутри бейджа
      </ShareAlert>
      <OverriddenBadge icon={<AIIcon />}>styled(Badge)</OverriddenBadge>
      <OverriddenBadge variant="success">styled(Badge)</OverriddenBadge>
    </Row>
    <Row>
      <OverriddenSkeleton />
      <OverriddenSkeleton variant="circular" />
      <Frame>
        <OverriddenDivider />
      </Frame>
    </Row>
  </Page>
);

const NestedContent: React.FC = () => (
  <Page>
    <Row>
      {badgeVariants.map((variant) => (
        <Badge
          key={variant}
          variant={variant}
          icon={<AIIcon />}
        >
          {variant}
        </Badge>
      ))}
    </Row>
    <Row>
      <Typography variant="h4">Nested theme</Typography>
      <Skeleton />
    </Row>
    <Frame>
      <Divider>
        <Typography variant="body-m-regular">divider</Typography>
      </Divider>
    </Frame>
  </Page>
);

// Like the Excel landing in the Next.js app: a nested provider with its own
// colors over the page theme.
export const NestedTheme: React.FC = () => {
  const theme = useTheme();
  const customTheme: Theme = {
    ...theme,
    scheme: 'custom',
    colors: {
      ...theme.colors,
      base: { ...theme.colors.base, black: '#0a0a0f', white: '#ffffff' },
      accent: {
        ...theme.colors.accent,
        primary: '#0F9D58',
        primaryLight: '#34d399',
        strong: '#0dba64',
        strongDown: '#0F9D58',
      },
      grayScale: {
        ...theme.colors.grayScale,
        gray1: '#87CEAC',
        gray2: '#2f5d47',
        gray3: '#16352a',
        gray4: '#0a0a0f',
      },
      green: '#28c840',
      critic: '#ff5f57',
      custom: {
        ...theme.colors.custom,
        interface: { ...theme.colors.custom.interface, text: '#ffbd2e' },
      },
    },
  };

  return (
    <>
      <NestedContent />
      <ThemeProvider
        scheme="custom"
        customTheme={customTheme}
      >
        <NestedContent />
      </ThemeProvider>
    </>
  );
};

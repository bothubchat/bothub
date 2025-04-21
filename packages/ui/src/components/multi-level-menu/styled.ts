import { styled } from 'styled-components';
import {
  Imagine2Icon,
  ArticleIcon,
  TgCircleIcon,
  StarIcon,
  BlackForestLabsIcon,
  ActionChatIcon,
  ReferalIcon,
  SetchelIcon,
  PublicIcon,
  CoderIcon,
  BlogCircleIcon,
  NewsIcon,
  StarGradientIcon
} from '@/ui/icons';

export const MultiLevelMenuStyled = styled.nav`
  padding: 30px 40px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    padding: 30 16px;
  }
`;
export const MultiLevelMenuWrapper = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  user-select: none;
  row-gap: 30px;
  @media (max-width: ${({ theme }) => theme.mobile.maxWidth}) {
    row-gap: 24px;
  }
`;

export const StartsIconMultiLevelMenu = styled(Imagine2Icon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const ArticleIconMultiLevelMenu = styled(ArticleIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const TgCircleIconMultiLevelMenu = styled(TgCircleIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;

export const MultiLevelMenuStarIconElite = styled(StarGradientIcon).attrs({
  x1: '-0.0708662',
  x2: '17.9291',
  y1: '9',
  y2: '9',
  startColor: '#1C64F2',
  endColor: '#D41CF2',
  id: 'paint0_linear_10915_2302'
})``;

export const MultiLevelMenuStarIconDeluxe = styled(StarGradientIcon).attrs({
  x1: '0',
  x2: '18',
  y1: '9.00002',
  y2: '9.00002',
  startColor: '#5728FF',
  endColor: '#A750FF',
  id: 'paint0_linear_10915_7313'
})``;

export const MultiLevelMenuStarIconPremium = styled(StarGradientIcon).attrs({
  x1: '0',
  x2: '18',
  y1: '9.00002',
  y2: '9.00002',
  startColor: '#4785FF',
  endColor: '#7740F2',
  id: 'paint0_linear_10915_8101'
})``;

export const MultiLevelMenuStarIconBasic = styled(StarGradientIcon)``;

export const MultiLevelMenuStarIconPlans = styled(StarIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;

export const MultiLevelMenuFlexIcon = styled(BlackForestLabsIcon)`
  border-radius: 50%;
`;

export const MultiLevelMenuActionChatIcon = styled(ActionChatIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;

export const MultiLevelMenuReferalIcon = styled(ReferalIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const MultiLevelMenuSetchelIcon = styled(SetchelIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const MultiLevelMenuGearIcon = styled(CoderIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const MultiLevelMenuPublicIcon = styled(PublicIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const MultiLevelMenuBlogCircleIcon = styled(BlogCircleIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;
export const MultiLevelMenuBlogNewsIcon = styled(NewsIcon)`
  path {
    fill: ${({ theme }) => theme.colors.base.white};
  }
`;

import { styled } from 'styled-components';
import {
  Imagine2Icon,
  ArticleIcon,
  TgCircleIcon,
  StarIcon,
  BlackForestLabsIcon,
  ActionChatIcon,
  ReferalIcon,
  SetchelIcon
} from '@/ui/icons';

export const MultiLevelMenuStyled = styled.nav`
  margin-top: 30px;
  padding: 0 40px;
`;
export const MultiLevelMenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  user-select: none;
  row-gap: 30px;
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

export const MultiLevelMenuStarIconElite = styled(StarIcon)`
  path {
    fill: ${({ theme }) => theme.colors.gradient.elite};
  }
`;
export const MultiLevelMenuStarIconDeluxe = styled(StarIcon)`
  path {
    fill: ${({ theme }) => theme.colors.gradient.deluxe};
  }
`;
export const MultiLevelMenuStarIconPremium = styled(StarIcon)`
  path {
    fill: ${({ theme }) => theme.colors.gradient.premium};
  }
`;
export const MultiLevelMenuStarIconBasic = styled(StarIcon)`
  path {
    fill: ${({ theme }) => theme.colors.gradient.basic};
  }
`;
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

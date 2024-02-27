import type { Meta, StoryObj } from '@storybook/react';
import { StoryDecorator } from '@/ui/story-decorator';
import { Logo } from '@/ui/components/logo';
import {
  Footer, FooterColumn, FooterColumnLabel, FooterLogoLink, FooterNav, FooterNavLink, FooterText 
} from '.';
import {
  BotCircleIcon, EmailCircleIcon, MediumCircleIcon, TgCircleIcon 
} from '@/ui/icons';

export type FooterMeta = Meta<typeof Footer>;

export type FooterStory = StoryObj<typeof Footer>;

export const Basic: FooterStory = {
  args: {
    logo: (
      <FooterLogoLink href="#home">
        <Logo />
      </FooterLogoLink>
    ),
    nav: (
      <FooterNav>
        <FooterText>
          ООО «Ботхаб» ОГРН 1236300016259
          <br />
          © @BotHub 2023  
        </FooterText>
        <FooterNavLink href="#">
          Пользовательское соглашение
        </FooterNavLink>
      </FooterNav>
    ),
    children: (
      <>
        <FooterColumn>
          <FooterColumnLabel>Информация</FooterColumnLabel>
          <FooterNav>
            <FooterNavLink href="#">Главная страница</FooterNavLink>
            <FooterNavLink href="#">Тарифы</FooterNavLink>
            <FooterNavLink href="#">Контакты</FooterNavLink>
            <FooterNavLink href="#">Наши возможности</FooterNavLink>
            <FooterNavLink href="#">О Нас</FooterNavLink>
          </FooterNav>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnLabel>Наши продукты</FooterColumnLabel>
          <FooterNav>
            <FooterNavLink href="#">ChatGPT для бизнеса</FooterNavLink>
            <FooterNavLink href="#">Агрегатор нейросетей</FooterNavLink>
            <FooterNavLink href="#">ChatGPT в Telegram</FooterNavLink>
          </FooterNav>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnLabel>Контакты</FooterColumnLabel>
          <FooterNav>
            <FooterNavLink href="#">
              <TgCircleIcon />
              @bothub_chat
            </FooterNavLink>
            <FooterNavLink href="#">
              <BotCircleIcon />
              @bothub_chat_bot
            </FooterNavLink>
            <FooterNavLink href="#">
              <EmailCircleIcon />
              email@bothub.chat
            </FooterNavLink>
            <FooterNavLink href="#">
              <MediumCircleIcon />   
              Blog
            </FooterNavLink>
          </FooterNav>
        </FooterColumn>
      </>
    )
  }
};

export default {
  title: 'UI Components/Footer',
  component: Footer,
  decorators: [StoryDecorator()],
  argTypes: {
    id: {
      table: {
        disable: true
      }
    },
    logo: {
      table: {
        disable: true
      }
    },
    nav: {
      table: {
        disable: true
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  }
} as FooterMeta;

import React from 'react';
import { IconList, IconsStyled, IconsTitle } from './styled';
import {
  AIIcon,
  Arrow2DownIcon,
  ArrowDownIcon, 
  ArrowNarrowDownIcon, 
  ArrowNarrowLeftIcon, 
  ArrowNarrowRightIcon, 
  ArrowNarrowUpIcon, 
  ArrowUpIcon, 
  BitcoinIcon, 
  BookmarksBigIcon, 
  BookmarksIcon, 
  BotCircleIcon, 
  BothubAggIcon, 
  BusinessColoredIcon, 
  CardIcon, 
  ChatIcon, 
  ChatsIcon, 
  CheckCircleIcon, 
  CheckSmallIcon, 
  CheckedIcon, 
  CloseIcon, 
  CoderIcon, 
  CopyIcon, 
  DashboardIcon, 
  EditIcon, 
  EmailCircleIcon, 
  ErrorBigIcon, 
  FiltersIcon, 
  FreeIcon, 
  Habr2Icon, 
  HabrIcon, 
  HotnessIcon, 
  InfoBigIcon, 
  InfoIcon, 
  LanguageIcon, 
  LinksIcon, 
  LockCircleIcon, 
  LogoutIcon, 
  MediumCircleIcon, 
  MenuDotIcon, 
  MenuIcon, 
  MinimizeIcon, 
  MjIcon, 
  Plus1Icon, 
  Plus2Icon, 
  PresetsBigIcon, 
  ReferalIcon, 
  RestoreIcon, 
  SearchCircleIcon, 
  SendIcon, 
  SettingsIcon, 
  StarIcon, 
  StopIcon, 
  SuccessBigIcon, 
  TariffIcon, 
  TgCircleIcon, 
  TgColoredIcon, 
  ThumbDownIcon, 
  ThumbUpIcon, 
  TrashIcon, 
  UnminimizeIcon, 
  UpdateIcon, 
  UserProfileIcon, 
  WarningBigIcon, 
  YoucassaIcon,
  LightIcon,
  DarkIcon
} from '@/ui/icons';
import { IconItem } from './item';
import { IconProvider, IconProviderProps } from '@/ui/components/icon';

export type IconsProps = IconProviderProps;

export const Icons: React.FC<IconsProps> = ({ ...props }) => (
  <IconProvider {...props}>
    <IconsStyled>
      <IconsTitle>Icons</IconsTitle>
      <IconList>
        <IconItem name="ArrowDownIcon">{ArrowDownIcon}</IconItem>
        <IconItem name="ArrowUpIcon">{ArrowUpIcon}</IconItem>
        <IconItem name="CheckSmallIcon">{CheckSmallIcon}</IconItem>
        <IconItem name="LanguageIcon">{LanguageIcon}</IconItem>
        <IconItem name="YoucassaIcon">{YoucassaIcon}</IconItem>
        <IconItem name="BitcoinIcon">{BitcoinIcon}</IconItem>
        <IconItem name="DashboardIcon">{DashboardIcon}</IconItem>
        <IconItem name="UserProfileIcon">{UserProfileIcon}</IconItem>
        <IconItem name="LogoutIcon">{LogoutIcon}</IconItem>
        <IconItem name="SendIcon">{SendIcon}</IconItem>
        <IconItem name="Plus1Icon">{Plus1Icon}</IconItem>
        <IconItem name="Plus2Icon">{Plus2Icon}</IconItem>
        <IconItem name="MenuIcon">{MenuIcon}</IconItem>
        <IconItem name="MenuDotIcon">{MenuDotIcon}</IconItem>
        <IconItem name="ArrowNarrowLeftIcon">{ArrowNarrowLeftIcon}</IconItem>
        <IconItem name="ArrowNarrowRightIcon">{ArrowNarrowRightIcon}</IconItem>
        <IconItem name="CloseIcon">{CloseIcon}</IconItem>
        <IconItem name="SettingsIcon">{SettingsIcon}</IconItem>
        <IconItem name="CheckCircleIcon">{CheckCircleIcon}</IconItem>
        <IconItem name="TgCircleIcon">{TgCircleIcon}</IconItem>
        <IconItem name="EmailCircleIcon">{EmailCircleIcon}</IconItem>
        <IconItem name="LockCircleIcon">{LockCircleIcon}</IconItem>
        <IconItem name="MediumCircleIcon">{MediumCircleIcon}</IconItem>
        <IconItem name="BotCircleIcon">{BotCircleIcon}</IconItem>
        <IconItem name="HabrIcon">{HabrIcon}</IconItem>
        <IconItem name="Habr2Icon">{Habr2Icon}</IconItem>
        <IconItem name="BothubAggIcon">{BothubAggIcon}</IconItem>
        <IconItem name="TgColoredIcon">{TgColoredIcon}</IconItem>
        <IconItem name="BusinessColoredIcon">{BusinessColoredIcon}</IconItem>
        <IconItem name="Arrow2DownIcon">{Arrow2DownIcon}</IconItem>
        <IconItem name="LinksIcon">{LinksIcon}</IconItem>
        <IconItem name="CheckedIcon">{CheckedIcon}</IconItem>
        <IconItem name="HotnessIcon">{HotnessIcon}</IconItem>
        <IconItem name="FreeIcon">{FreeIcon}</IconItem>
        <IconItem name="MinimizeIcon">{MinimizeIcon}</IconItem>
        <IconItem name="EditIcon">{EditIcon}</IconItem>
        <IconItem name="CopyIcon">{CopyIcon}</IconItem>
        <IconItem name="TrashIcon">{TrashIcon}</IconItem>
        <IconItem name="ChatsIcon">{ChatsIcon}</IconItem>
        <IconItem name="BookmarksBigIcon">{BookmarksBigIcon}</IconItem>
        <IconItem name="PresetsBigIcon">{PresetsBigIcon}</IconItem>
        <IconItem name="ReferalIcon">{ReferalIcon}</IconItem>
        <IconItem name="TariffIcon">{TariffIcon}</IconItem>
        <IconItem name="CoderIcon">{CoderIcon}</IconItem>
        <IconItem name="BookmarksIcon">{BookmarksIcon}</IconItem>
        <IconItem name="AIIcon">{AIIcon}</IconItem>
        <IconItem name="UnminimizeIcon">{UnminimizeIcon}</IconItem>
        <IconItem name="UpdateIcon">{UpdateIcon}</IconItem>
        <IconItem name="RestoreIcon">{RestoreIcon}</IconItem>
        <IconItem name="ChatIcon">{ChatIcon}</IconItem>
        <IconItem name="StopIcon">{StopIcon}</IconItem>
        <IconItem name="ThumbUpIcon">{ThumbUpIcon}</IconItem>
        <IconItem name="ThumbDownIcon">{ThumbDownIcon}</IconItem>
        <IconItem name="StarIcon">{StarIcon}</IconItem>
        <IconItem name="InfoBigIcon">{InfoBigIcon}</IconItem>
        <IconItem name="WarningBigIcon">{WarningBigIcon}</IconItem>
        <IconItem name="ErrorBigIcon">{ErrorBigIcon}</IconItem>
        <IconItem name="SuccessBigIcon">{SuccessBigIcon}</IconItem>
        <IconItem name="MjIcon">{MjIcon}</IconItem>
        <IconItem name="CardIcon">{CardIcon}</IconItem>
        <IconItem name="ArrowNarrowUpIcon">{ArrowNarrowUpIcon}</IconItem>
        <IconItem name="ArrowNarrowDownIcon">{ArrowNarrowDownIcon}</IconItem>
        <IconItem name="FiltersIcon">{FiltersIcon}</IconItem>
        <IconItem name="InfoIcon">{InfoIcon}</IconItem>
        <IconItem name="SearchCircleIcon">{SearchCircleIcon}</IconItem>
        <IconItem name="LightIcon">{LightIcon}</IconItem>
        <IconItem name="DarkIcon">{DarkIcon}</IconItem>
      </IconList>
    </IconsStyled>
  </IconProvider>
);

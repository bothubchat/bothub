import React from 'react';
import {
  ArticleIcon,
  CodeGenerationIcon,
  DashboardIcon,
  ImageGenerationIcon,
  StarsIcon,
  TextGenerationIcon
} from '@/ui/icons';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface MenuItemButton {
  type: 'button';
  onClick: () => void;
}

export interface MenuItemLink {
  type: 'link';
  href: string;
  children?: React.ReactNode;
}

export interface MenuItemCollapse {
  type: 'collapse';
  columns?: 1 | 2;
  children: Array<MenuItemChild>;
}
export type MenuItemChild = MenuItem & (MenuItemButton | MenuItemLink);

export type MenuItems = {
  id: string;
  label: string;
  children: Array<MenuItemChild | (MenuItem & MenuItemCollapse)>;
};

export const items: MenuItems[] = [
  {
    id: 'products',
    label: 'Продукты',
    children: [
      {
        id: 'ai-tools',
        label: 'ИИ Инструменты',
        icon: <StarsIcon />,
        type: 'collapse',
        columns: 1,
        children: [
          {
            id: 'text-generation',
            label: 'Генерация текста',
            icon: <TextGenerationIcon />,
            type: 'link',
            href: '/'
          },
          {
            id: 'image-generation',
            label: 'Генерация изображений',
            icon: <ImageGenerationIcon />,
            type: 'link',
            href: '/'
          },
          {
            id: 'code-generation',
            label: 'Генерация кода',
            icon: <CodeGenerationIcon />,
            type: 'link',
            href: '/'
          },
          {
            id: 'table-analysis',
            label: 'Анализ таблиц',
            icon: <CodeGenerationIcon />,
            type: 'link',
            href: '/'
          },
          {
            id: 'speech-synthesis',
            label: 'Синтез речи',
            icon: <CodeGenerationIcon />,
            type: 'link',
            href: '/'
          },
          {
            id: 'proofreading',
            label: 'Орфография и пунктуация',
            icon: <CodeGenerationIcon />,
            type: 'link',
            href: '/'
          },
          {
            id: 'task-solution',
            label: 'Решение задач',
            icon: <CodeGenerationIcon />,
            type: 'link',
            href: '/'
          },
          { id: 'all', label: 'Все инструменты', type: 'link', href: '/' }
        ]
      },
      {
        id: 'easy-writer',
        label: 'Easy Writer',
        type: 'collapse',
        icon: <ArticleIcon fill="#fff" />,
        columns: 2,
        children: [
          {
            id: 'poem',
            label: 'Сочинение  (350 - 500 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'essay',
            label: 'Эссе  (500 - 1000 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'speech',
            label: 'Доклад  (1000 - 2000 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'thesis',
            label: 'Реферат  (1500 - 3000 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'coursework',
            label: 'Курсовая работа  (5000 - 8000 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'article',
            label: 'Информационная статья  (от 1200 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'blog-post',
            label: 'Блог-пост  (600 - 1200 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'tutorial',
            label: 'Пошаговое руководство  (1000 - 2000 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'social-media-post',
            label: 'Пост для соцсетей  (50 - 300 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'ads',
            label: 'Рекламный текст  (500 - 1500 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: 'case',
            label: 'Кейс-стади  (800 - 2000 слов)',
            type: 'link',
            href: '/'
          },
          {
            id: ' review',
            label: 'Обзор  (800 - 1500 слов)',
            type: 'link',
            href: '/'
          }
        ]
      },
      {
        id: 'dashboard',
        label: 'ИИ Инструменты',
        icon: <DashboardIcon />,
        type: 'link',
        href: '/'
      }
    ]
  },
  {
    id: 'prices',
    label: 'Цены',
    children: []
  },
  {
    id: 'models',
    label: 'Модели',
    children: []
  },
  {
    id: 'business',
    label: 'Для бизнеса',
    children: []
  },
  {
    id: 'materials',
    label: 'Материалы',
    children: []
  },
  {
    id: 'company',
    label: 'Компания',
    children: []
  }
];

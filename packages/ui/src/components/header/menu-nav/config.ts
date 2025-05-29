import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  component?: React.ReactNode;
  columns?: 1 | 2;
  children?: MenuItem[];
}

export interface MenuItemButton {
  type: 'button';
  onClick: () => void;
}

export interface MenuItemLink {
  type: 'link';
  href: string;
}

export interface MenuItemBanner {
  type: 'banner';
  children: React.ReactNode;
}

export const items: MenuItem[] = [
  {
    id: 'products',
    label: 'Продукты',
    children: [
      {
        id: 'ai-tools',
        label: 'ИИ Инструменты',
        children: [
          { id: 'text-generation', label: 'Генерация текста' },
          { id: 'image-generation', label: 'Генерация изображений' },
          { id: 'code-generation', label: 'Генерация кода' },
          { id: 'table-analysis', label: 'Анализ таблиц' },
          { id: 'speech-synthesis', label: 'Синтез речи' },
          { id: 'proofreading', label: 'Орфография и пунктуация' },
          { id: 'task-solution', label: 'Решение задач' },
          { id: 'all', label: 'Все инструменты' }
        ]
      },
      {
        id: 'easy-writer',
        label: 'Easy Writer',
        columns: 2,
        children: [
          { id: 'poem', label: 'Сочинение  (350 - 500 слов)' },
          { id: 'essay', label: 'Эссе  (500 - 1000 слов)' },
          { id: 'speech', label: 'Доклад  (1000 - 2000 слов)' },
          { id: 'thesis', label: 'Реферат  (1500 - 3000 слов)' },
          { id: 'coursework', label: 'Курсовая работа  (5000 - 8000 слов)' },
          { id: 'article', label: 'Информационная статья  (от 1200 слов)' },
          { id: 'blog-post', label: 'Блог-пост  (600 - 1200 слов)' },
          {
            id: 'tutorial',
            label: 'Пошаговое руководство  (1000 - 2000 слов)'
          },
          {
            id: 'social-media-post',
            label: 'Пост для соцсетей  (50 - 300 слов)'
          },
          { id: 'ads', label: 'Рекламный текст  (500 - 1500 слов)' },
          { id: 'case', label: 'Кейс-стади  (800 - 2000 слов)' },
          { id: ' review', label: 'Обзор  (800 - 1500 слов)' }
        ]
      }
    ]
  },
  {
    id: 'prices',
    label: 'Цены',
    children: [
      { id: '1', label: 'Цена 1' },
      { id: '2', label: 'Цена 2' },
      { id: '3', label: 'Цена 3' }
    ]
  },
  {
    id: 'models',
    label: 'Модели',
    children: [
      { id: '1', label: 'Модель 1' },
      { id: '2', label: 'Модель 2' },
      { id: '3', label: 'Модель 3' }
    ]
  },
  {
    id: 'business',
    label: 'Для бизнеса',
    children: [
      { id: '1', label: 'Для бизнеса 1' },
      { id: '2', label: 'Для бизнеса 2' },
      { id: '3', label: 'Для бизнеса 3' }
    ]
  },
  {
    id: 'materials',
    label: 'Материалы',
    children: [
      { id: '1', label: 'Материал 1' },
      { id: '2', label: 'Материал 2' },
      { id: '3', label: 'Материал 3' }
    ]
  },
  {
    id: 'company',
    label: 'Компания',
    children: [
      { id: '1', label: 'Компания 1' },
      { id: '2', label: 'Компания 2' },
      { id: '3', label: 'Компания 3' }
    ]
  }
];

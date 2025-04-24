import {
  AcademyIcon,
  ClaudeIcon,
  CodeGenerationIcon,
  DashboardIcon,
  DeepSeekIcon,
  EssayGenerationIcon,
  FavoriteProfileIcon,
  Gpt4Icon,
  GridHorizontalIcon,
  GridVerticalIcon,
  GrokIcon,
  HappyRobotIcon,
  ImageGenerationIcon,
  IncludeContextIcon,
  ReportIcon,
  SpellingIcon,
  TextGenerationIcon
} from '@/ui/icons';
import {
  StartsIconMultiLevelMenu,
  ArticleIconMultiLevelMenu,
  TgCircleIconMultiLevelMenu,
  MultiLevelMenuStarIconBasic,
  MultiLevelMenuStarIconDeluxe,
  MultiLevelMenuStarIconElite,
  MultiLevelMenuStarIconPremium,
  MultiLevelMenuStarIconPlans,
  MultiLevelMenuFlexIcon,
  MultiLevelMenuActionChatIcon,
  MultiLevelMenuSetchelIcon,
  MultiLevelMenuReferalIcon,
  MultiLevelMenuGearIcon,
  MultiLevelMenuPublicIcon,
  MultiLevelMenuBlogCircleIcon,
  MultiLevelMenuBlogNewsIcon
} from '../styled';

export const menuItems = [
  {
    accordion_title: 'Продукты',
    children: [
      {
        title: 'ИИ Инструменты',
        icon: StartsIconMultiLevelMenu,
        children: [
          {
            title: 'Генерация текста',
            path: '#',
            icon: TextGenerationIcon
          },
          {
            title: 'Генерация изображения',
            path: '#',
            icon: ImageGenerationIcon
          },
          {
            title: 'Генерация кода',
            path: '#',
            icon: CodeGenerationIcon
          },
          {
            title: 'Все инструменты',
            path: '/models'
          }
        ]
      },
      {
        title: 'Easy Writer',
        icon: ArticleIconMultiLevelMenu,
        children: [
          {
            title: 'Сочинение',
            sub_title: '(350 - 500 слов)',
            path: '/easy_writer',
            icon: EssayGenerationIcon
          },
          {
            title: 'Эссе',
            sub_title: '(500 - 1000 слов)',
            path: '/easy_writer',
            icon: SpellingIcon
          },
          {
            title: 'Доклад',
            sub_title: '(1000 - 2000 слов)',
            path: '/easy_writer',
            icon: ReportIcon
          },
          {
            title: 'Реферат',
            sub_title: '(1500 - 3000 слов)',
            path: '/easy_writer',
            icon: TextGenerationIcon
          },
          {
            title: 'Все форматы',
            path: '/easy_writer'
          }
        ]
      },
      {
        title: 'Дашборд',
        path: '/dashboard',
        icon: DashboardIcon
      },
      {
        title: 'Telegram bot',
        path: 'https://t.me/bothub_chat_bot',
        icon: TgCircleIconMultiLevelMenu
      }
    ]
  },
  {
    accordion_title: 'Цены',
    children: [
      {
        title: 'Планы',
        icon: MultiLevelMenuStarIconPlans,
        children: [
          {
            title: 'Elite — 30 000 000 Caps',
            path: '/#plans',
            icon: MultiLevelMenuStarIconElite,
            description: 'Хватит, чтобы сгенерировать 12 000 страниц текста'
          },
          {
            title: 'Deluxe — 7 500 000 Caps',
            path: '/#plans',
            icon: MultiLevelMenuStarIconDeluxe,
            description: 'Хватит, чтобы сгенерировать 3 000 страниц текста'
          },
          {
            title: 'Premium — 3 000 000 Caps',
            path: '/#plans',
            icon: MultiLevelMenuStarIconPremium,
            description: 'Хватит, чтобы сгенерировать 1 200 страниц текста'
          },
          {
            title: 'Basic — 1 000 000 Caps',
            path: '/#plans',
            icon: MultiLevelMenuStarIconBasic,
            description: 'Хватит, чтобы сгенерировать 400 страниц текста'
          }
        ]
      },
      {
        title: 'На модели',
        path: '/models',
        icon: GridVerticalIcon
      }
    ]
  },
  {
    accordion_title: 'Модели',
    children: [
      {
        title: 'ChatGPT',
        icon: Gpt4Icon,
        children: [
          {
            title: 'o1',
            path: '/o1',
            icon: Gpt4Icon,
            description: 'Самая последняя и cильная модель от OpenAI.'
          },
          {
            title: 'o1-mini',
            path: '/o1-mini',
            icon: Gpt4Icon,
            description:
              'Уменьшенная и более дешевая версия самой лучшей модели OpenAi, оптимизированная для более быстрого реагирования.'
          },
          {
            title: 'GPT-4o',
            path: '/gpt-4o',
            icon: Gpt4Icon,
            description:
              'Модель c высоким уровнем креативности, адаптированная для  написания человечных текстов. '
          }
        ]
      },
      {
        title: 'Claude',
        path: '#',
        icon: ClaudeIcon,
        children: [
          {
            title: 'Elite',
            path: '#',
            icon: ''
          },
          {
            title: 'Deluxe',
            path: '#',
            icon: ''
          },
          {
            title: 'Premium',
            path: '#',
            icon: ''
          },
          {
            title: 'Basic',
            path: '#',
            icon: ''
          }
        ]
      },
      {
        title: 'DeepSeek',
        path: '#',
        icon: DeepSeekIcon,
        children: [
          {
            title: 'Elite',
            path: '#',
            icon: ''
          },
          {
            title: 'Deluxe',
            path: '#',
            icon: ''
          },
          {
            title: 'Premium',
            path: '#',
            icon: ''
          },
          {
            title: 'Basic',
            path: '#',
            icon: ''
          }
        ]
      },
      {
        title: 'Flux',
        path: '#',
        icon: MultiLevelMenuFlexIcon,
        children: [
          {
            title: 'Elite',
            path: '#',
            icon: ''
          },
          {
            title: 'Deluxe',
            path: '#',
            icon: ''
          },
          {
            title: 'Premium',
            path: '#',
            icon: ''
          },
          {
            title: 'Basic',
            path: '#',
            icon: ''
          }
        ]
      },
      {
        title: 'Grok',
        path: '#',
        icon: GrokIcon,
        children: [
          {
            title: 'Elite',
            path: '#',
            icon: ''
          },
          {
            title: 'Deluxe',
            path: '#',
            icon: ''
          },
          {
            title: 'Premium',
            path: '#',
            icon: ''
          },
          {
            title: 'Basic',
            path: '#',
            icon: ''
          }
        ]
      },
      {
        title: 'Все модели',
        path: '/models'
      }
    ]
  },
  {
    accordion_title: 'Для бизнеса',
    children: [
      {
        title: 'Услуги',
        icon: GridHorizontalIcon,
        children: [
          {
            title: 'Корпоротивная подписка',
            path: '#',
            icon: MultiLevelMenuSetchelIcon,
            description:
              'Тариф с приоритетной поддержкой, индивидуальным подходом и контролем расхода токенов по членам команды'
          },
          {
            title: 'Соглашение о неразглашении',
            path: '/privacy-policy',
            icon: IncludeContextIcon,
            description:
              'NDA в формате дополнительного соглашения для защиты ваших данных'
          },
          {
            title: 'Партнерская программа',
            path: '#',
            icon: MultiLevelMenuReferalIcon,
            description: 'Зарабатывайте на рекомендациях вместе с нами'
          }
        ]
      },
      {
        title: 'Инвесторам',
        path: '/bothub_founder',
        icon: FavoriteProfileIcon
      },
      {
        title: 'Поддержка',
        path: 'https://t.me/bothub_chat/25302',
        icon: MultiLevelMenuActionChatIcon
      }
    ]
  },
  {
    accordion_title: 'Материалы',
    linkIcon_hidden: true,
    children: [
      {
        title: 'API',
        path: '/api/documentation/ru',
        icon: MultiLevelMenuGearIcon
      },
      {
        title: 'Академия Bothub',
        path: 'https://academy.bothub.chat/',
        icon: AcademyIcon
      },
      {
        title: 'Сообщество',
        path: 'https://t.me/bothub_chat',
        icon: MultiLevelMenuPublicIcon
      }
    ]
  },
  {
    accordion_title: 'Компания',
    linkIcon_hidden: true,
    children: [
      {
        title: 'О нас',
        path: '#',
        icon: HappyRobotIcon
      },
      {
        title: 'Блог',
        path: '/about-us',
        icon: MultiLevelMenuBlogCircleIcon
      },
      {
        title: 'Новости AI',
        path: 'https://t.me/bothub',
        icon: MultiLevelMenuBlogNewsIcon
      },
      {
        title: 'Связаться',
        path: '/contacts',
        icon: MultiLevelMenuActionChatIcon
      }
    ]
  }
];

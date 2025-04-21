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
    first_level: [
      {
        title: 'ИИ Инструменты',
        path: '#',
        icon: <StartsIconMultiLevelMenu size={18} />,
        children: [
          {
            title: 'Генерация текста',
            path: '#',
            icon: <TextGenerationIcon size={18} />
          },
          {
            title: 'Генерация изображения',
            path: '#',
            icon: <ImageGenerationIcon size={18} />
          },
          {
            title: 'Генерация кода',
            path: '#',
            icon: <CodeGenerationIcon size={18} />
          },
          {
            title: 'Все инструменты',
            path: '#'
          }
        ]
      },
      {
        title: 'Easy Writer',
        path: '#',
        icon: <ArticleIconMultiLevelMenu size={18} />,
        children: [
          {
            title: 'Сочинение',
            sub_title: '(350 - 500 слов)',
            path: '',
            icon: <EssayGenerationIcon size={18} />
          },
          {
            title: 'Эссе',
            sub_title: '(500 - 1000 слов)',
            path: '',
            icon: <SpellingIcon size={18} />
          },
          {
            title: 'Доклад',
            sub_title: '(1000 - 2000 слов)',
            path: '',
            icon: <ReportIcon />
          },
          {
            title: 'Реферат',
            sub_title: '(1500 - 3000 слов)',
            path: '',
            icon: <TextGenerationIcon size={18} />
          },
          {
            title: 'Все форматы',
            path: ''
          }
        ]
      },
      {
        title: 'Дашборд',
        path: '#',
        icon: <DashboardIcon size={18} />
      },
      {
        title: 'Telegram bot',
        path: '#',
        icon: <TgCircleIconMultiLevelMenu size={18} />
      }
    ]
  },
  {
    accordion_title: 'Цены',
    first_level: [
      {
        title: 'Планы',
        path: '#',
        icon: <MultiLevelMenuStarIconPlans size={18} />,
        children: [
          {
            title: 'Elite — 30 000 000 Caps',
            path: '#',
            icon: <MultiLevelMenuStarIconElite size={18} />,
            description: 'Хватит, чтобы сгенерировать 12 000 страниц текста'
          },
          {
            title: 'Deluxe — 7 500 000 Caps',
            path: '#',
            icon: <MultiLevelMenuStarIconDeluxe size={18} />,
            description: 'Хватит, чтобы сгенерировать 3 000 страниц текста'
          },
          {
            title: 'Premium — 3 000 000 Caps',
            path: '#',
            icon: <MultiLevelMenuStarIconPremium size={18} />,
            description: 'Хватит, чтобы сгенерировать 1 200 страниц текста'
          },
          {
            title: 'Basic — 1 000 000 Caps',
            path: '#',
            icon: <MultiLevelMenuStarIconBasic size={18} />,
            description: 'Хватит, чтобы сгенерировать 400 страниц текста'
          }
        ]
      },
      {
        title: 'На модели',
        path: '#',
        icon: <GridVerticalIcon />
      }
    ]
  },
  {
    accordion_title: 'Модели',
    first_level: [
      {
        title: 'ChatGPT',
        path: '#',
        icon: <Gpt4Icon size={18} />,
        children: [
          {
            title: 'o1',
            path: '#',
            icon: <Gpt4Icon size={18} />,
            description: 'Самая последняя и cильная модель от OpenAI.'
          },
          {
            title: 'o1-mini',
            path: '#',
            icon: <Gpt4Icon size={18} />,
            description:
              'Уменьшенная и более дешевая версия самой лучшей модели OpenAi, оптимизированная для более быстрого реагирования.'
          },
          {
            title: 'GPT-4o',
            path: '#',
            icon: <Gpt4Icon size={18} />,
            description:
              'Модель c высоким уровнем креативности, адаптированная для  написания человечных текстов. '
          }
        ]
      },
      {
        title: 'Claude',
        path: '#',
        icon: <ClaudeIcon size={18} />,
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
        icon: <DeepSeekIcon />,
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
        icon: <MultiLevelMenuFlexIcon size={18} />,
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
        icon: <GrokIcon />,
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
        path: '#',
        icon: ''
      }
    ]
  },
  {
    accordion_title: 'Для бизнеса',
    first_level: [
      {
        title: 'Услуги',
        path: '#',
        icon: <GridHorizontalIcon />,
        children: [
          {
            title: 'Корпоротивная подписка',
            path: '#',
            icon: <MultiLevelMenuSetchelIcon size={18} />,
            description:
              'Тариф с приоритетной поддержкой, индивидуальным подходом и контролем расхода токенов по членам команды'
          },
          {
            title: 'Соглашение о неразглашении',
            path: '#',
            icon: <IncludeContextIcon size={18} />,
            description:
              'NDA в формате дополнительного соглашения для защиты ваших данных'
          },
          {
            title: 'Партнерская программа',
            path: '#',
            icon: <MultiLevelMenuReferalIcon size={18} />,
            description: 'Зарабатывайте на рекомендациях вместе с нами'
          }
        ]
      },
      {
        title: 'Инвесторам',
        path: '#',
        icon: <FavoriteProfileIcon size={18} />
      },
      {
        title: 'Поддержка',
        path: '#',
        icon: <MultiLevelMenuActionChatIcon size={18} />
      }
    ]
  },
  {
    accordion_title: 'Материалы',
    first_level: [
      {
        title: 'API',
        path: '#',
        icon: <MultiLevelMenuGearIcon size={18} />
      },
      {
        title: 'Академия Bothub',
        path: '#',
        icon: <AcademyIcon />
      },
      {
        title: 'Сообщество',
        path: '#',
        icon: <MultiLevelMenuPublicIcon size={18} />
      }
    ]
  },
  {
    accordion_title: 'Компания',
    first_level: [
      {
        title: 'О нас',
        path: '#',
        icon: <HappyRobotIcon size={18} />
      },
      {
        title: 'Блог',
        path: '#',
        icon: <MultiLevelMenuBlogCircleIcon size={18} />
      },
      {
        title: 'Новости AI',
        path: '#',
        icon: <MultiLevelMenuBlogNewsIcon size={18} />
      },
      {
        title: 'Связаться',
        path: '#',
        icon: <MultiLevelMenuActionChatIcon size={18} />
      }
    ]
  }
];

import {
  CodeGenerationIcon,
  DashboardIcon,
  Gpt4Icon,
  GridVerticalIcon,
  ImageGenerationIcon,
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
  MultiLevelMenuStarIconPlans
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
        icon: <ArticleIconMultiLevelMenu size={18} />
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
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
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
      }
    ]
  },
  {
    accordion_title: 'Для бизнеса',
    first_level: [
      {
        title: 'Планы',
        path: '#',
        icon: '',
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
      }
    ]
  },
  {
    accordion_title: 'Материалы',
    first_level: [
      {
        title: 'Планы',
        path: '#',
        icon: '',
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
      }
    ]
  },
  {
    accordion_title: 'Компания',
    first_level: [
      {
        title: 'Планы',
        path: '#',
        icon: '',
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
      }
    ]
  }
];

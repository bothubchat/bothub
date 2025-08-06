import { ColorSchemes, DefaultTheme, Theme } from './types';

export const defaultTheme: DefaultTheme = {
  mode: 'dark',
  scheme: 'standard',
  bright: false,
  colors: {
    base: {
      black: '#0E0C15',
      white: '#FFFFFF',
    },
    accent: {
      primary: '#1C64F2',
      primaryLight: '#4785ff',
      strong: '#0A4FD1',
      strongDown: '#073EAF',
    },
    grayScale: {
      gray1: '#616D8D',
      gray2: '#313E62',
      gray3: '#222B44',
      gray4: '#121825',
      gray5: '#374151',
      gray6: '#9CA3AF',
      gray7: '#171E2F',
    },
    premiumGradient: 'linear-gradient(90deg, #1C64F2 -0.39%, #D41CF2 99.61%)',
    gradient: {
      basic: 'linear-gradient(90deg, #00247D 0%, #1C64F2 100%)',
      light: 'linear-gradient(90deg, #073DC3 0%, #4785FF 100%)',
      premium: 'linear-gradient(90deg, #4785FF 0%, #7740F2 100%)',
      deluxe: 'linear-gradient(90deg, #5728FF 0%, #A750FF 100%)',
      enterprise: 'linear-gradient(90deg, #6E1AFF -0.39%, #D967FF 99.61%)',
      elite: 'linear-gradient(90deg, #1C64F2 0%, #D41CF2 100%)',
      enterprise20:
        'linear-gradient(90deg, rgba(110, 26, 255, 0.2) -0.39%, rgba(217, 103, 255, 0.2) 99.61%)',
      elite20:
        'linear-gradient(90deg, rgba(28,100,242,0.2) 0%, rgba(212,28,242,0.2) 100%)',
    },
    critic: '#FE4242',
    orange: '#F29C1C',
    purple: '#941CF2',
    aqua: '#1CB2F2',
    green: '#1ABB34',
    gpt3: '#28A08C',
    gpt4: '#735FFA',
    custom: {
      background: '#0E0C15',
      message: {
        user: {
          background: '#1C64F2',
          text: '#FFFFFF',
        },
        assistant: {
          text: '#FFFFFF',
        },
      },
      icon: '#313E62',
      interface: {
        text: '#FFFFFF',
      },
    },
  },
  tablet: {
    maxWidth: '1060px',
  },
  mobile: {
    maxWidth: '550px',
    minWidth: '400px',
  },
  zIndex: {
    scrollbarShadow: 2,
    headerMenu: 3,
    header: 4,
    backdrop: 5,
    menu: 6,
    modal: 7,
    select: 8,
    notifications: 9,
    tooltip: 10,
  },
  header: {
    height: '89px',
    mobile: {
      height: '70px',
    },
  },
  dashboard: {
    header: {
      height: '82px',
      tablet: {
        height: '76px',
      },
      mobile: {
        height: '70px',
      },
    },
    chat: {
      containerWidth: '1009px',
    },
    tablet: {
      maxWidth: '1060px',
    },
    miniTablet: {
      maxWidth: '900px',
    },
    mobile: {
      maxWidth: '600px',
      minWidth: '400px',
    },
  },
};

export const standardDark: Theme = {
  ...defaultTheme,
  mode: 'dark',
  default: defaultTheme,
};

export const standardLight: Theme = {
  ...defaultTheme,
  mode: 'light',
  default: defaultTheme,
  colors: {
    ...defaultTheme.colors,
    base: {
      black: '#FFFFFF',
      white: '#0E0C15',
    },
    accent: {
      primary: '#1C64F2',
      primaryLight: '#4785FF',
      strong: '#0A4FD1',
      strongDown: '#073EAF',
    },
    grayScale: {
      gray1: '#ADB8C0',
      gray2: '#CDD5DA',
      gray3: '#DBE0E4',
      gray4: '#F5F6F7',
      gray5: '#ADB5BD',
      gray6: '#DDE8F3',
      gray7: '#E6E9EC',
    },
    custom: {
      background: '#FFFFFF',
      message: {
        user: {
          background: '#1C64F2',
          text: '#FFFFFF',
        },
        assistant: {
          text: '#0E0C15',
        },
      },
      icon: '#CDD5DA',
      interface: {
        text: '#0E0C15',
      },
    },
  },
};

export const THEMES: Omit<ColorSchemes, 'custom'> = {
  standard: {
    dark: standardDark,
    light: standardLight,
  },
  strawberry: {
    dark: {
      ...standardDark,
      scheme: 'strawberry',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          black: '#30191E',
          white: '#FFFFFF',
        },
        accent: {
          primary: '#FFB1C0',
          primaryLight: '#FFB1C0',
          strong: '#D88A99',
          strongDown: '#C07483',
        },
        grayScale: {
          gray1: '#9F6D78',
          gray2: '#9F6D78',
          gray3: '#6E474F',
          gray4: '#4F3439',
          gray5: '#7D5058',
          gray6: '#BF8E99',
          gray7: '#3A2428',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'strawberry',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#924759',
          primaryLight: '#F3D2D7',
          strong: '#7A3A4A',
          strongDown: '#672F3D',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#F3D2D7',
        },
      },
    },
  },
  rose: {
    dark: {
      ...standardDark,
      scheme: 'rose',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#281C1F',
        },
        accent: {
          primary: '#DDBFC3',
          primaryLight: '#DDBFC3',
          strong: '#BEA0A4',
          strongDown: '#A68A8E',
        },
        grayScale: {
          gray1: '#AF969C',
          gray2: '#AF969C',
          gray3: '#5E4D50',
          gray4: '#46383A',
          gray5: '#8C777B',
          gray6: '#C9B5BA',
          gray7: '#352A2D',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'rose',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#70585C',
          primaryLight: '#E5D0D3',
          strong: '#5D494D',
          strongDown: '#4E3D40',
        },
      },
    },
  },
  orange: {
    dark: {
      ...standardDark,
      scheme: 'orange',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#362112',
        },
        accent: {
          primary: '#FFB787',
          primaryLight: '#FFB787',
          strong: '#D99A71',
          strongDown: '#BD855F',
        },
        grayScale: {
          gray1: '#A7784D',
          gray2: '#A7784D',
          gray3: '#724E35',
          gray4: '#4F3625',
          gray5: '#85603E',
          gray6: '#C29A73',
          gray7: '#2A1A10',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'orange',
      bright: true,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#E9A97E',
          primaryLight: '#F6DAC8',
          strong: '#C58D68',
          strongDown: '#A67858',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#F6DAC8',
        },
      },
    },
  },
  milktea: {
    dark: {
      ...standardDark,
      scheme: 'milktea',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#281D16',
        },
        accent: {
          primary: '#DEC1B1',
          primaryLight: '#DEC1B1',
          strong: '#BEA395',
          strongDown: '#A68D80',
        },
        grayScale: {
          gray1: '#AE9D8D',
          gray2: '#AE9D8D',
          gray3: '#5F4E44',
          gray4: '#463931',
          gray5: '#8B7E72',
          gray6: '#C9B9AA',
          gray7: '#211713',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'milktea',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#7A5641',
          primaryLight: '#E7D7CE',
          strong: '#654737',
          strongDown: '#553C2F',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#E7D7CE',
        },
      },
    },
  },
  banana: {
    dark: {
      ...standardDark,
      scheme: 'banana',
      bright: true,
      colors: {
        ...standardLight.colors,
        base: {
          white: '#FFFFFF',
          black: '#251F07',
        },
        accent: {
          primary: '#DEC663',
          primaryLight: '#DEC663',
          strong: '#BDA752',
          strongDown: '#A39147',
        },
        grayScale: {
          gray1: '#9F8C58',
          gray2: '#9F8C58',
          gray3: '#5D5123',
          gray4: '#423B20',
          gray5: '#7F7047',
          gray6: '#BAA876',
          gray7: '#1D1905',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'banana',
      bright: true,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#F3D25B',
          primaryLight: '#F2EBD7',
          strong: '#D0B34B',
          strongDown: '#B39A41',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#F2EBD7',
        },
      },
    },
  },
  apple: {
    dark: {
      ...standardDark,
      scheme: 'apple',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#1A2517',
        },
        accent: {
          primary: '#9BD888',
          primaryLight: '#9BD888',
          strong: '#83B971',
          strongDown: '#719F61',
        },
        grayScale: {
          gray1: '#7CA87E',
          gray2: '#7CA87E',
          gray3: '#405B39',
          gray4: '#33402F',
          gray5: '#638664',
          gray6: '#9BC49D',
          gray7: '#141E11',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'apple',
      bright: true,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#89CE73',
          primaryLight: '#D7E8CD',
          strong: '#73AF60',
          strongDown: '#629551',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#D7E8CD',
        },
      },
    },
  },
  swamp: {
    dark: {
      ...standardDark,
      scheme: 'swamp',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#1B211A',
        },
        accent: {
          primary: '#BECAB8',
          primaryLight: '#BECAB8',
          strong: '#A0AB9B',
          strongDown: '#8A9485',
        },
        grayScale: {
          gray1: '#8EA28F',
          gray2: '#8EA28F',
          gray3: '#4B5747',
          gray4: '#373D35',
          gray5: '#717E72',
          gray6: '#ADBDAE',
          gray7: '#151A14',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'swamp',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#566253',
          primaryLight: '#DEE5D8',
          strong: '#475244',
          strongDown: '#3B4539',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#DEE5D8',
        },
      },
    },
  },
  aquamarine: {
    dark: {
      ...standardDark,
      scheme: 'aquamarine',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#0D2220',
        },
        accent: {
          primary: '#69DBCD',
          primaryLight: '#69DBCD',
          strong: '#57BAAD',
          strongDown: '#4A9F94',
        },
        grayScale: {
          gray1: '#4F8E8E',
          gray2: '#4F8E8E',
          gray3: '#285A53',
          gray4: '#153531',
          gray5: '#3F7171',
          gray6: '#76ACAC',
          gray7: '#091A19',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'aquamarine',
      bright: true,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#66CABC',
          primaryLight: '#DDECE9',
          strong: '#54A99D',
          strongDown: '#489085',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#DDECE9',
        },
      },
    },
  },
  mountain: {
    dark: {
      ...standardDark,
      scheme: 'mountain',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#1E2729',
        },
        accent: {
          primary: '#BCD0D3',
          primaryLight: '#BCD0D3',
          strong: '#9FB1B4',
          strongDown: '#88999B',
        },
        grayScale: {
          gray1: '#84A1A8',
          gray2: '#84A1A8',
          gray3: '#4D595C',
          gray4: '#343D3F',
          gray5: '#697F85',
          gray6: '#A1BDC3',
          gray7: '#181F21',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'mountain',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#276470',
          primaryLight: '#DDE8EA',
          strong: '#20535D',
          strongDown: '#1B454E',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#DDE8EA',
        },
      },
    },
  },
  lake: {
    dark: {
      ...standardDark,
      scheme: 'lake',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#1D2636',
        },
        accent: {
          primary: '#AAC7FF',
          primaryLight: '#AAC7FF',
          strong: '#8FA8D9',
          strongDown: '#7B91BA',
        },
        grayScale: {
          gray1: '#7B8BB8',
          gray2: '#7B8BB8',
          gray3: '#475772',
          gray4: '#333C4D',
          gray5: '#626F93',
          gray6: '#96A7D1',
          gray7: '#161E2B',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'lake',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#3A5E98',
          primaryLight: '#D6E0F2',
          strong: '#304E80',
          strongDown: '#29426D',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#D6E0F2',
        },
      },
    },
  },
  iris: {
    dark: {
      ...standardDark,
      scheme: 'iris',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#231C2F',
        },
        accent: {
          primary: '#D4BBFF',
          primaryLight: '#D4BBFF',
          strong: '#B49FD9',
          strongDown: '#9A88BA',
        },
        grayScale: {
          gray1: '#896FB4',
          gray2: '#896FB4',
          gray3: '#4C415E',
          gray4: '#3F384C',
          gray5: '#6D5990',
          gray6: '#A389CF',
          gray7: '#1A1524',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'iris',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#6A5294',
          primaryLight: '#EADEF7',
          strong: '#58447C',
          strongDown: '#4A3A69',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#EADEF7',
        },
      },
    },
  },
  peony: {
    dark: {
      ...standardDark,
      scheme: 'peony',
      bright: true,
      colors: {
        ...standardDark.colors,
        base: {
          white: '#FFFFFF',
          black: '#2B1A28',
        },
        accent: {
          primary: '#F6B0EA',
          primaryLight: '#F6B0EA',
          strong: '#D295C8',
          strongDown: '#B57FAC',
        },
        grayScale: {
          gray1: '#BF6FB7',
          gray2: '#BF6FB7',
          gray3: '#684762',
          gray4: '#493545',
          gray5: '#985992',
          gray6: '#D489CD',
          gray7: '#21141F',
        },
      },
    },
    light: {
      ...standardLight,
      scheme: 'peony',
      bright: false,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#834A7D',
          primaryLight: '#F7DAEF',
          strong: '#6D3D69',
          strongDown: '#5C3358',
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#F7DAEF',
        },
      },
    },
  },
};

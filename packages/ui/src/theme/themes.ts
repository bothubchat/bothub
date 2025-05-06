import { ColorSchemes, DefaultTheme, Theme } from './types';

export const defaultTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    base: {
      black: '#0E0C15',
      white: '#FFFFFF'
    },
    accent: {
      primary: '#1C64F2',
      primaryLight: '#4785ff',
      strong: '#073CA4',
      strongDown: '#0E3176'
    },
    grayScale: {
      gray1: '#616D8D',
      gray2: '#313E62',
      gray3: '#222B44',
      gray4: '#121825',
      gray5: '#374151',
      gray6: '#9CA3AF',
      gray7: '#171E2F'
    },
    premiumGradient: 'linear-gradient(90deg, #1C64F2 -0.39%, #D41CF2 99.61%)',
    gradient: {
      basic: 'linear-gradient(90deg, #00247D 0%, #1C64F2 100%)',
      light: 'linear-gradient(90deg, #073DC3 0%, #4785FF 100%)',
      premium: 'linear-gradient(90deg, #4785FF 0%, #7740F2 100%)',
      deluxe: 'linear-gradient(90deg, #5728FF 0%, #A750FF 100%)',
      elite: 'linear-gradient(90deg, #1C64F2 0%, #D41CF2 100%)',
      elite20:
        'linear-gradient(90deg, rgba(28,100,242,0.2) 0%, rgba(212,28,242,0.2) 100%)'
    },
    critic: '#FE4242',
    orange: '#F29C1C',
    purple: '#941CF2',
    aqua: '#1CB2F2',
    green: '#1ABB34',
    gpt3: '#28A08C',
    gpt4: '#735FFA'
  },
  tablet: {
    maxWidth: '1060px'
  },
  mobile: {
    maxWidth: '550px',
    minWidth: '400px'
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
    tooltip: 10
  },
  header: {
    height: '89px',
    mobile: {
      height: '70px'
    }
  },
  dashboard: {
    header: {
      height: '82px',
      tablet: {
        height: '76px'
      },
      mobile: {
        height: '70px'
      }
    },
    chat: {
      containerWidth: '1009px'
    },
    tablet: {
      maxWidth: '1060px'
    },
    miniTablet: {
      maxWidth: '900px'
    },
    mobile: {
      maxWidth: '600px',
      minWidth: '400px'
    }
  }
};

const standardDark: Theme = {
  ...defaultTheme,
  mode: 'dark',
  default: defaultTheme
};

const standardLight: Theme = {
  ...defaultTheme,
  mode: 'light',
  default: defaultTheme,
  colors: {
    ...defaultTheme.colors,
    base: {
      black: '#FFFFFF',
      white: '#0E0C15'
    },
    accent: {
      primary: '#1C64F2',
      primaryLight: '#4785FF',
      strong: '#073CA4',
      strongDown: '#0E3176'
    },
    grayScale: {
      gray1: '#ADB8C0',
      gray2: '#CDD5DA',
      gray3: '#DBE0E4',
      gray4: '#F5F6F7',
      gray5: '#ADB5BD',
      gray6: '#DDE8F3',
      gray7: '#E6E9EC'
    }
  }
};

export const themes: ColorSchemes = {
  standard: {
    dark: standardDark,
    light: standardLight
  },
  strawberry: {
    dark: {
      ...standardDark,
      colors: {
        ...standardDark.colors,
        base: {
          black: '#30191E',
          white: '#FFFFFF'
        },
        accent: {
          primary: '#FFB1C0',
          primaryLight: '#FFB1C080',
          strong: '#FFB1C0',
          strongDown: '#FFB1C0'
        },
        grayScale: {
          gray1: '#9F6D78',
          gray2: '#9F6D78',
          gray3: '#6E474F',
          gray4: '#4F3439',
          gray5: '#9F6D78',
          gray6: '#9F6D78',
          gray7: '#9F6D78'
        }
      }
    },
    light: {
      ...standardLight,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#924759',
          primaryLight: '#F3D2D7',
          strong: '#924759',
          strongDown: '#924759'
        },
        grayScale: {
          ...standardLight.colors.grayScale,
          gray3: '#F3D2D7'
        }
      }
    }
  },
  rose: {
    dark: {
      ...standardDark,
      colors: {
        ...standardDark.colors,
        accent: {
          primary: '#DDBFC3',
          primaryLight: '#DDBFC3',
          strong: '#DDBFC3',
          strongDown: '#DDBFC3'
        },
        grayScale: {
          gray1: '#AF969C',
          gray2: '#AF969C',
          gray3: '#5E4D50',
          gray4: '#46383A',
          gray5: '#AF969C',
          gray6: '#AF969C',
          gray7: '#AF969C'
        }
      }
    },
    light: {
      ...standardLight,
      colors: {
        ...standardLight.colors,
        accent: {
          primary: '#70585C',
          primaryLight: '#E5D0D3',
          strong: '#70585C',
          strongDown: '#70585C'
        }
      }
    }
  }
};

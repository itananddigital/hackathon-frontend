'use client'
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  gray: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#718096',
    600: '#4a5568',
    700: '#2d3748',
    800: '#1a202c',
    900: '#171923',
  },
  brand: {
    50: '#EBF8FF',
    100: '#BEE3F8',
    200: '#90CDF4',
    300: '#63B3ED',
    400: '#4299E1',
    500: '#3182CE',
    600: '#2B6CB0',
    700: '#2C5282',
    800: '#2A4365',
    900: '#1A365D',
  },
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
      },
      ghost: {
        color: 'gray.300',
        _hover: {
          bg: 'gray.800',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'gray.800',
        color: 'white',
        borderRadius: 'md',
      },
      header: {
        paddingBottom: 2,
      },
      body: {
        paddingTop: 2,
      },
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        bg: 'gray.900',
        color: 'white',
        borderRadius: 'md',
      },
      header: {
        borderBottom: '1px solid',
        borderColor: 'gray.700',
      },
      footer: {
        borderTop: '1px solid',
        borderColor: 'gray.700',
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          bg: 'gray.800',
          borderColor: 'gray.700',
          color: 'white',
          _hover: {
            borderColor: 'gray.600',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
  },
};

// Global style overrides
const styles = {
  global: {
    body: {
      bg: 'gray.900',
      color: 'white',
    },
    '*::selection': {
      bg: 'brand.500',
      color: 'white',
    },
  },
};

// Typography
const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
};

// Complete theme configuration
const theme = extendTheme({
  config,
  colors,
  components,
  styles,
  fonts,
});

export default theme;
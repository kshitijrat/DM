'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps
} from 'next-themes';
import PropTypes from 'prop-types';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}

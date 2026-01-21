import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

/**
 * Storybook Manager Configuration
 * Sets the Storybook UI to dark theme to match SpendWise AI
 */
addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'SpendWise AI',
    brandUrl: '/',
    brandTarget: '_self',
    
    // Colors
    colorPrimary: '#10b981',      // emerald-500
    colorSecondary: '#14b8a6',    // teal-500
    
    // UI
    appBg: '#0f172a',             // slate-900
    appContentBg: '#1e293b',      // slate-800
    appBorderColor: '#334155',    // slate-700
    appBorderRadius: 8,
    
    // Typography
    fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontCode: '"Fira Code", "SF Mono", monospace',
    
    // Text colors
    textColor: '#f8fafc',         // slate-50
    textInverseColor: '#0f172a',  // slate-900
    textMutedColor: '#94a3b8',    // slate-400
    
    // Toolbar
    barTextColor: '#94a3b8',      // slate-400
    barSelectedColor: '#10b981',  // emerald-500
    barBg: '#1e293b',             // slate-800
    
    // Form colors
    inputBg: '#1e293b',           // slate-800
    inputBorder: '#334155',       // slate-700
    inputTextColor: '#f8fafc',    // slate-50
    inputBorderRadius: 6,
  },
  
  // Sidebar configuration
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
});

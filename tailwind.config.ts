import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        code: ['Source Code Pro', "monospace"]
      },
      colors: {
        "background": "#282c34",
        "sidebar": "#21252b",
        "separator" : "#424857"
      },
    }
  },

  plugins: [typography, forms, containerQueries]
} satisfies Config;

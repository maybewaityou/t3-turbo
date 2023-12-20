/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}

/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  body: {
    // WebkitTapHighlightColor: theme`colors.purple.500`,

    margin: 0,
    display: 'flex',
    placeItems: 'center',
    minWidth: '320px',
    minHeight: '100vh',

    ...tw`antialiased`,
  },
  ':root': {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    lineHeight: 1.5,
    fontWeight: 400,

    colorScheme: 'light dark',
    color: 'rgba(255, 255, 255, 0.87)',
    backgroundColor: '#242424',

    fontSynthesis: 'none',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',
  },
  '#root': {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  },
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles

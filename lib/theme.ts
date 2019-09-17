export default {
  fonts: {
    body: '"Source Sans Pro", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    monospace: '"Fira Code", monospace',
    heading: 'inherit'
  },
  radii: {
    small: 0,
    large: 40
  },
  buttons: {
    default: {
      borderRadius: 'large',
      fontWeight: 'bold'
    },
    primary: {
      background: 'black',
      color: 'white',
      variant: 'buttons.default'
    },
    secondary: {
      color: 'white',
      background: 'blue',
      variant: 'buttons.default'
    }
  },
  fontSizes: [12, 16, 20, 24, 'calc(1.8em + 2vw)', 'calc(3em + 5vw)'],
  space: [0, 4, 8, 14, 24, 36]
}

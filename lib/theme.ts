export default {
  fonts: {
    body: '"Source Sans Pro", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    monospace: '"Fira Code", monospace',
    heading: 'inherit'
  },
  radii: {
    small: 6,
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
  space: [0, 4, 8, 14, 24, 36]
}

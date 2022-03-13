module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
    transform: {
      md: (content) => {
        return remark().process(content)
      }
    }
  },
  // ...
}

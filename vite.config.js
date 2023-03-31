import string from 'vite-plugin-string'

export default {
  plugins: [
    string({
      include: '**/*.glsl',
    }),
  ],
}
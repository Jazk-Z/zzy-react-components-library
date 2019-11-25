import { configure } from '@storybook/react'
configure(require.context('../packages/components', true, /\.scss$/), module)

// automatically import all files ending in *.stories.js
configure(require.context('../packages/components', true, /\.stories\.tsx$/), module)

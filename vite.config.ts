import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkGfm,      // GitHub Flavored Markdown
          remarkMath,     // Math notation
        ],
        rehypePlugins: [
          rehypeSlug,     // Add IDs to headings
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',  // Wrap heading text with link
              properties: {
                className: ['anchor-link'],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: 'github-dark-dimmed',  // Choose theme
              keepBackground: false,         // Use CSS for background
            },
          ],
        ],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})

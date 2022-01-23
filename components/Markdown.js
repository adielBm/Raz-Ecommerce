// Markdown.tsx
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getStrapiMedia } from '../utils'
import { getStrapiURL } from '../utils/api'


export const Markdown = ({ children: markdown }) => {

  const imagesTags = (paragraph) => {
    const { node } = paragraph

    if (node.children[0].tagName === "img" ) {
      const image = node.children[0]
      const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, "")
      const isPriority = image.properties.alt?.toLowerCase().includes('{priority}')
      const metaWidth = image.properties.alt.match(/{([^}]+)x/)
      const metaHeight = image.properties.alt.match(/x([^}]+)}/)
      const width = metaWidth ? metaWidth[1] : "700"
      const height = metaHeight ? metaHeight[1] : "700"

      return (
        <Image
          src={getStrapiURL(image.properties.src)}
          width={width}
          height={height}
          className="overflow-hidden rounded-lg"
          alt={alt}
          priority={isPriority}
        />
      )
    }
    return <p>{paragraph.children}</p>
  }

  const MarkdownComponents = {
    p: imagesTags,
    a: imagesTags
  }

  return (
    <ReactMarkdown
      className="prose-xl prose-blue max-w-none"
      children={markdown}
      components={MarkdownComponents}
    />
  )
}





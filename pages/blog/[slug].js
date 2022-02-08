import { getPostBySlug } from '../../apollo/getQueries'
import ReactMarkdown from 'react-markdown'
import { getStrapiMedia } from '../../utils'
import Image from 'next/image'
import { Markdown } from '../../components/Markdown'

const Post = ({ data }) => {
  return (
    <div className="box p-6 sm:p-20 lg:w-2/3 ">
      <h1>{data.post.title}</h1>
      <div className={`relative my-6 h-96 w-full overflow-hidden rounded-lg`}>
        <Image
          layout="fill"
          objectFit="cover"
          src={getStrapiMedia(data.post.image.data)}
        />
      </div>
      <Markdown>{data.post.content}</Markdown>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getPostBySlug(params.slug)
  return { props: { data } }
}

export default Post

import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../utils'
import { truncate } from '../utils'
const removeMd = require('remove-markdown')

const PostsList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
      {posts.map((post) => (
        <Link
          key={post.attributes.slug}
          href={`/blog/${post.attributes.slug}`}
          className="group"
        >
          <a className="box">
            <div className="relative h-64 w-auto">
              <Image
                src={getStrapiMedia(post.attributes.image.data)}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-gray-700">{post.attributes.title}</h3>
              <p className="text-gray-700">
                {truncate(removeMd(post.attributes.content), 38)}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default PostsList

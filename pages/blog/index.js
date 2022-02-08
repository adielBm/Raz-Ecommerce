import React from 'react'
import Image from 'next/image'
import PostsList from '../../components/PostsList'
import client from '../../apollo/client'
import { POSTS } from '../../apollo/queries'

const Blog = ({ data }) => {
  return (
    <div>
      <h1>Blog Lock</h1>
      <PostsList posts={data.posts.data} />
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: POSTS,
  })
  return { props: { data } }
}
export default Blog

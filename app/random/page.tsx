import ListLayout from '@/layouts/ListLayout'
import {allCoreContent, sortPosts} from 'pliny/utils/contentlayer'
import {allRandomThoughts} from 'contentlayer/generated'
import {genPageMetadata} from 'app/seo'

const POSTS_PER_PAGE = 8

export const metadata = genPageMetadata({title: '随笔'})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allRandomThoughts))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      subtitle="生活不只有事业，还有诗和远方。"
    />
  )
}

import speakingData from '@/data/speakingData'
import { genPageMetadata } from 'app/seo'
import EmbedURLCard from '@/components/EmbedURLCard'

export const metadata = genPageMetadata({ title: 'Speaking' })

export default function Speaking() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Speaking
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {speakingData.map((d) => (
              <EmbedURLCard
                key={d.name}
                title={d.name}
                description={d.description}
                date={d.date}
                embedURL={d.embed_url}
                links={d.links}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

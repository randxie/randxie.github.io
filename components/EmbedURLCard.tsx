import Iframe from 'react-iframe'
import Link from './Link'

const EmbedURLCard = ({ title, description, embedURL, date, links }) => (
  <div className="md max-w-[500px] p-4 md:w-1/2">
    <div className="overflow-hidden border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
      {embedURL && (
        <Iframe
          id={title}
          url={embedURL}
          className="object-cover object-center md:h-36 lg:h-48"
          width="480px"
          height="270px"
          position="relative"
        />
      )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight text-gray-600">{title}</h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400"> {date} </p>
        {links &&
          links.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${link.label}`}
            >
              <p>{link.label}</p>
            </Link>
          ))}
      </div>
    </div>
  </div>
)
export default EmbedURLCard

import { useParams } from 'react-router-dom'

export default function SectionPage() {
  const { sectionName } = useParams()
  const title = sectionName ? decodeURIComponent(sectionName) : 'Section'

  return (
    <>
      <h1 className="page-title">{title}</h1>
      <div className="card">
        <p>This section is not wired to a dedicated page yet.</p>
      </div>
    </>
  )
}

type Props = {
  html: string | undefined | null
}

const HTML = ({ html }: Props) => {
  return (
    <div
      className="danger"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    ></div>
  )
}

export default HTML

type PageHeaderPropsType = {
  title: string
  containerClass?: string
  h2Class?: string
}

const PageHeader = ({
  title,
  containerClass,
  h2Class,
}: PageHeaderPropsType) => {
  return (
    <div
      id="header"
      className={`w-full py-4 ${containerClass ? containerClass : ""}`}
    >
      <h2
        className={`text-center text-2xl font-bold text-gray-800 ${
          h2Class ? h2Class : ""
        }`}
      >
        {title}
      </h2>
    </div>
  )
}

export default PageHeader

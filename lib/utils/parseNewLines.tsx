const parseNewLines = (text: string) => {
  const splitText = text.split("\r\n")

  const Paragraph = (
    <div className="parsed-block h-full">
      {splitText.map((line, index) => {
        return (
          <p
            key={"newLineParse" + line.length + line.split("a")[0] + index}
            className={`parsed-p parsed-${index}`}
          >
            {line || <>&nbsp;</>}
          </p>
        )
      })}
    </div>
  )
  return Paragraph
}

export default parseNewLines

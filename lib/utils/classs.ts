const classs = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

export default classs

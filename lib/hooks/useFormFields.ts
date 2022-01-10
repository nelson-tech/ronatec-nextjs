import { FormEvent, useState } from "react"

const useFormFields = (initialState: any) => {
  const [fields, setValues] = useState(initialState)

  return [
    fields,
    function (event: FormEvent<HTMLInputElement>) {
      setValues({
        ...fields,
        [event.currentTarget.name]: event.currentTarget.value,
      })
    },
  ]
}

export default useFormFields

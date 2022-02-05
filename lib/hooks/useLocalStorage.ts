import { useState } from "react"

/**
 * @param {string} key The key to the value in local storage.
 * @param {*} initialValue The initial value.
 */
export const useLocalStorage = (key: string, initialValue: string) => {
  // State to store our value.
  // Pass initial state function to useState so logic is only executed once.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item =
        typeof window !== `undefined` ? window.localStorage.getItem(key) : null

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState.
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== `undefined`) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
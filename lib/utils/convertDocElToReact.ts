import { createElement, DOMElement } from "react"

const innerFunction = (
  element: Element,
  props?: any,
): DOMElement<any, HTMLElement> => {
  const tagName = element.tagName
  let { iconKey, ..._props } = props || {}

  if (iconKey) {
    element.setAttribute("key", _props.iconKey)
  } else {
    element.setAttribute("key", _props.uri)
  }

  const className = element.getAttribute("class")
  if (className) {
    element.setAttribute("className", className)
    element.removeAttribute("class")
  }

  if (element.getAttribute("iconKey")) {
    element.removeAttribute("iconKey")
  }

  for (let i = 0; i < element.attributes.length; i++) {
    _props[element.attributes[i].nodeName] = element.attributes[i].nodeValue
  }

  let children = Array.from(element.children).map(item => {
    return innerFunction(item)
  })

  return createElement(tagName, _props, children)
}

export const convertDocEleToReact = (element: HTMLElement, props: any) => {
  try {
    return innerFunction(element, props)
  } catch (ex) {
    return createElement("span", {}, "Error loading svg image")
  }
}

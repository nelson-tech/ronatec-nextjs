import {
  Element,
  Text,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser"
import { Tab } from "@headlessui/react"
import { htmlParserOptions } from "."

const ParsedTabs = ({ domNode }: { domNode: Element }) => {
  const possibleTabList = domNode.children.find(
    child => child instanceof Element && child.attribs.class === "tab-list",
  )
  const possibleTabPanels = domNode.children.find(
    child => child instanceof Element && child.attribs.class === "tab-panels",
  )

  const tabList =
    possibleTabList instanceof Element ? possibleTabList : undefined

  const tabPanels =
    possibleTabPanels instanceof Element ? possibleTabPanels : undefined

  return (
    <Tab.Group>
      <Tab.List>
        {tabList &&
          tabList.children.map((tab, idx) => {
            if (tab instanceof Element) {
              return (
                <Tab key={`tabTitle${idx}`}>{domToReact(tab.children)}</Tab>
              )
            }
          })}
      </Tab.List>
      <Tab.Panels className="tab-panels">
        {tabPanels &&
          tabPanels.children.map((tabPanel, idx) => {
            if (tabPanel instanceof Element) {
              return (
                <Tab.Panel key={`tabPanel${idx}`}>
                  {domToReact(tabPanel.children, htmlParserOptions)}
                </Tab.Panel>
              )
            }
          })}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ParsedTabs

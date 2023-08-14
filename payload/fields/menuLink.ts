import { Menu, NavLink } from "payload/generated-types"
import type { Field } from "payload/types"

type BuildMenuLinkType = (options: { depth?: number }) => Field

type LinkFieldsType = (options: { currentLevel?: number }) => Field[]

const isMega = (
  data: Partial<Menu>,
  siblingData: Partial<NavLink & { id: string }>
) => {
  if (!data?.mainMenu?.links) return false

  if (Object(data).hasOwnProperty("mainMenu")) {
    const mainMenu = data.mainMenu.links
    const parent = mainMenu.find(({ link: mainLink }: any) => {
      if (mainLink.children !== 0) {
        const childIDs = mainLink.children?.map((child: any) => child.id)

        return childIDs?.includes(siblingData?.id) ? true : false
      }

      return false
    })

    return parent?.link?.megaMenu ?? false
  }

  return false
}

const buildMenuLinks: BuildMenuLinkType = ({ depth = 1 }) => {
  const linkFields: LinkFieldsType = ({ currentLevel = 1 }) => {
    const subLevels = currentLevel - 1
    const childPrefix =
      subLevels > 0
        ? Array.apply(null, Array(subLevels))
            .map((_) => "Sub")
            .join(" ") + " "
        : ""

    return [
      {
        type: "row",
        fields: [
          {
            name: "megaColumn",
            label: "New Column",
            type: "checkbox",
            defaultValue: false,
            admin: {
              width: "25%",
              style: { alignSelf: "flex-end" },
              condition: (data, siblingData) => isMega(data, siblingData),
            },
          },
          {
            name: "header",
            label: "Header",
            type: "checkbox",
            defaultValue: false,
            // hidden: currentLevel !== 3,
            admin: {
              width: "50%",
              style: { alignSelf: "flex-start" },
              condition: (data, siblingData) =>
                !siblingData?.megaColumn && currentLevel > 1,
            },
          },
        ],
      },

      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            options: [
              {
                label: "Custom URL",
                value: "custom",
              },
              {
                label: "Internal link",
                value: "reference",
              },
              {
                label: "Non-Link",
                value: "textOnly",
              },
            ],
            defaultValue: "custom",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
          },
        ],
        admin: {
          condition: (_, siblingData) => !siblingData?.megaColumn,
        },
      },
      {
        type: "row",
        fields: [
          {
            name: "reference",
            label: "Document to link to",
            type: "relationship",
            relationTo: ["products", "categories"],
            maxDepth: 1,
            admin: {
              condition: (_, siblingData) => {
                // console.log(siblingData)

                if (siblingData?.megaColumn) {
                  return false
                }

                return siblingData?.type === "reference"
              },
            },
          },
          {
            name: "url",
            label: "Custom URL",
            type: "text",
            admin: {
              condition: (_, siblingData) => {
                if (siblingData?.megaColumn) {
                  return false
                }

                return siblingData?.type === "custom"
              },
            },
          },
          {
            name: "label",
            label: "Label",
            type: "text",
            required: true,
            admin: {
              width: "50%",
              condition: (_, siblingData) => !siblingData?.megaColumn,
            },
          },
        ],
      },
      {
        type: "row",
        fields: [
          {
            name: "newTab",
            label: "Open in new tab",
            type: "checkbox",
            defaultValue: false,
            admin: {
              width: "50%",
              style: {
                alignSelf: "flex-end",
              },
              condition: (_, siblingData) =>
                !siblingData?.megaColumn && siblingData?.type !== "textOnly",
            },
          },
          {
            name: "megaMenu",
            label: "MegaMenu",
            type: "checkbox",
            defaultValue: false,
            hidden: currentLevel > 1,
            admin: {
              width: "50%",
              style: {
                alignSelf: "flex-end",
              },
            },
          },
        ],
      },

      currentLevel < depth
        ? {
            name: "children",
            type: "array",
            label: childPrefix + "Child Links",
            labels: {
              singular: childPrefix + "Child Link",
              plural: childPrefix + "Child Links",
            },
            fields: linkFields({ currentLevel: currentLevel + 1 }),
            admin: {
              components: {
                RowLabel: ({ data }: any) => {
                  return data.megaColumn
                    ? "| Column |"
                    : data?.label || `Menu Item`
                },
              },
            },
          }
        : { type: "row", fields: [] },
    ]
  }

  return {
    name: "link",
    type: "group",
    label: false,
    admin: {
      hideGutter: true,
    },
    fields: linkFields({}),
  }
}

export default buildMenuLinks

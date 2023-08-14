import type { Field } from "payload/types"

type BuildMenuLinkType = (options: { depth?: number }) => Field

type LinkFieldsType = (options: { currentLevel?: number }) => Field[]

const buildMobileLinks: BuildMenuLinkType = ({ depth = 1 }) => {
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
              condition: (_, siblingData) => siblingData?.type === "reference",
            },
          },
          {
            name: "url",
            label: "Custom URL",
            type: "text",
            admin: {
              condition: (_, siblingData) => siblingData?.type === "custom",
            },
          },
          {
            name: "label",
            label: "Label",
            type: "text",
            required: true,
            admin: {
              width: "50%",
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
              condition: (_, siblingData) => siblingData?.type !== "textOnly",
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
                  return data?.label || `Menu Item`
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

export default buildMobileLinks

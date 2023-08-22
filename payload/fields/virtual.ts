import { TypeWithID } from "payload/dist/collections/config/types"
import { FieldAffectingData, FieldHook } from "payload/dist/fields/config/types"
import { Field } from "payload/types"

type VirtualFieldInput<T extends TypeWithID = any, P = any, S = any> = Field & {
  name: string
  type: FieldAffectingData["type"]
  hidden?: boolean
  returnValue?: FieldHook<T, P, S>
}
const virtualField: <T extends TypeWithID = any, P = any, S = any>(
  args: VirtualFieldInput<T, P, S>
) => Field = (args) => {
  const { hidden, returnValue, ...baseField } = args

  return {
    ...baseField,
    access: { create: () => false, update: () => false },
    admin: {
      hidden: hidden === false ? false : baseField.admin?.hidden ? false : true,
    },
    hooks: {
      ...baseField.hooks,
      beforeChange: [
        ...(baseField.hooks?.beforeChange ?? []),
        ({ siblingData }) => {
          delete siblingData[args.name]
        },
      ],
      afterRead: [
        ...(args.hooks?.afterRead ?? []),
        ...(returnValue ? [returnValue] : [() => {}]),
      ],
    },
  }
}

export default virtualField

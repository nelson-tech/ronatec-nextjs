import parseNewLines from "@lib/utils/parseNewLines"
import { Employee } from "@api/codegen/graphql"

import Icon from "@components/ui/Icon"

// ####
// #### Types
// ####

export type PropsType = {
  employee: Employee
}

// ####
// #### Component
// ####

const EmployeeCard = ({ employee }: PropsType) => {
  const contact = employee.contact?.contact
  return (
    <>
      <div className="px-6 pb-0 h-full" data-testid="employee-card">
        {employee.title && (
          <h2 className="mt-0 text-xl font-bold text-black tracking-tight border-b-2">
            {employee.title}
          </h2>
        )}
        <h2 className="font-medium text-black tracking-tight">
          {employee.position?.position}
        </h2>

        {contact && (
          <div className="contact mt-4">
            {contact.email && (
              <div className="flex text-sm pb-1">
                <span className="pl-1 pr-3.5 text-xs flex items-center h-full">
                  <Icon
                    name="at"
                    className="h-6 w-6 pr-2"
                    iconStyling="text-gray-500"
                    iconKey="email-icon"
                  />
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  title={`Email ${employee.title}`}
                  className="hover:text-highlight transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            )}
            {contact.office && (
              <div className="flex text-sm">
                <span className="pl-1 pr-3.5 text-xs flex items-center h-full">
                  <Icon
                    name="phone"
                    className="h-6 w-6 pr-2"
                    iconStyling="text-gray-500"
                    iconKey="phone-icon"
                  />
                </span>
                <a
                  href={`tel:${contact.office}`}
                  title={`Call ${employee.title}`}
                  className="hover:text-highlight transition-colors"
                >
                  {contact.office}
                </a>
              </div>
            )}
          </div>
        )}

        {employee.regions && employee.regions.regions && (
          <div className="mt-5 text-sm text-gray-500">
            {parseNewLines(employee.regions.regions)}
          </div>
        )}
      </div>
    </>
  )
}

export default EmployeeCard

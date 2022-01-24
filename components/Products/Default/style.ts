import styled from "@emotion/styled"
import tw from "twin.macro"

export const Container = styled.div`
  // Quick Edits Below
  ${tw`text-gray-700 w-full mx-auto lg:max-w-7xl`}
`

export const TopContainer = styled.div`
  // Quick edits below
  ${tw`flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 my-8 mx-auto px-8 w-full lg:max-w-7xl`}
`

export const ProductTopContainer = styled.div`
  // Quick edits below
  ${tw`w-full h-full mx-auto`}
`

export const ProductMainContainer = styled.div`
  ul {
    ${tw`text-xl ml-4`}

    li {
      ${tw`text-sm list-disc ml-4 pt-2`}
    }
  }

  ol {
    list-style-type: decimal;
    ${tw`ml-4`}

    li {
      ${tw`text-sm ml-4 pt-2`}
    }
  }

  hr {
    ${tw`my-2`}
  }

  div {
    ${tw`py-2`}
  }

  /* TABS - Start */

  .tab-group {
    ${tw`flex border-b border-t border-gray-200 mt-4 p-0`}

    [role="tab"] {
      ${tw`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`}
      ${tw` w-1/4 py-4 px-1 text-center border-b-2 border-t-2 font-medium text-sm`}
      ${tw`outline-none`}
    }

    [aria-selected="true"] {
      ${tw` border-blue-main text-blue-main`}
    }
  }

  [role="tabpanel"] {
    ${tw`p-2 mt-4 text-gray-600 outline-none`}
  }

  /* TABS - End */

  /* TABLE - Start */
  .table-1 {
    ${tw`shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-0 -mx-10 my-6`}

    table {
      ${tw`min-w-full divide-y divide-gray-200`}

      thead {
        ${tw`bg-gray-50`}
        th {
          ${tw`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
        }
      }

      tbody {
        ${tw`bg-white divide-y divide-gray-200`}

        td {
          ${tw`px-6 py-4 whitespace-nowrap text-sm text-gray-500`}
        }
      }
    }
  }

  ${tw`mx-8 pt-8 pb-16 md:px-4 lg:px-8`}
`

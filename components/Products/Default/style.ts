import { css } from "@emotion/react"
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
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem /* 28px */;
    margin-left: 1rem /* 16px */;

    li {
      font-size: 0.875rem /* 14px */;
      line-height: 1.25rem /* 20px */;
      list-style-type: disc;
      margin-left: 1rem /* 16px */;
      padding-top: 0.5rem /* 8px */;
    }
  }

  ol {
    list-style-type: decimal;
    margin-left: 1rem /* 16px */;

    li {
      font-size: 0.875rem /* 14px */;
      line-height: 1.25rem /* 20px */;
      margin-left: 1rem /* 16px */;
      padding-top: 0.5rem /* 8px */;
    }
  }

  hr {
    margin-top: 0.5rem /* 8px */;
    margin-bottom: 0.5rem /* 8px */;
  }

  div {
    padding-top: 0.5rem /* 8px */;
    padding-bottom: 0.5rem /* 8px */;
  }

  /* TABS - Start */

  .tab-group {
    display: flex;
    border-bottom-width: 1px;
    border-top-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
    margin-top: 1rem /* 16px */;
    padding: 0px;

    [role="tab"] {
      border-color: transparent;
      --tw-text-opacity: 1;
      color: rgb(107 114 128 / var(--tw-text-opacity));
      :hover {
        --tw-text-opacity: 1;
        color: rgb(55 65 81 / var(--tw-text-opacity));
        --tw-border-opacity: 1;
        border-color: rgb(209 213 219 / var(--tw-border-opacity));
      }
      width: 25%;
      padding-top: 1rem /* 16px */;
      padding-bottom: 1rem /* 16px */;
      padding-left: 0.25rem /* 4px */;
      padding-right: 0.25rem /* 4px */;
      text-align: center;
      border-bottom-width: 2px;
      border-top-width: 2px;
      font-weight: 500;
      font-size: 0.875rem /* 14px */;
      line-height: 1.25rem /* 20px */;
      outline: 2px solid transparent;
      outline-offset: 2px;
    }

    [aria-selected="true"] {
      --tw-border-opacity: 1;
      border-color: rgb(83 117 160 / var(--tw-border-opacity));
      --tw-text-opacity: 1;
      color: rgb(83 117 160 / var(--tw-text-opacity));
    }
  }

  [role="tabpanel"] {
    padding: 0.5rem /* 8px */;
    margin-top: 1rem /* 16px */;
    --tw-text-opacity: 1;
    color: rgb(75 85 99 / var(--tw-text-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  /* TABS - End */

  /* TABLE - Start */
  .table-1 {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
      0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    overflow: hidden;
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
    @media (min-width: 640px) {
      border-radius: 0.5rem /* 8px */;
    }
    margin-left: -2.5rem /* -40px */;
    margin-right: -2.5rem /* -40px */;
    margin-top: 1.5rem /* 24px */;
    margin-bottom: 1.5rem /* 24px */;
    padding: 0px;

    table {
      min-width: 100%;
      > :not([hidden]) ~ :not([hidden]) {
        --tw-divide-y-reverse: 0;
        border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
        border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
        --tw-divide-opacity: 1;
        border-color: rgb(229 231 235 / var(--tw-divide-opacity));
      }

      thead {
        --tw-bg-opacity: 1;
        background-color: rgb(249 250 251 / var(--tw-bg-opacity));
        th {
          padding-left: 1.5rem /* 24px */;
          padding-right: 1.5rem /* 24px */;
          padding-top: 0.75rem /* 12px */;
          padding-bottom: 0.75rem /* 12px */;
          font-size: 0.75rem /* 12px */;
          line-height: 1rem /* 16px */;
          text-align: left;
          font-weight: 500;
          --tw-text-opacity: 1;
          color: rgb(107 114 128 / var(--tw-text-opacity));
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }

      tbody {
        --tw-bg-opacity: 1;
        background-color: rgb(255 255 255 / var(--tw-bg-opacity));
        --tw-divide-y-reverse: 0;
        > :not([hidden]) ~ :not([hidden]) {
          border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
          border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
          --tw-divide-opacity: 1;
          border-color: rgb(229 231 235 / var(--tw-divide-opacity));
        }

        td {
          padding-left: 1.5rem /* 24px */;
          padding-right: 1.5rem /* 24px */;
          padding-top: 1rem /* 16px */;
          padding-bottom: 1rem /* 16px */;
          white-space: nowrap;
          font-size: 0.875rem /* 14px */;
          line-height: 1.25rem /* 20px */;
          --tw-text-opacity: 1;
          color: rgb(107 114 128 / var(--tw-text-opacity));
        }
      }
    }
  }

  margin-left: 2rem /* 32px */;
  margin-right: 2rem /* 32px */;
  padding-top: 2rem /* 32px */;
  padding-bottom: 4rem /* 64px */;
  @media (min-width: 768px) {
    padding-left: 1rem /* 16px */;
    padding-right: 1rem /* 16px */;
  }
  @media (min-width: 1024px) {
    padding-left: 2rem /* 32px */;
    padding-right: 2rem /* 32px */;
  }
`

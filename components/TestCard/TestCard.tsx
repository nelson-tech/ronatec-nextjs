"use client"

import getClient from "@api/client"
import { GetViewerDocument } from "@api/codegen/graphql"

const TestCard = () => {
  const client = getClient()

  const buttonAction = async () => {
    await client.request(GetViewerDocument)
  }

  return (
    <div className="">
      <button
        onClick={buttonAction}
        className="bg-accent rounded-md p-4 m-8 text-white"
      >
        Test Button
      </button>
    </div>
  )
}

export default TestCard

"use client"

import useClient from "@api/client"
import { GetViewerDocument } from "@api/codegen/graphql"

const TestCard = () => {
  const client = useClient()

  const buttonAction = async () => {
    client.setHeader("auth", "true")

    const viewerData = await client.request(GetViewerDocument)
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

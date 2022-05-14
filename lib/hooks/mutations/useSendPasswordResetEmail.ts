import { gql, useMutation } from "urql"

const QUERY = gql`
  mutation SendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      clientMutationId
    }
  }
`

const useSendPasswordResetEmail = () => {
  const [mutationResults, mutation] = useMutation(QUERY)

  const sendPasswordResetEmail = (username: string) => {
    return mutation({
      variables: {
        username,
      },
    })
  }

  return { sendPasswordResetEmail, results: mutationResults }
}

export default useSendPasswordResetEmail

import { userAuthFragment } from "@api/mutations/old/fragments"
import { gql, useMutation } from "urql"

const QUERY = gql`
  mutation ResetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      clientMutationId
      ${userAuthFragment}
    }
  }
`

const useResetUserPassword = () => {
  const [mutationResults, mutation] = useMutation(QUERY)

  const resetUserPassword = (key: string, login: string, password: string) => {
    return mutation({
      variables: {
        key,
        login,
        password,
      },
    })
  }

  return { resetUserPassword, results: mutationResults }
}

export default useResetUserPassword

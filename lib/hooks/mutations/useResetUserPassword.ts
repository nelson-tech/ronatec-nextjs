import { userAuthFragment } from "@api/mutations/fragments"
import { gql, useMutation } from "@apollo/client"

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
  const [mutation, mutationResults] = useMutation(QUERY)

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

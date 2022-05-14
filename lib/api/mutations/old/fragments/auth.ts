export const userAuthBaseFragment = `
jwtAuthToken
jwtRefreshToken
firstName
lastName
username
email
`

export const userAuthFragment = `
user {
  ${userAuthBaseFragment}
}
`

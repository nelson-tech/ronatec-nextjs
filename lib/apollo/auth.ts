import jwt_decode, { JwtPayload } from "jwt-decode"
import { isServer } from "@lib/utils"
import { v4 as uuid } from "uuid"
import { gql } from "@apollo/client"
import { authConstants } from "@lib"

// Example decoded authToken:
// {
//   iss: 'https://api.ronatec.us',
//   iat: 1641827249,
//   nbf: 1641827249,
//   exp: 1641827549,
//   data: { user: { id: '1' } }
// }

// Example decoded refreshToken:
// {
//   iss: 'https://api.ronatec.us',
//   iat: 1641827249,
//   nbf: 1641827249,
//   exp: 1673363249,
//   data: { user: { id: '1', user_secret: 'graphql_jwt_61db225bb92fa' } }
// }

// Example decoded wooSessionToken:
// {
//   iss: 'https://api.ronatec.us',
//   iat: 1641827249,
//   nbf: 1641827249,
//   exp: 1643036849,
//   data: { customer_id: 1 }
// }

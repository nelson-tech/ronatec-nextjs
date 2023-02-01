// type CLIENT_Tokens_Type = {
//   auth?: string | null | undefined
//   refresh?: string | null | undefined
//   user?: string | null | undefined
//   cart?: string | null | undefined
//   session?: string | null | undefined
//   remove?: boolean | null | undefined
// }

// type WP_Input_Login_Type = {
//   username: string
//   password: string
// }

// type EP_Auth_Input_Login_Type = {
//   action: "LOGIN"

//   input?: WP_Input_Login_Type | null | undefined
// }

// type WP_Input_Register_Type = {
//   username: string
//   name?: string
//   first_name?: string
//   last_name?: string
//   email: string
//   url?: string
//   description?: string
//   locale?: string
//   nickname?: string
//   slug?: string
//   roles?: string
//   password: string
//   meta?: { [key: string]: string }[]
// }

// type EP_Auth_Input_Register_Type = {
//   action: "REGISTER"
//   input: WP_Input_Register_Type
// }

// type EP_Auth_Input_Cart_Type = {
//   action: "CART"
//   cartKey: string | null | undefined
// }

// type EP_Auth_Input_Set_Type = {
//   action: "SET"
//   tokens: CLIENT_Tokens_Type
// }

// type EP_Auth_Input_Type =
//   | (
//       | EP_Auth_Input_Login_Type
//       | EP_Auth_Input_Register_Type
//       | EP_Auth_Input_Cart_Type
//       | EP_Auth_Input_Set_Type
//       | {
//           action: "CHECKING" | "INIT" | "LOGOUT"
//         }
//     ) & {
//       tokens?: CLIENT_Tokens_Type
//     }

// type EP_Auth_Response_Type = {
//   isAuth: boolean
//   needsRefresh?: null | string
//   tokens?: CLIENT_Tokens_Type
//   cart?: WC_CartType
//   user?: CLIENT_UserDataType
// }

// type API_AuthCheckResultType = {
//   isAuth: boolean
//   newCookies: string[]
//   user: WP_AUTH_UserDataType
//   tokens: CLIENT_Tokens_Type
// }

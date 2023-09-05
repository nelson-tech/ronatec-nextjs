import type { default as ImportedGraphQL } from "graphql"
import type { Payload } from "payload"
import type { Config as GeneratedTypes, User } from "~payload-types"
import type { PayloadRequest } from "payload/types"
import type { Response } from "express"

export type CustomGraphQLMutationsType = (
  GraphQL: typeof ImportedGraphQL,
  payload: Payload
) => Record<string, unknown>

export type GraphQLContextType = {
  req: PayloadRequest<User | null | undefined>
  res: Response
}

export type Resolver<
  Args,
  TSlug extends keyof GeneratedTypes["collections"],
> = (
  obj: any,
  args: Args,
  context: GraphQLContextType,
  info: any
) =>
  | GeneratedTypes["collections"][TSlug]
  | null
  | Promise<GeneratedTypes["collections"][TSlug] | null>

export type CustomGraphQLMutationType<
  Args,
  TSlug extends keyof GeneratedTypes["collections"],
> = (
  GraphQL: typeof ImportedGraphQL,
  payload: Payload
) => {
  [key: string]: {
    args: { [key in keyof Args]: { type: any } }
    type: any
    resolve: Resolver<Args, TSlug>
  }
}

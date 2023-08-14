import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3"

const {
  S3_BUCKET,
  S3_ACCESS_KEY_ID,
  S3_ENDPOINT,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
} = process?.env

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: S3_SECRET_ACCESS_KEY ?? "",
    },
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    forcePathStyle: true,
  },
  acl: "public-read",
  bucket: S3_BUCKET ?? "",
})

export default adapter

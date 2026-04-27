// app/(app)/users/loading.tsx
import { Skeleton, Stack } from "@mui/material"
export default function Loading() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" width={180} height={38} />
      <Skeleton variant="rounded" height={360} />
    </Stack>
  )
}

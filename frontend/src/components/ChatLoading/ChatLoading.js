import { Stack } from '@chakra-ui/react'
import { Skeleton } from '@chakra-ui/skeleton'
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack>
        <Skeleton height="25px"/>
        <Skeleton height="25px"/>
        <Skeleton height="25px"/>
        <Skeleton height="25px"/>
        <Skeleton height="25px"/>
        <Skeleton height="25px"/>
        <Skeleton height="25px"/>
    </Stack>
  )
}

export default ChatLoading;
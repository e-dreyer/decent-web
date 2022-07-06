import React, { ReactNode } from 'react'

import { Card, Paper } from '@mui/material'

type CardWrapperProps = {
    children: ReactNode
}

function CardWrapper(props: CardWrapperProps) {
  return (
  <Paper sx={{width: "100%"}}>
    <Card>
        {props.children}
    </Card>
  </Paper>
  )
}

export default CardWrapper
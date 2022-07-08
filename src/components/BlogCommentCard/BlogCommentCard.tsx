import React from "react";
import { Box, CardContent, Typography, Stack } from "@mui/material";

import CardWrapper from "../CardWrapper/CardWrapper";

import { NexusGenFieldTypes } from "../../types/types";
import Link from "next/link";

type CommentCardProps = {
  comment: NexusGenFieldTypes["BlogComment"];
};

function CommentCard(props: CommentCardProps) {
  return (
    <CardWrapper>
      <>
        <CardContent>
          <Stack direction="row" gap={1}>
            <Link href={`/profiles/${props.comment.author?.id}`} passHref>
              <Typography
                variant="subtitle2"
                component="a"
                color={"primary"}
                sx={{ textDecoration: "none" }}
              >
                {props.comment.author?.username}
              </Typography>
            </Link>
          </Stack>

          <Typography variant="body1" component="p">
            {props.comment.content}
          </Typography>
        </CardContent>
      </>
    </CardWrapper>
  );
}

export default CommentCard;

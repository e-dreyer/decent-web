import React from "react";
import { Button, Box, CardContent, Typography } from "@mui/material";

import CardWrapper from "../CardWrapper/CardWrapper";

import { NexusGenFieldTypes } from "../../../generated/nexus-typegen";
import Link from "next/link";

type PostCardProps = {
  post: NexusGenFieldTypes["BlogPost"];
};

function PostCard(props: PostCardProps) {
  return (
    <CardWrapper>
      <>
        <CardContent>
          <Box>
            <Link href={`/posts/${props.post.id}`} passHref>
              <Typography
                variant="h6"
                component="a"
                sx={{ textDecoration: "none" }}
              >
                {props.post.title}
              </Typography>
            </Link>
          </Box>

          <Link href={`/profiles/${props.post.author?.id}`} passHref>
            <Typography
              variant="subtitle2"
              component="a"
              color={"primary"}
              sx={{ textDecoration: "none" }}
            >
              {props.post.author?.username}
            </Typography>
          </Link>

          <Typography variant="body1" component="p">
            {props.post.content}
          </Typography>
        </CardContent>
      </>
    </CardWrapper>
  );
}

export default PostCard;

import React from "react";
import { Box, CardContent, Typography, Stack } from "@mui/material";

import CardWrapper from "../CardWrapper/CardWrapper";

import { NexusGenFieldTypes } from "../../types/types";
import Link from "next/link";

type BlogPostCardProps = {
  blogPost: NexusGenFieldTypes["BlogPost"];
};

function BlogPostCard(props: BlogPostCardProps) {
  return (
    <CardWrapper>
      <>
        <CardContent>
          <Box>
            <Link href={`/posts/${props.blogPost.id}`} passHref>
              <Typography
                variant="h6"
                component="a"
                sx={{ textDecoration: "none" }}
              >
                {props.blogPost.title}
              </Typography>
            </Link>
          </Box>

          <Stack direction="row" gap={1}>
            <Link href={`/profiles/${props.blogPost.author?.id}`} passHref>
              <Typography
                variant="subtitle2"
                component="a"
                color={"primary"}
                sx={{ textDecoration: "none" }}
              >
                {props.blogPost.author?.username}
              </Typography>
            </Link>

            <Link href={`/blogs/${props.blogPost.blog?.id}`} passHref>
              <Typography
                variant="subtitle2"
                component="a"
                color={"primary"}
                sx={{ textDecoration: "none" }}
              >
                {props.blogPost.blog?.name}
              </Typography>
            </Link>
          </Stack>

          <Typography variant="body1" component="p">
            {props.blogPost.content}
          </Typography>
        </CardContent>
      </>
    </CardWrapper>
  );
}

export default BlogPostCard;

import React from "react";
import { Box, CardContent, Typography } from "@mui/material";

import CardWrapper from "../CardWrapper/CardWrapper";

import { NexusGenFieldTypes } from "../../types/types";
import Link from "next/link";

type BlogCardProps = {
  blog: NexusGenFieldTypes["Blog"];
};

function BlogCard(props: BlogCardProps) {
  return (
    <CardWrapper>
      <>
        <CardContent >
          <Box >
            <Link href={`/blogs/${props.blog.id}`} passHref>
              <Typography
                variant="h6"
                component="a"
                sx={{ textDecoration: "none" }}
              >
                {props.blog.name}
              </Typography>
            </Link>
          </Box>

          <Link href={`/profiles/${props.blog.author?.id}`} passHref>
            <Typography
              variant="subtitle2"
              component="a"
              color={"primary"}
              sx={{ textDecoration: "none" }}
            >
              {props.blog.author?.username}
            </Typography>
          </Link>

          <Typography variant="body1" component="p">
            {props.blog.description}
          </Typography>
        </CardContent>
      </>
    </CardWrapper>
  );
}

export default BlogCard;

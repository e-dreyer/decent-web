import React from 'react'
import { Button, Box, CardContent, Typography } from "@mui/material";

import CardWrapper from '../CardWrapper/CardWrapper'

import { NexusGenFieldTypes } from "../../types/types";

import Link from 'next/link';

type ProfileCardProps = {
  profile: NexusGenFieldTypes["Profile"];
};

function ProfileCard(props: ProfileCardProps) {
  return (
    <CardWrapper>
      <>
        <CardContent>
          <Box>
            <Link href={`/profiles/${props.profile.id}`} passHref>
              <Typography
                variant="h6"
                component="a"
                sx={{ textDecoration: "none" }}
              >
                {props.profile.user?.username}
              </Typography>
            </Link>
          </Box>

          <Typography variant="body1" component="p">
            {props.profile.bio}
          </Typography>
        </CardContent>
      </>
    </CardWrapper>
  );
}

export default ProfileCard
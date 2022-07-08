import React from "react";
import { NextPage } from "next";
import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import {
  useGetAllProfilesQuery,
  getAllProfiles,
  getRunningOperationPromises,
} from "../../services/profiles";

type PageProps = {};

const Page: NextPage = (props: PageProps) => {
  /* Query All Profiles */
  const profileQueryResult = useGetAllProfilesQuery();

  if (profileQueryResult.isLoading) {
    return <div>Loading Profiles...</div>;
  }

  if (profileQueryResult.error) {
    return <div>Error Loading Profiles</div>;
  }

  if (profileQueryResult.data) {
    return (
      <Stack direction="column" gap={2} sx={{ width: "100%" }}>
        {profileQueryResult?.data.map((profile, profileIndex) => {
          return (
            <ProfileCard
              key={`profileCard-${profileIndex}`}
              profile={profile}
            />
          );
        })}
      </Stack>
    );
  }

  return null;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getAllProfiles.initiate());

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;

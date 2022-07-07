import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

import ProfileCard from "../../components/ProfileCard/ProfilCard";
import {
  useGetProfileByIdQuery,
  getProfileById,
  getRunningOperationPromises,
} from "../../services/profiles";

type PageProps = {};

const getQueryParameters = (id: any) => {
  return {
    id: parseInt(id as string, 10),
  };
};

const Page: NextPage = (props: PageProps) => {
  const router = useRouter();
  const { id } = router.query;

  const result = useGetProfileByIdQuery(getQueryParameters(id));

  if (result.isLoading) {
    return <div>Loading Profiles...</div>;
  }

  if (result.error) {
    return <div>Error Loading Profiles</div>;
  }

  if (result.data) {
    return (
        <ProfileCard key={`profileCard`} profile={result.data} />
    );
  }

  return null;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(
      getProfileById.initiate(getQueryParameters(context.params?.id))
    );
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;

import { Stack } from '@mui/material';
import React from 'react'
import ProfileCard from '../../components/ProfileCard/ProfilCard';
import { useGetAllProfilesQuery } from '../../services/profiles';

function ProfilesPage() {
  const profilesQuery = useGetAllProfilesQuery()

  if (profilesQuery.isLoading) {
    return <div>Loading Profiles...</div>
  }

  if (profilesQuery.error) {
    return <div>Error Loading Profiles</div>
  }

  if (profilesQuery.data) {
    return (
      <Stack direction="column" gap={2} sx={{width:"100%"}}>
        {
          profilesQuery?.data.map((profile, profileIndex) => {
            return <ProfileCard key={`profileCard-${profileIndex}`} profile={profile}/>
          })
        }
      </Stack>
    )
  }

  return null
}

export default ProfilesPage;
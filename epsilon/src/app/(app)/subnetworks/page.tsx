import { Typography } from '@mui/material';
import SubnetworksTable from '@/components/tables/SubnetworksTable';
import getSubnetworks from '@/hooks/getSubnetworks';

export default async function SubnetworksPage() {
  const subnetworks = await getSubnetworks();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }} className="glitch" data-glitch="SUBNETWORKS">
        SUBNETWORKS
      </Typography>
      <SubnetworksTable subnetworks={ subnetworks } />
    </>
  );
}

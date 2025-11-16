'use client'

import React, { useState } from 'react';
import Collapsible from '@/components/common/Collapsible';
import { List, ListItem, ListItemText, Switch, Typography } from '@mui/material';
import { NetworkContextType } from '@/components/modules/networks/context';

function Overview({ network }: { network: NetworkContextType }) {
  const [offMap, setOffMap] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string, checked: boolean) => {
    setOffMap((s) => ({ ...s, [id]: !checked }));
    console.log('Subnetwork toggled:', { id, checked });
  };

  return (
    <Collapsible title={ network.name }>
      { network?.subnetworks.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No subnetworks found.</Typography>
      ) : (
        <List dense disablePadding>
          { network?.subnetworks.map((subnetwork) => {
            const checked = !offMap[subnetwork.id];

            return (
              <ListItem
                key={ subnetwork.id }
                disableGutters
                secondaryAction={
                  <Switch
                    edge="end"
                    size="small"
                    checked={checked}
                    onChange={(e) => handleToggle(subnetwork.id, e.target.checked)}
                  />
                }
                sx={{ px: 1 }}
              >
                <ListItemText primary={ subnetwork.name } />
              </ListItem>
            );
          }) }
        </List>
      )}
    </Collapsible>
  );
}

export default Overview;
import React, { useMemo } from 'react';
import { Alert, AlertTitle, Collapse, Link as MuiLink } from '@mui/material';

export interface AlertsProps {
  title: string;
  alerts: string[];
  type: 'warning' | 'error';
  onClear?: () => void;
  breakIndex?: number;
}

function Alerts({ title, alerts, type, onClear, breakIndex = 4 }: AlertsProps) {
  const [show, setShow] = React.useState(false);
  const allAlerts = useMemo(() => alerts.map((alert, index) => {
    if (typeof alert === 'string') return <div key={index}>• {alert }</div>;
  }), [alerts]);
  const slicedAlerts = useMemo(() => {
    return (
      <>
        { allAlerts.slice(0, breakIndex) }
        <Collapse in={ show }>
          { allAlerts.slice(breakIndex) }
        </Collapse>
        {
          show ?
            <div>
              <MuiLink component="button" onClick={() => setShow(false)} underline="hover">
                Hide
              </MuiLink>
            </div>
            :
            <div>
              …and {allAlerts.length - breakIndex} more.{' '}
              <MuiLink component="button" onClick={() => setShow(true)} underline="hover">
                Show
              </MuiLink>
            </div>
        }
      </>
    )
  }, [show, allAlerts]);

  return (
    <Collapse in={alerts.length > 0}>
      <Alert severity={type} variant="outlined" sx={{ whiteSpace: 'pre-wrap' }} onClose={onClear}>
        <AlertTitle>{ title }</AlertTitle>
        { alerts.length > breakIndex ? slicedAlerts : allAlerts }
      </Alert>
    </Collapse>
  );
}

export default Alerts;
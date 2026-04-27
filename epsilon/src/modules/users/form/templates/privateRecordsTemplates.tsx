import { Typography } from '@mui/material';
import { Template } from '../types';

const privateRecordsTemplates: Template[] = [

  // ArchHelix
  {
    id: crypto.randomUUID(),
    name: <Typography>
      <Typography component="span" color="error">[ArchHelix]</Typography> Badge Access - Red
    </Typography>,
    subName: '',
    title: 'Badge Access — [Role/Level] — <<user.name>> <<user.surname>>',
    description: `Access Level: [e.g., L2 — Confidential]
Badge ID: ARC-glass-<<user.handle>>-<<rand-4>>
Holder: <<user.name>> <<user.surname>> (Employee ID: <<user.handle>>)
Department: <<user.typeActual>>`,
  },
]

export default privateRecordsTemplates;
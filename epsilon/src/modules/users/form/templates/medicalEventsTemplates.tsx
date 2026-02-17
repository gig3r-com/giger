import { Typography } from '@mui/material';
import { Template } from '../types';

const privateRecordsTemplates: Template[] = [

  // ArchHelix
  {
    id: crypto.randomUUID(),
    name:
      <Typography>
        <Typography component="span" color="error">[MediSyn]</Typography> Emergency Med Implant Tag — Blue
      </Typography>,
    subName: 'Class II Implant',
    title: 'Medical cyberware',
    description: `Level: ML2 (Clinical)
Tag: MSD-impl-<<user.handle>>-<<rand-4>>
Holder: <<user.name>> <<user.surname>> (ID: <<user.handle>>)
Implant: <<device.model>> (SN: <<device.serial>>)
Notes: Allergies — <<user.allergies|None>>`,
  },

// 2) Neural Rehab Interface Pass — Silver
  {
    id: crypto.randomUUID(),
    name:
      <Typography>
        <Typography component="span" color="error">[NeuroDyne]</Typography> Neural Rehab Interface Pass — Silver
      </Typography>,
    subName: 'Neurotherapeutic',
    title: 'Medical cyberware',
    description: `Access: N3 (Therapy)
License: NDN-neuro-<<user.handle>>-<<rand-4>>
Holder: <<user.name>> <<user.surname>> (MRN: <<user.mrn>>)
Device: <<device.model>> (FW: <<device.firmware>>)
Use: Rehab protocol <<therapy.protocol>>`,
  },

// 3) Auto-Injector Access — Green
  {
    id: crypto.randomUUID(),
    name:
      <Typography>
        <Typography component="span" color="error">[BioArc]</Typography> Auto-Injector Access — Green
      </Typography>,
    subName: 'Home Use',
    title: 'Medical cyberware',
    description: `Tier: P1 (Home)
Permit: BAC-inject-<<user.handle>>-<<rand-4>>
Holder: <<user.name>> <<user.surname>>
Drug: <<drug.name>> <<drug.dose>><<drug.units>>
Schedule: <<drug.schedule>>`,
  },

// 4) Ocular Diagnostic Module Card — Amber
  {
    id: crypto.randomUUID(),
    name:
      <Typography>
        <Typography component="span" color="error">[OptiKline]</Typography> Ocular Diagnostic Module — Amber
      </Typography>,
    subName: 'Vision Suite',
    title: 'Medical cyberware',
    description: `Clearance: OD2 (Clinic)
Card: OKL-ocular-<<user.handle>>-<<rand-4>>
Holder: <<user.name>> <<user.surname>>
Module: <<device.model>>
Purpose: Retina scan + telemetry`,
  }
]

export default privateRecordsTemplates;
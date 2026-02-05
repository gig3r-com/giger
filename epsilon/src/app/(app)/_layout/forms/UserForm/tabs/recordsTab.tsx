import React from 'react';
import { useField } from 'formik';
import { DenseInput, Input, Radio, Segment, Select } from '../../inputs';
import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { DisabledVisible, HideSource, Security, DeleteOutline, DriveFileMove } from '@mui/icons-material';
import { CRIMINAL_HARD_RECORD_SUBCATEGORIES_OPTIONS } from '@/configs/Record';
import { BOOL } from '@/configs/BaseSelectFields';
import { alpha } from '@mui/material/styles';
import { colors } from '@/components/ThemeRegistry';
import { criminalRecords } from './recordConfigs';

/*import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';
    id: string;
    type: RecordType;
    category?: HardRecordCategories | MindRecordCategories | OffGameRecordCategories;
    subCategory?: AllHardRecordSubcategories | AllMindRecordSubcategories | AllOffGameRecordSubcategories;

    title: string;

    timestamp?: string;

    isReveled: boolean;
    revealCode?: RevealCode;

    isEncrypted: boolean;
    encryption: Encryption;

    data: string;

    hackData?: RecordHackData;

    Right Actions: Move to diff category, delete,
 */
const labelWidth = 100;
const record = {};

export function RecordsTab() {
    const config = criminalRecords;

    return (
        <Stack sx={ { mt: 2, width: '100%' } } spacing={ 3 }>
            <Segment labelWidth={ 0 }
                     title={
                         <Stack direction="row" sx={ { pr: 2, pl: 3 } }>
                             <Typography variant="h6" className="glitch" data-glitch={ config.title } flex={ 1 }>
                                 { config.title }
                             </Typography>
                             <Button>ADD</Button>
                         </Stack>
                     }
            >
                <Typography variant="body1" sx={ { px: 2 } }>
                    { config.description }
                </Typography>
            </Segment>

            { ['VICTIM', 'SUSPECT', 'WANTED', 'WITNESS', 'PUNISHMENT'].map((item, i) => {
                return <Record path={ `${ config.name }[${ i }]` } config={ config }/>;
            }) }
        </Stack>
    );
}

function Record({ path, config, }: { path: string, config: object, }) {
    const [subCatField] = useField(`${path}.subCategory`);
    const [isReveledField] = useField(`${path}.subCategory`);
    const [isEncryptedField] = useField(`${path}.subCategory`);
    const Icon = config.icons[subCatField.value];
console.log(path)
    return (
        <Segment cleanIcon labelWidth={ 0 }
                 sx={ { borderBottom: '2px solid', borderColor: 'divider', pb: 2 } }
                 title={
                     <Stack direction="row" alignItems="center" spacing={ 1 }
                            sx={ {
                                width: '100%', pr: 2, pl: 0.5, mt: 2,
                                background: `linear-gradient(0deg,${ alpha(colors.bioAcid, 0.15) } 0%, transparent 100%);`
                            } }
                     >
                         { Icon && <Tooltip title={ 'SUBCAT' }>
                             <Icon color="secondary" fontSize="large" sx={ { paddingLeft: '8px', } }/>
                         </Tooltip> }
                         { isReveledField?.value && <Tooltip title="Content is hidden">
                             <DisabledVisible color="secondary" sx={ { paddingLeft: '8px', } }/>
                         </Tooltip> }
                         { isEncryptedField?.value && <Tooltip title="Content is encrypted">
                             <Security color="secondary" sx={ { paddingLeft: '8px', } }/>
                         </Tooltip> }
                         <DenseInput multiline name={ `${ path }.title` } fullWidth/>
                         <Tooltip title="Move record">
                             <IconButton size="small" color="primary">
                                 <DriveFileMove fontSize="small"/>
                             </IconButton>
                         </Tooltip>
                         <Tooltip title="Delete record">
                             <IconButton size="small" color="error">
                                 <DeleteOutline fontSize="small"/>
                             </IconButton>
                         </Tooltip>
                     </Stack>
                 }
        >
            <Stack direction="column" alignItems="stretch" spacing={ 1 } sx={ { position: 'relative' } }>
                <Stack direction="row" alignItems="center" width="100%" spacing={ 1 } px={ 1 }>
                    <Select labelWidth={ labelWidth } name={ 'subCategory' } label="Category" sx={ { flex: 1 } }
                            options={ CRIMINAL_HARD_RECORD_SUBCATEGORIES_OPTIONS }/>
                    <Input labelWidth={ labelWidth } name={ 'timestamp' } label="timestamp" sx={ { flex: 1 } }/>
                </Stack>
                <Stack direction="row" alignItems="center" width="100%" spacing={ 1 } px={ 1 }>
                    <Radio labelWidth={ labelWidth } name={ 'isReveled' } label="Is revealed" sx={ { flex: 1 } }
                           options={ BOOL }/>
                    <Input labelWidth={ labelWidth } name={ 'revealCode' } label="Reveal code" sx={ { flex: 1 } }/>
                </Stack>
                <Stack direction="row" alignItems="center" width="100%" spacing={ 1 } px={ 1 }>
                    <Radio labelWidth={ labelWidth } name={ 'isEncrypted' } label="Is encrypted" sx={ { flex: 1 } }
                           options={ BOOL }/>
                    <Input labelWidth={ labelWidth } name={ 'encryption' } label="Encryption" sx={ { flex: 1 } }/>
                </Stack>
                <Box sx={ { px: 1 } }>
                    <DenseInput name={ 'data' } multiline minRows={ 6 }/>
                </Box>
            </Stack>
        </Segment>
    );
}

export default RecordsTab;

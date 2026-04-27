'use client';

import * as React from 'react';
import {
  Stack,
  Divider,
  Button,
  ButtonGroup,
  Tooltip,
  Alert,
  AlertTitle,
  Collapse,
  Link as MuiLink,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CameraIcon from '@mui/icons-material/CameraAlt';

import Collapsible from '@/components/common/Collapsible';
import { useConversations } from '../context';
import { exportConversationAsPdf } from '@/components/conversations/exportPdf';
import { mapConversationJSON } from '@/utils/conversationIO';
import { EnhancedConversationType } from '@/types';
import { useFormikContext } from 'formik';
import Alerts from '@/components/modules/conversations/configs/LoaderComponents/Alerts';

/* ---------- Helpers ---------- */

const genId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}_${Math.random()}`;

function downloadJson(obj: unknown, filename = 'conversation.json') {
  const data = JSON.stringify(obj, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ---------- Component ---------- */

export default function Loader() {
  const {
    addConversation,
    selected,
    newConversation,
    uiMainHandle,
    showTimestamps,
  } = useConversations();
  const { values, errors: formErrors } = useFormikContext();

  // Import UX state
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [warnings, setWarnings] = React.useState<string[]>([]);

  /* ---------- Handlers ---------- */

  const onClickImport = () => fileRef.current?.click();

  const onImportFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setErrors([]);
      setWarnings([]);

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = String(reader.result);
          if (!text.trim()) return setErrors(['Selected file is empty.']);

          let parsed: unknown;
          try {
            parsed = JSON.parse(text);
          } catch {
            return setErrors(['File content is not valid JSON.']);
          }

          const result = mapConversationJSON(parsed);
          setWarnings(result.warnings);

          if (!result.ok || !result.conversation) {
            return setErrors(
              result.errors.length
                ? result.errors
                : ['Unknown import error.'],
            );
          }

          addConversation(result.conversation as EnhancedConversationType);
        } catch (err) {
          console.error(err);
          setErrors(['Unexpected error while reading the file.']);
        }
      };

      reader.readAsText(file);
      e.currentTarget.value = '';
    },
    [addConversation],
  );

  const handleSave = () => {
    if (!values) return;

    const entry = {
      id: genId(),
      savedAt: new Date().toISOString(),
      label: 'Manual save',
    };
    const toSave = { ...values, edits: [...(values.edits ?? []), entry] };

    const filename =
      (values.title
        ? values.title.replace(/[^\w\-]+/g, '_')
        : `conversation_${values.id}`) + '.json';

    downloadJson(toSave, filename);
  };

  const handleNew = () => {
    newConversation('Untitled');
  };

  const handlePdf = () => {
    if (!values) return;
    exportConversationAsPdf(values, uiMainHandle, { showTimestamps });
  };

  const handleSnapshot = () => {
    console.log('TODO')
    // selected && createSnapshot(selected, 'Snapshot')
  }

  /* ---------- Render ---------- */

  return (
    <Collapsible title="Load / Save / Export">
      <Stack spacing={1.25}>
        <Alerts title="Imported with adjustments" alerts={ warnings } type="warning" onClear={ () => setWarnings([]) } />
        <Alerts title="Import failed" alerts={ errors } type="error" onClear={ () => setErrors([]) } />

        {/* Import */}
        <ButtonGroup fullWidth size="small" variant="contained" sx={{ margin: '0 !important' }}>
          <Tooltip title="Impoer conversation from a JSON">
            <Button variant="outlined" startIcon={ <UploadIcon /> } onClick={ onClickImport }>
              Import JSON…
            </Button>
          </Tooltip>
          <Tooltip title="Make a new conversation">
            <Button color="primary" startIcon={ <AddCircleIcon /> } onClick={ handleNew }>
              New
            </Button>
          </Tooltip>
        </ButtonGroup>
        <input ref={ fileRef } type="file" hidden accept="application/json" onChange={ onImportFile } />

        <Divider sx={{ opacity: 0.5 }} />

        {/* Save / PDF / Snapshot */}
        <ButtonGroup fullWidth size="small" variant="outlined">
          <Tooltip title="Save conversation as JSON">
            <span>
              <Button startIcon={<SaveAltIcon />} onClick={handleSave} disabled={!selected}>
                Save JSON
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Export conversation as PDF">
            <span>
              <Button startIcon={<PictureAsPdfIcon />} onClick={handlePdf} disabled={!selected}>
                PDF
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Export conversation as PDF">
            <span>
              <Button color="secondary" startIcon={<CameraIcon />} disabled={!selected} onClick={handleSnapshot}>
                Snapshot
              </Button>
            </span>
          </Tooltip>
        </ButtonGroup>

        {/* Form alerts */}
        { selected && <Alerts title="Conversation is not valid" alerts={Object.values(formErrors)} type="error" /> }
      </Stack>
    </Collapsible>
  );
}

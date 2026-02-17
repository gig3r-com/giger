'use client';

import * as React from 'react';
import { Stack, Typography, Divider, Button, ButtonGroup, Tooltip, Alert, AlertTitle, Collapse, Link as MuiLink } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CameraIcon from '@mui/icons-material/CameraAlt';
import Collapsible from '@/components/common/Collapsible';
import { useConversations } from '@/contexts/conversations';
import { exportConversationAsPdf } from '@/components/conversations/exportPdf';
import { useParticipants } from '@/contexts/participants';
import { useConversationForm } from '@/components/forms/ConversationFormProvider';
import { mapConversationJSON } from '@/utils/conversationIO';

const genId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}_${Math.random()}`);

function downloadJson(obj: unknown, filename = 'conversation.json') {
  const data = JSON.stringify(obj, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

export default function ConversationLoader() {
  const { addConversation, setSelected, selected, newConversation, uiMainHandle, showTimestamps, createSnapshot } = useConversations();
  const { upsert } = useParticipants();
  const form = useConversationForm();

  // Import UX state
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [warnings, setWarnings] = React.useState<string[]>([]);
  const [showWarn, setShowWarn] = React.useState<boolean>(true);

  const onClickImport = () => fileRef.current?.click();

  const onImportFile = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setErrors([]); setWarnings([]);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result || '');
        if (!text.trim()) {
          setErrors(['Selected file is empty.']);
          return;
        }
        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          setErrors(['File content is not valid JSON.']);
          return;
        }

        // Map & validate
        const result = mapConversationJSON(parsed);
        setWarnings(result.warnings);

        if (!result.ok || !result.conversation) {
          setErrors(result.errors.length ? result.errors : ['Unknown import error.']);
          return;
        }

        const conv = result.conversation;

        // Hydrate Global Participants AFTER success
        (conv.participants ?? []).forEach((h: string) => {
          const color = conv.participantColors?.[h] ?? '#89a3ff';
          upsert({ handle: h, color });
        });

        // Add to app context (selection list); Formik reinitializes from selection
        addConversation(conv as any);
        setSelected(conv as any);

        // Make warnings visible by default if any
        if (result.warnings.length) setShowWarn(true);
      } catch (err) {
        setErrors(['Unexpected error while reading the file.']);
      }
    };
    reader.readAsText(f);
    e.currentTarget.value = '';
  }, [addConversation, setSelected, upsert]);

  const handleSave = React.useCallback(() => {
    const v = form.values;
    if (!v) return;
    const entry = { id: genId(), savedAt: new Date().toISOString(), label: 'Manual save' };
    const toSave = { ...v, edits: [...(v.edits ?? []), entry] };
    const filename = (v.title ? v.title.replace(/[^\w\-]+/g, '_') : `conversation_${v.id}`) + '.json';
    downloadJson(toSave, filename);
  }, [form.values]);

  const handleNew = React.useCallback(() => {
    const conv = newConversation('Untitled');
    setSelected(conv);
  }, [newConversation, setSelected]);

  const handlePdf = React.useCallback(() => {
    if (!form?.values) return;
    exportConversationAsPdf(form.values, uiMainHandle, { showTimestamps });
  }, [form.values, uiMainHandle, showTimestamps]);

  return (
    <Collapsible title="Load / Save / Export">
      <Stack spacing={1.25}>
        {/* Error block */}
        <Collapse in={errors.length > 0}>
          <Alert severity="error" variant="outlined" sx={{ whiteSpace: 'pre-wrap' }} onClose={() => setErrors([])}>
            <AlertTitle>Import failed</AlertTitle>
            {errors.slice(0, 5).map((e, i) => <div key={i}>• {e}</div>)}
            {errors.length > 5 && <div>…and {errors.length - 5} more.</div>}
          </Alert>
        </Collapse>

        {/* Warning block */}
        <Collapse in={warnings.length > 0 && showWarn}>
          <Alert severity="warning" variant="outlined" sx={{ whiteSpace: 'pre-wrap' }} onClose={() => setShowWarn(false)}>
            <AlertTitle>Imported with adjustments</AlertTitle>
            {warnings.slice(0, 6).map((w, i) => <div key={i}>• {w}</div>)}
            {warnings.length > 6 && (
              <div>
                …and {warnings.length - 6} more.{' '}
                <MuiLink component="button" onClick={() => setShowWarn(false)} underline="hover">Hide</MuiLink>
              </div>
            )}
          </Alert>
        </Collapse>

        {/* Import button */}
        <Button fullWidth size="small" variant="outlined" startIcon={<UploadIcon />} onClick={onClickImport}>
          Import JSON…
        </Button>
        <input ref={fileRef} type="file" hidden accept="application/json" onChange={onImportFile} />

        <Divider sx={{ opacity: 0.5 }} />

        {/* Save / PDF */}
        <ButtonGroup fullWidth size="small" variant="outlined">
          <Tooltip title="Save conversation as JSON (adds a new entry to 'edits')">
            <span><Button startIcon={<SaveAltIcon />} onClick={handleSave} disabled={!form?.values}>Save JSON</Button></span>
          </Tooltip>
          <Tooltip title="Export conversation as PDF">
            <span><Button startIcon={<PictureAsPdfIcon />} onClick={handlePdf} disabled={!form?.values}>PDF</Button></span>
          </Tooltip>
        </ButtonGroup>

        {/* New / Snapshot */}
        <ButtonGroup fullWidth size="small" variant="contained">
          <Button color="primary" startIcon={<AddCircleIcon />} onClick={handleNew}>New</Button>
          <span>
            <Button
              color="secondary"
              startIcon={<CameraIcon />}
              disabled={!selected}
              onClick={() => selected && createSnapshot(selected.id, 'Snapshot')}
            >
              Snapshot
            </Button>
          </span>
        </ButtonGroup>
      </Stack>
    </Collapsible>
  );
}

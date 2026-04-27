'use client'

import React, { useMemo, useState, ReactNode, isValidElement } from 'react';
import { TextField, Stack, } from '@mui/material';
import Collapsible from '@/components/common/Collapsible';
import TemplatesList from './TemplatesList';
import privateRecordsTemplates from '../../form/templates/privateRecordsTemplates';
import medicalEventsTemplates from '../../form/templates/medicalEventsTemplates';
import { useField } from 'formik';
import { Template } from '../../form/types';

const templatesByTab: Record<string, { name: string, list: Template[] }> = {
  'privateRecords': {
    name: 'Private records',
    list: privateRecordsTemplates,
  },
  'medicalEvents': {
    name: 'Medical events',
    list: medicalEventsTemplates,
  },
}

const nodeText = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) return nodeText(node.props.children);
  return "";
};

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")     // strip diacritics
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const textOf = (v: string | JSX.Element) => nodeText(v);

// --- filtering ---
export const filterTemplatesByName = (templates: Template[], query: string) => {
  const q = normalize(query);
  return templates.filter((t) => {
    const name = normalize(textOf(t.name));
    const sub = normalize(textOf(t.subName));
    return name.includes(q) || sub.includes(q);
  });
};

function TemplateProvider() {
  const [tabField] = useField('tab');
  const [query, setQuery] = useState<string>('');

  const templates = useMemo(() => {
    const temp = templatesByTab[tabField.value];
    if (!temp) return null;
    const q = query.trim().toLowerCase();
    return {
      ...temp,
      list: filterTemplatesByName(temp.list, q),
    }
  }, [tabField, query]);

  return (
    <Collapsible title="Private Records Templates">
      <Stack spacing={1.5}>
        <TextField size="small" placeholder="Filter..." value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
        <TemplatesList templates={ templates } />
      </Stack>
    </Collapsible>
  );
}

export default TemplateProvider;

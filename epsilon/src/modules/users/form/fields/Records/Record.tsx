"use client";

import React, { useCallback, useMemo } from 'react';
import isEqual from "fast-deep-equal";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Input from "./Input";
import SectionCard from "@/components/common/SectionCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoupeOutlinedIcon from "@mui/icons-material/LoupeOutlined";
import { useField, useFormikContext } from 'formik';
import DropField from "@/components/common/DropField";
import { Template } from '../../types';
import mapTemplateToForm from './mapTemplateToForm';

interface RecordProps {
  name: string;
  onReAdd: () => void;
  onRemove: () => void;
}

export default function Record({ name, onRemove, onReAdd }: RecordProps) {
  const { values } = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const isChanged = useMemo(() => !isEqual(meta.value, meta.initialValue), [meta.value, meta.initialValue]);

  const handleTemplateDrop = useCallback((template: Template) => {
    if (!template) return;
    const next = mapTemplateToForm(template, field.value, values);
    console.log({ next })
    helpers.setValue(next);
  }, [field.value, helpers, values]);

  return (
    <DropField onDropData={ handleTemplateDrop }>
      {({ isOver, bind }) => (
        <SectionCard
          {...bind}
          sx={
            field.value._removed
              ? { borderColor: "black", background: "rgba(255,0,0,0.15)", boxShadow: "initial" }
              : isChanged
                ? { background: "rgba(0,0,255,0.15)" }
                : {}
          }
          // subtle visual hint while dragging over this record
          style={{
            outline: isOver ? "2px dashed rgba(59,130,246,0.6)" : "none",
            outlineOffset: 4,
            transition: "outline 120ms ease",
          }}
          right={
            <>
              {field.value._removed && (
                <Box sx={{ ml: 1, mr: 2 }}>
                  <Typography color="error">Removed</Typography>
                </Box>
              )}
              {isChanged && !field.value._removed && (
                <Box sx={{ ml: 1, mr: 2 }}>
                  <Typography color="info">Changed</Typography>
                </Box>
              )}
              <Box sx={{ width: "100%", mr: 2 }} onClick={(e) => e.stopPropagation()}>
                <Input label="Title" name={`${name}.title`} />
              </Box>
              {field.value._removed ? (
                <Tooltip title="Re-add">
                  <IconButton onClick={onReAdd} color="secondary">
                    <LoupeOutlinedIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Remove">
                  <IconButton onClick={onRemove} color="error">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          }
        >
          <Input label="Description" name={`${name}.description`} minRows={5} multiline />
        </SectionCard>
      )}
    </DropField>
  );
}

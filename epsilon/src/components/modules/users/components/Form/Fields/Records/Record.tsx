import React, { useMemo } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Input from "../Input";
import SectionCard from "@/components/common/SectionCard";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import { useField } from "formik";
import type { RecordModel } from "./Records";

type Props = {
  name: string;
  onSave: (record: RecordModel) => void;
  onRemove: () => void;
};

function shallowStableStringify(obj: unknown): string {
  // sufficient + fast for this shape {id,title,description,_new?}
  return JSON.stringify(obj);
}

const Record: React.FC<Props> = ({ name, onSave, onRemove }) => {
  // grab the whole record object from formik
  const [field, meta] = useField<RecordModel>(name);

  const isChanged = useMemo(() => {
    // Compare current vs initial snapshot
    return (
      shallowStableStringify(meta.value) !==
      shallowStableStringify(meta.initialValue)
    );
  }, [meta.value, meta.initialValue]);

  return (
    <SectionCard
      right={
        <>
          <Box sx={{ width: "100%", mr: 2 }} onClick={(e) => e.stopPropagation()}>
            <Input label="Title" name={`${name}.title`} />
          </Box>
          <Tooltip title="Save" sx={{ mr: 1 }}>
            <IconButton
              onClick={() => onSave(meta.value)}
              color="primary"
              disabled={!isChanged}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove">
            <IconButton onClick={onRemove} color="error">
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <Input
        label="Description"
        name={`${name}.description`}
        minRows={5}
        multiline
      />
    </SectionCard>
  );
};

export default Record;

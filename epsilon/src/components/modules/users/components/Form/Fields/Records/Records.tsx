import React, { useCallback } from "react";
import { useField } from "formik";
import Record from "./Record";
import { Button, Box } from "@mui/material";

export type RecordModel = {
  id: string;
  title: string;
  description: string;
  /** client-only marker to route save */
  _new?: boolean;
};

const empty = (): RecordModel => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  _new: true,
});

interface RecordsProps {
  name: string;
  api: {
    remove: (id: string) => Promise<void>;
    edit: (record: RecordModel) => Promise<void>;
    add: (record: Omit<RecordModel, "_new">) => Promise<void>;
  };
}

function Records({ name, api }: RecordsProps) {
  const [field, , helpers] = useField<RecordModel[]>(name);
  const list = Array.isArray(field.value) ? field.value : [];

  const addNewRecord = useCallback(() => {
    helpers.setValue([...(list ?? []), empty()]);
  }, [helpers, list]);

  const removeRecord = useCallback(
    async (id: string) => {
      await api.remove(id);
      helpers.setValue(list.filter((r) => r.id !== id));
    },
    [api, helpers, list]
  );

  const saveRecord = useCallback(
    async (record: RecordModel) => {
      if (record._new) {
        const { _new, ...payload } = record;
        await api.add(payload);
        // reflect that it’s no longer new (so next save would be edit)
        helpers.setValue(
          list.map((r) => (r.id === record.id ? { ...payload } : r))
        );
      } else {
        await api.edit(record);
      }
    },
    [api, helpers, list]
  );

  return (
    <div>
      <Button variant="outlined" fullWidth onClick={addNewRecord}>
        Add
      </Button>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 2,
        }}
      >
        {list.map((_, index) => (
          <Box key={_.id} sx={{ position: "relative" }}>
            <Record
              name={`${name}[${index}]`}
              onRemove={() => removeRecord(_.id)}
              onSave={saveRecord}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Records;

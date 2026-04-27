import React, { useEffect, useState } from 'react';
import Records from '../Fields/Records';
import { useField, useFormikContext } from 'formik';
import * as privateRecords from '../../../../../../actions/privateRecords';

function PrivateRecordsTab() {
  const [{ value: userId }] = useField<string>('id');
  const [{ value: records }, , recordsHelpers] =
    useField<PrivateRecord[]>("privateRecords");

  // access full form values when we need the latest snapshot
  const { values } = useFormikContext<{ privateRecords: PrivateRecord[] }>();

  const [isLoading, setIsLoading] = useState(false);

  // initial load + reload when userId changes
  useEffect(() => {
    if (!userId) return;
    const ac = new AbortController();
    setIsLoading(true);

    listPrivateRecords(userId, { signal: ac.signal })
      .then((data) => {
        // normalize to array
        recordsHelpers.setValue(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") {
          console.error("Failed to load private records", err);
        }
      })
      .finally(() => setIsLoading(false));

    return () => ac.abort();
  }, [userId, recordsHelpers]);

  const api = {
    remove: async (recordId: string) => {
      if (!userId) return;
      await removePrivateRecord(userId, recordId);
      recordsHelpers.setValue(
        (values.privateRecords || []).filter((r) => r.id !== recordId)
      );
    },

    edit: async (record: PrivateRecord) => {
      if (!userId) return;
      const updated = await editPrivateRecord(userId, record);
      recordsHelpers.setValue(
        (values.privateRecords || []).map((r) =>
          r.id === updated.id ? updated : r
        )
      );
    },

    add: async (record: PrivateRecordInput) => {
      if (!userId) return;
      const created = await addPrivateRecord(userId, record);
      recordsHelpers.setValue([...(values.privateRecords || []), created]);
    },
  };

  // `Records` already renders the list; you can show a spinner if you want
  return <Records name="privateRecords" api={api} />;
}

export default PrivateRecordsTab;

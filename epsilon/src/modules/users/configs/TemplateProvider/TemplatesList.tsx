import React from 'react';
import { Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import DragTemplateItem from '@/components/common/DragTemplateItem';
import { Template } from '../../form/types';

interface TemplatesListProps {
  templates: { name: string, list: Template[] } | null,
}

function TemplatesList({ templates }: TemplatesListProps) {

  if (!templates) return (
    <Typography color="text.secondary">No templates available in this tab.</Typography>
  );

  if (templates.list.length === 0) return (
    <Typography color="text.secondary">No templates found.</Typography>
  );

  return (
    <>
      <Divider sx={{ opacity: 0.5 }} />
      <List dense disablePadding sx={{ maxHeight: '400px', overflowY: 'scroll' }}>
        { templates.list.map((template) => (
          <DragTemplateItem key={ template.id } dragItem={ template }>
            <ListItemButton sx={{ borderRadius: 1, mb: 0.5, mr: 1 }}>
              <ListItemText primary={ template.name } secondary={ template.subName } />
            </ListItemButton>
          </DragTemplateItem>
        )) }
      </List>
    </>
  );
}

export default TemplatesList;
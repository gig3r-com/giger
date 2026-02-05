import React from 'react';
import { TabType, useFormsStore } from '@/store/formsStore';
import { Chip } from '@mui/material';
import { Close, Person, Forum } from '@mui/icons-material';
import { colors } from '@/components/ThemeRegistry';
import { alpha } from '@mui/material/styles';

type TabChipProps = {
    tab: TabType;
};

const encodeTabKey = (type: string, id: string) => `${ type }:${ id }`;

const tabConfigByType = {
    user: {
        icon: <Person fontSize="small"/>,
        color: colors.bioAcid,
    },
    conversation: {
        icon: <Forum fontSize="small"/>,
        color: colors.cpCyan,
    },
};

function TabChip({ tab }: TabChipProps) {
    const { removeTab, setActiveTab, activeTab } = useFormsStore();

    const tabKey = encodeTabKey(tab.type, tab.id);
    const isActive = activeTab === tabKey;
    const config = tabConfigByType[tab.type];

    return (
        <Chip
            key={ tabKey }
            icon={ config?.icon }
            label={ tab.name }
            clickable
            variant="outlined"
            onClick={ () => setActiveTab(tabKey) }
            onDelete={ (e) => {
                e.stopPropagation();
                removeTab(tab.code);
                if (isActive) {
                    setActiveTab(null);
                }
            } }
            deleteIcon={ <Close fontSize="small"/> }
            sx={ {
                borderRadius: 1,
                p: 1,
                backgroundColor: 'transparent',
                borderColor: isActive ? config.color : 'transparent',
                color: config.color,
                transition: 'all 0.2s ease',

                '& .MuiChip-icon, & .MuiChip-deleteIcon': {
                    color: isActive ? config.color : alpha(config.color, 0.4),
                },

                ...(isActive && {
                    boxShadow: `0 0 2px ${ config.color }, 0 0 6px ${ config.color }`,
                }),

                '&:hover': {
                    borderColor: config.color,
                },
            } }
        />
    );
}

export default TabChip;

'use client'

import React, { FC, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import { List, ListItemButton, ListItemText } from "@mui/material";

import { useUsers } from "@/components/modules/users";
import { ApiUser } from "@/app/api/mappers/user";
import { users } from '@/mockData/users';

interface UserListProps {
    search: string;
    useMockData?: boolean;
}

const UserList: FC<UserListProps> = ({ search, useMockData = false }) => {
    const { usersByHandle, selected, setSelected } = useUsers();

    const items = useMemo<ApiUser[]>(() => {
        return useMockData ? users : Object.values(usersByHandle ?? {});
    }, [useMockData, usersByHandle]);

    const indexedUsers = useMemo(
        () =>
            items.map((user) => ({
                user,
                handle: (user.handle ?? "").toLowerCase(),
                faction: (user.faction ?? "").toLowerCase(),
            })),
        [items]
    );

    const deferredQuery = useDeferredValue(search);

    const filtered = useMemo<ApiUser[]>(() => {
        const q = deferredQuery.trim().toLowerCase();
        if (!q) return items;

        let base = indexedUsers
            .filter(({ handle, faction }) => handle.includes(q) || faction.includes(q))
            .map(({ user }) => user);

        if (selected && !base.some((u) => u.id === selected.id)) {
            base = [selected, ...base];
        }

        return base;
    }, [deferredQuery, indexedUsers, items, selected]);

    return (
        <List dense disablePadding sx={{ overflowY: "auto" }}>
            {filtered.map((user) => (
                <Link
                    key={user.id}
                    href={`/creator/users/${user.handle}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => setSelected(user)}
                >
                    <ListItemButton
                        sx={{ borderRadius: 1, mb: 0.5 }}
                        selected={selected?.id === user.id}
                    >
                        <ListItemText
                            primaryTypographyProps={{ noWrap: true }}
                            primary={user.handle}
                            secondaryTypographyProps={{ noWrap: true }}
                            secondary={user.faction}
                        />
                    </ListItemButton>
                </Link>
            ))}
        </List>
    );
};

export default UserList;

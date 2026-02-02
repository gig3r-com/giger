import { ApiUser } from "@/app/api/mappers/user";

export const mockUsers: ApiUser[] = Array.from({ length: 100 }).map(
    (_, i) => ({
        id: `mock-${i + 1}`,
        handle: `user${i + 1}`,
        faction: ["red", "blue", "green", "yellow"][(i % 4)],
    })
);
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type TabTypes = 'user' | 'conversation' | 'account' | 'gig';

export type TabType = {
    type: TabTypes;
    id: string;
    code: string;
    name: string;
    formData: unknown | null;
    epsilonData: unknown | null;
    data: unknown | null;
};

type FormsStore = {
    tabs: TabType[];
    activeTab: string | null;

    addTab: (tab: Omit<TabType, 'code'>) => void;
    removeTab: (code: string) => void;
    hasTab: (code: string) => boolean;

    setActiveTab: (code: string | null) => void;
    getActiveTab: () => TabType | null;

    updateTabFormData: (code: string, formData: unknown | null) => void;
    updateTabEpsilonData: (code: string, epsilonData: unknown | null) => void;
};

export const encodeTabKey = (type: TabTypes, id: string) =>
    `${type}:${id}`;

export const useFormsStore = create<FormsStore>()(
    devtools(
        persist(
            (set, get) => ({
                tabs: [],
                activeTab: null,

                addTab: (tab) =>
                    set((state) => {
                        const code = encodeTabKey(tab.type, tab.id);

                        if (state.tabs.some((t) => t.code === code)) {
                            return {
                                activeTab: code,
                            };
                        }

                        return {
                            activeTab: code,
                            tabs: [
                                ...state.tabs,
                                {
                                    ...tab,
                                    code,
                                    formData: tab.formData ?? null,
                                    epsilonData: tab.epsilonData ?? null,
                                },
                            ],
                        };
                    }),

                removeTab: (code) =>
                    set((state) => ({
                        tabs: state.tabs.filter((t) => t.code !== code),
                        activeTab: state.activeTab === code ? null : state.activeTab,
                    })),

                hasTab: (code) =>
                    get().tabs.some((t) => t.code === code),

                setActiveTab: (code) =>
                    set({ activeTab: code }),

                getActiveTab: () => {
                    const code = get().activeTab;
                    if (!code) return null;

                    return get().tabs.find((t) => t.code === code) ?? null;
                },

                updateTabFormData: (code, formData) =>
                    set((state) => ({
                        tabs: state.tabs.map((tab) =>
                            tab.code === code ? { ...tab, formData } : tab
                        ),
                    })),

                updateTabEpsilonData: (code, epsilonData) =>
                    set((state) => ({
                        tabs: state.tabs.map((tab) =>
                            tab.code === code ? { ...tab, epsilonData } : tab
                        ),
                    })),
            }),
            {
                name: 'forms-tabs',
            }
        ),
        { name: 'FormsStore' }
    )
);

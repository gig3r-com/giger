import {programs, BREACH_VALUES} from "@/app/hacking/data/programs";

export const firewalls = {
    A: {
        name: 'OS A',
        securityLevel: 'basic',
        [BREACH_VALUES.SUCCESS]: [ programs.A1.name ],
        [BREACH_VALUES.PARTIAL_SUCCESS]: [ programs.B1.name ],
        [BREACH_VALUES.FAIL]: [ programs.C1.name ],
    },
    B: {
        name: 'Firewall B',
        securityLevel: 'basic',
        [BREACH_VALUES.SUCCESS]: [ programs.B1.name ],
        [BREACH_VALUES.PARTIAL_SUCCESS]: [ programs.C1.name ],
        [BREACH_VALUES.FAIL]: [ programs.A1.name ],
    },
    C: {
        name: 'Firewall C',
        securityLevel: 'basic',
        [BREACH_VALUES.SUCCESS]: [ programs.C1.name ],
        [BREACH_VALUES.PARTIAL_SUCCESS]: [ programs.A1.name ],
        [BREACH_VALUES.FAIL]: [ programs.B1.name ],
    },
}

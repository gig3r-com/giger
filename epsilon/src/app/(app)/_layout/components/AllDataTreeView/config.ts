import type { SvgIconComponent } from '@mui/icons-material';
import type { User, Conversation, Account, Subnetwork, Network } from '@/types';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DevicesIcon from '@mui/icons-material/Devices';

type Config<T, TType extends string> = {
    Icon: SvgIconComponent;
    type: TType;
    filterOptions: (keyof T)[];
    makeLabel: (item: T) => string;
};

export type ConfigsById = {
    users: Config<User, 'user'>;
    conversations: Config<Conversation, 'conversation'>;
    accounts: Config<Account, 'account'>;
    subnetworks: Config<Subnetwork, 'subnetwork'>;
    networks: Config<Network, 'network'>;
};

export const configsById = {
    users: {
        Icon: PersonIcon, type: 'user', filterOptions: ['name', 'surname', 'handle'],
        makeLabel: (user: User) => user.handle,
    },
    conversations: {
        Icon: ForumIcon, type: 'conversation', filterOptions: ['name', 'id', 'participants',],
        makeLabel: (conv: Conversation) => conv.participants.length === 2
            ? `@${ conv.participants[0] } ↔ @${ conv.participants[1] }`
            : `Conversation ${ conv.id }`,
    },
    accounts: {
        Icon: AccountBalanceIcon, type: 'account', filterOptions: ['name', 'ownerHandle',],
        makeLabel: (acc: Account) => acc.name ?? acc.id,
    },
    subnetworks: {
        Icon: AccountTreeIcon, type: 'subnetwork', filterOptions: ['name',],
        makeLabel: (sn: Subnetwork) => sn.name ?? sn.id,
    },
    networks: {
        Icon: DevicesIcon, type: 'network', filterOptions: ['name',],
        makeLabel: (n: Network) => n.name ?? n.id,
    },
};
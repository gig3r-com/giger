import { FC } from 'react';
import { useRegistry } from '../../../../tenant/tenant.registry';
import { IGigBodyProps } from './gig-body.model';

import './gig-body.scss';

const GigBodyRoute: FC<IGigBodyProps> = (props) => {
    const { GigBody } = useRegistry();

    return <GigBody {...props} />;
};

export default GigBodyRoute;

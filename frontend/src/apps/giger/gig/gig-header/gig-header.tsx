import { FC } from 'react';
import { useRegistry } from '../../../../tenant/tenant.registry';
import { IGigHeaderProps } from './gig-header.model';

const GigHeaderRoute: FC<IGigHeaderProps> = (props) => {
    const { GigHeader } = useRegistry();

    return <GigHeader {...props} />;
};

export default GigHeaderRoute;

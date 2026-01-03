import { FC } from 'react';
import { useRegistry } from '../../../tenant/tenant.registry';
import { IGigProps } from './gig.model';

const GigRoute: FC<IGigProps> = (props) => {
    const { Gig } = useRegistry();

    return <Gig {...props} />;
};

export default GigRoute;

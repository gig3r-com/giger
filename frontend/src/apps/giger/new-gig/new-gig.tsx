import { FC } from 'react';
import { useRegistry } from '../../../tenant/tenant.registry';
import { INewGigProps } from './new-gig.model';

const NewGigRoute: FC<INewGigProps> = (props) => {
    const { NewGig } = useRegistry();

    return <NewGig {...props} />;
};

export default NewGigRoute;

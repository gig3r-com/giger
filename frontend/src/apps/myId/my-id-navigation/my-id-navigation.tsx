import { FC } from 'react';
import { MyIdNavigationProps } from '../myid.model';
import { useRegistry } from '../../../tenant/tenant.registry';

import './my-id-navigation.scss';

const MyIdNavigationRoute: FC<MyIdNavigationProps> = (props) => {
    const { MyIdNavigation } = useRegistry();

    return <MyIdNavigation {...props} />;
};

export default MyIdNavigationRoute;

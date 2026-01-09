import { useRegistry } from '../../../tenant/tenant.registry';

import './main-menu.scss';

const MainMenuRoute = () => {
    const { MainMenu } = useRegistry();

    return <MainMenu />;
};

export default MainMenuRoute;

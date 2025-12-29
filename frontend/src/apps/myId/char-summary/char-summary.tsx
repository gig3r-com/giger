import { FC } from 'react';
import { useRegistry } from '../../../tenant/tenant.registry';
import { ICharSummaryProps } from './char-summary.model';

import './char-summary.scss';

const CharSummaryRoute: FC<ICharSummaryProps> = (props) => {
    const { CharSummary } = useRegistry();
    return <CharSummary {...props} />;
};

export default CharSummaryRoute;

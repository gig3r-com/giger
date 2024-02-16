import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useUserService } from '../../../../shared/services/user.service';
import { CharSummary } from '../../char-summary/char-summary';
import { BigButton } from '../../../../shared/components/big-button/big-button';

export const AllData: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const { currentUser } = useUserService();
    
    return (
        <section className="all-data my-screen">
            {currentUser && <CharSummary mode="private" />}
            <div className="all-data__buttons">
                <BigButton
                    className="all-data__all-info"
                    text={intl.formatMessage({ id: 'SEE_ALL_THE_INFO' })}
                    color="primary"
                    onClick={() => navigate('/myid/details')}
                />
            </div>
        </section>
    );
};

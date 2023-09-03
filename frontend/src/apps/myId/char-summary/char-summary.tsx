import { FC } from 'react';
import { IUser } from '../../../models/user';
import { ReactComponent as HumanSignature } from '../../../assets/id-human.svg';
import { ReactComponent as AISignature } from '../../../assets/id-ai.svg';
import { ReactComponent as AndroidSignature } from '../../../assets/id-android.svg';
import MemoizedFormattedMessage from 'react-intl/src/components/message';

import './char-summary.scss';

export const CharSummary: FC<{ user: IUser }> = ({ user }) => {

    const signature = () => {
        switch (user.type) {
            case 'human':
                return <HumanSignature className='char-summary__signature' />;
            case 'ai':
                return <AISignature className='char-summary__signature' />;
            case 'android':
                return <AndroidSignature className='char-summary__signature' />;
            default:
                return <HumanSignature className='char-summary__signature' />;
        }
    };

    return (
        <section className="char-summary">
            <header className="char-summary__header">
                <span className="char-summary__surname">{user.surname},</span>
                <span className="char-summary__name">{user.name}</span>
            </header>
            <div className='char-summary__signature-and-basic-data'>
               {signature()}
               <div className='char-summary__basic-data'>
                    <span className='char-summary__label'><MemoizedFormattedMessage id='ALIAS' />:</span>
                    <span className='char-summary__entry'>{user.alias}</span>

                    <span className='char-summary__label'><MemoizedFormattedMessage id='INSURANCE' />:</span>
                    <span className='char-summary__entry'>{user.insurance}</span>

                    <span className='char-summary__label'><MemoizedFormattedMessage id='AGE' />:</span>
                    <span className='char-summary__entry'>{user.age}</span>

                    <span className='char-summary__label'><MemoizedFormattedMessage id='CYBERWARE' />:</span>
                    <span className='char-summary__entry'>{user.cyberwarePercentage}</span>
               </div>
            </div>
            <div className='char-summary__details'>
                <span className='char-summary__label'><MemoizedFormattedMessage id='AFFILIATION' />:</span>
                <span className='char-summary__entry'>{user.affiliation}</span>

                
                <span className='char-summary__label'><MemoizedFormattedMessage id='PROFESSION' />:</span>
                <span className='char-summary__entry'>{user.profession}</span>

                
                <span className='char-summary__label'><MemoizedFormattedMessage id='NET_WORTH' />:</span>
                <span className='char-summary__entry'>{user.netWorth}</span>

                <span className='char-summary__id-valid-section'>
                    <span className='char-summary__id-valid'><MemoizedFormattedMessage id='ID_VALID' /></span>
                    <span className='char-summary__id-valid-to'>{user.IDValidTo}</span>
                </span>
            </div>
        </section>
    );
};

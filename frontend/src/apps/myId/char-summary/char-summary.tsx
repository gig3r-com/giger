import { FC } from 'react';
import { IUser } from '../../../models/user';
import { ReactComponent as HumanSignature } from '../../assets/id-human.svg';
import { ReactComponent as AISignature } from '../../assets/id-ai.svg';
import { ReactComponent as AndroidSignature } from '../../assets/id-android.svg';

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
                <span className="char-summary__surname">{user.surname}</span>
                <span className="char-summary__name">{user.name}</span>
            </header>
            <div className='char-summary__signature-and-basic-data'>
               {signature()}
               <div className='char-summary__basic-data'>
                    
               </div>
            </div>
        </section>
    );
};

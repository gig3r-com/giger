import { FC } from 'react';
import { IUser } from '../../../models/user';
import { ReactComponent as HumanSignature } from '../../../assets/id-human.svg';
import { ReactComponent as AISignature } from '../../../assets/id-ai.svg';
import { ReactComponent as AndroidSignature } from '../../../assets/id-android.svg';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';
import { useUserService } from '../../../shared/services/user.service';

import './char-summary.scss';

export const CharSummary: FC<{ user: IUser }> = ({ user }) => {
    const { updateUserData } = useUserService();
    const signature = () => {
        switch (user.type) {
            case 'human':
                return <HumanSignature className="char-summary__signature" />;
            case 'ai':
                return <AISignature className="char-summary__signature" />;
            case 'android':
                return <AndroidSignature className="char-summary__signature" />;
            default:
                return <HumanSignature className="char-summary__signature" />;
        }
    };

    return (
        <section className="char-summary">
            <header className="char-summary__header">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={user.surname}
                    className="char-summary__surname"
                    onChange={(val) =>
                        updateUserData(user.id, { surname: val })
                    }
                />
                ,
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    className="char-summary__name"
                    value={user.name}
                    onChange={(val) => updateUserData(user.id, { name: val })}
                />
            </header>
            <div className="char-summary__signature-and-basic-data">
                {signature()}
                <div className="char-summary__basic-data">
                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="ALIAS" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        className="char-summary__entry"
                        value={user.alias}
                        onChange={(val) =>
                            updateUserData(user.id, { alias: val })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="INSURANCE" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.BOOLEAN}
                        className="char-summary__entry"
                        value={user.insurance}
                        onChange={(val) =>
                            updateUserData(user.id, { insurance: val })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="AGE" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.NUMBER}
                        className="char-summary__entry"
                        value={user.age}
                        onChange={(val) =>
                            updateUserData(user.id, { age: val })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="CYBERWARE" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.NUMBER}
                        className="char-summary__entry"
                        value={user.cyberwarePercentage}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                cyberwarePercentage: val
                            })
                        }
                    />
                </div>
            </div>
            <div className="char-summary__details">
                <span className="char-summary__label">
                    <MemoizedFormattedMessage id="AFFILIATION" />:
                </span>
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    className="char-summary__entry"
                    value={user.affiliation}
                    onChange={(val) =>
                        updateUserData(user.id, { affiliation: val })
                    }
                />

                <span className="char-summary__label">
                    <MemoizedFormattedMessage id="PROFESSION" />:
                </span>
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    className="char-summary__entry"
                    value={user.profession}
                    onChange={(val) =>
                        updateUserData(user.id, { profession: val })
                    }
                />

                <span className="char-summary__label">
                    <MemoizedFormattedMessage id="NET_WORTH" />:
                </span>
                <AdminEditableField
                    type={FieldTypes.NUMBER}
                    className="char-summary__entry"
                    value={user.netWorth}
                    onChange={(val) =>
                        updateUserData(user.id, { netWorth: val })
                    }
                />

                <span className="char-summary__id-valid-section">
                    <span className="char-summary__id-valid">
                        <MemoizedFormattedMessage id="ID_VALID" />
                    </span>

                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        className="char-summary__id-valid-to"
                        value={user.IDValidTo}
                        onChange={(val) =>
                            updateUserData(user.id, { IDValidTo: val })
                        }
                    />
                </span>
            </div>
        </section>
    );
};

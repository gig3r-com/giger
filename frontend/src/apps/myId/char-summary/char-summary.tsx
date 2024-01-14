import { FC } from 'react';
import { useIntl } from 'react-intl';
import {
    CharStat,
    CyberwareLevel,
    IUser,
    SkillStat,
    Vibe,
    VibeEngagement,
    WealthLevels
} from '../../../models/user';
import { ReactComponent as HumanSignature } from '../../../assets/id-human.svg';
import { ReactComponent as AISignature } from '../../../assets/id-ai.svg';
import { ReactComponent as AndroidSignature } from '../../../assets/id-android.svg';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';
import { useUserService } from '../../../shared/services/user.service';

import './char-summary.scss';

export const CharSummary: FC<{ user: IUser }> = ({ user }) => {
    const intl = useIntl();
    const { updateUserData } = useUserService();
    const signature = () => {
        switch (user.typePublic) {
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
            <div className="char-summary__data">
                <div className="char-summary__signature-and-basic-data">
                    {signature()}
                    <div className="char-summary__basic-data">
                        <span className="char-summary__label char-summary__label--short">
                            <MemoizedFormattedMessage id="HANDLE" />:
                        </span>
                        <AdminEditableField
                            type={FieldTypes.TEXT}
                            className="char-summary__entry char-summary__entry--extended"
                            value={user.handle}
                            onChange={(val) =>
                                updateUserData(user.id, { handle: val })
                            }
                        />

                        <span className="char-summary__label char-summary__label--short">
                            <MemoizedFormattedMessage id="AGE" />:
                        </span>
                        <AdminEditableField
                            type={FieldTypes.NUMBER}
                            className="char-summary__entry char-summary__entry--extended"
                            value={user.age}
                            onChange={(val) =>
                                updateUserData(user.id, { age: val })
                            }
                        />

                        <span className="char-summary__label char-summary__label--short">
                            <MemoizedFormattedMessage id="CYBERWARE" />:
                        </span>
                        <AdminEditableField
                            type={FieldTypes.NUMBER}
                            className="char-summary__entry char-summary__entry--extended"
                            value={user.cyberwareLevel}
                            onChange={(val) =>
                                updateUserData(user.id, {
                                    cyberwareLevel: val as CyberwareLevel
                                })
                            }
                        />
                    </div>
                </div>
                <div className="char-summary__details">
                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="VIBE" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.SELECT}
                        className="char-summary__entry"
                        options={[
                            Vibe.DIGIEVO,
                            Vibe.DIZORDERS,
                            Vibe.HEDONIZERS,
                            Vibe.OVERSEERS,
                            Vibe.SW4RM,
                            Vibe.NO_VIBE
                        ]}
                        value={user.vibe}
                        onChange={(val) =>
                            updateUserData(user.id, { vibe: val as Vibe })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="VIBE_ENGAGEMENT" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.SELECT}
                        className="char-summary__entry"
                        options={[
                            VibeEngagement.DISINTERESTED,
                            VibeEngagement.DOUBTING,
                            VibeEngagement.INTERESTED,
                            VibeEngagement.HYPED,
                            VibeEngagement.FANATIC
                        ]}
                        value={user.vibe}
                        onChange={(val) =>
                            updateUserData(user.id, { vibe: val as Vibe })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="VIBE_FUNCTION" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        className="char-summary__entry"
                        value={user.vibeFunction}
                        onChange={(val) =>
                            updateUserData(user.id, { vibeFunction: val })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="PROFESSION" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        className="char-summary__entry"
                        value={user.professionPublic}
                        onChange={(val) =>
                            updateUserData(user.id, { professionPublic: val })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="PROFESSION_ACTUAL" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        className="char-summary__entry"
                        value={user.professionActual}
                        onChange={(val) =>
                            updateUserData(user.id, { professionActual: val })
                        }
                    />

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="WEALTH" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.SELECT}
                        className="char-summary__entry"
                        value={user.wealthLevel}
                        options={[
                            WealthLevels.BROKE,
                            WealthLevels.IMPOVERISHED,
                            WealthLevels.STRUGGLING,
                            WealthLevels.MODEST,
                            WealthLevels.STABLE,
                            WealthLevels.COMFORTABLE,
                            WealthLevels.AFFLUENT,
                            WealthLevels.ELITE
                        ]}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                wealthLevel: val as WealthLevels
                            })
                        }
                    />

                    <AdminEditableField
                        type={FieldTypes.SLIDER}
                        className="char-summary__entry char-summary__entry--full-length"
                        value={user.hackingSkill}
                        min={0}
                        max={3}
                        showValue={false}
                        label={intl.formatMessage({ id: 'HACKING_SKILL' })}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                hackingSkill: parseInt(val) as SkillStat
                            })
                        }
                    />

                    <AdminEditableField
                        type={FieldTypes.SLIDER}
                        className="char-summary__entry char-summary__entry--full-length"
                        value={user.combatSkill}
                        min={0}
                        max={3}
                        showValue={false}
                        label={intl.formatMessage({ id: 'COMBAT_SKILL' })}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                combatSkill: parseInt(val) as SkillStat
                            })
                        }
                    />

                    <AdminEditableField
                        type={FieldTypes.SLIDER}
                        className="char-summary__entry char-summary__entry--full-length"
                        value={user.talkativeVsSilent}
                        min={0}
                        max={4}
                        showMin={false}
                        showMax={false}
                        showValue={false}
                        label={intl.formatMessage({ id: 'TALKATIVE' })}
                        label2={intl.formatMessage({ id: 'SILENT' })}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                talkativeVsSilent: parseInt(val) as CharStat
                            })
                        }
                    />

                    <AdminEditableField
                        type={FieldTypes.SLIDER}
                        className="char-summary__entry char-summary__entry--full-length"
                        value={user.confrontationVsNegotiation}
                        min={0}
                        max={4}
                        showMin={false}
                        showMax={false}
                        showValue={false}
                        label={intl.formatMessage({ id: 'CONFRONTATIONAL' })}
                        label2={intl.formatMessage({ id: 'NEGOTIATOR' })}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                confrontationVsNegotiation: parseInt(
                                    val
                                ) as CharStat
                            })
                        }
                    />

                    <AdminEditableField
                        type={FieldTypes.SLIDER}
                        className="char-summary__entry char-summary__entry--full-length"
                        value={user.cowardVsFighter}
                        min={0}
                        max={4}
                        showMin={false}
                        showMax={false}
                        showValue={false}
                        label={intl.formatMessage({ id: 'COWARD' })}
                        label2={intl.formatMessage({ id: 'FIGHTER' })}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                cowardVsFighter: parseInt(val) as CharStat
                            })
                        }
                    />

                    <AdminEditableField
                        type={FieldTypes.SLIDER}
                        className="char-summary__entry char-summary__entry--full-length"
                        value={user.thinkerVsDoer}
                        min={0}
                        max={4}
                        showMin={false}
                        showMax={false}
                        showValue={false}
                        label={intl.formatMessage({ id: 'THINKER' })}
                        label2={intl.formatMessage({ id: 'DOER' })}
                        onChange={(val) =>
                            updateUserData(user.id, {
                                thinkerVsDoer: parseInt(val) as CharStat
                            })
                        }
                    />
                </div>
            </div>
        </section>
    );
};

import { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import {
    CharStat,
    CyberwareLevel,
    IUserPrivate,
    IUserPublic,
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
import { useStandardizedAnimation } from '../../../shared/services/standardizedAnimation.service';
import { SelectUser } from '../select-user/select-user';
import { Factions } from '../../../models/companies';

export const CharSummary: FC<{
    mode: 'public' | 'private';
    userData?: IUserPublic;
}> = ({ userData, mode }) => {
    const intl = useIntl();
    const isPrivate = mode === 'private';
    const { updateUserData, currentUser } = useUserService();
    const { generateAnimation } = useStandardizedAnimation();
    const user = useMemo(
        () => userData ?? currentUser,
        [userData, currentUser]
    );
    const signature = () => {
        switch (user!.typePublic) {
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
        <motion.section
            {...generateAnimation('slideInRight')}
            className="char-summary"
            key={user?.id}
        >
            <header className="char-summary__header">
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    value={user!.surname}
                    className="char-summary__surname"
                    onChange={async (val) =>
                        await updateUserData(user!.id, { surname: val })
                    }
                />
                ,
                <AdminEditableField
                    type={FieldTypes.TEXT}
                    className="char-summary__name"
                    value={user!.name}
                    onChange={async (val) =>
                        await updateUserData(user!.id, { name: val })
                    }
                />
                <SelectUser />
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
                            value={user!.handle}
                            onChange={async (val) =>
                                await updateUserData(user!.id, { handle: val })
                            }
                        />

                        <span className="char-summary__label char-summary__label--short">
                            <MemoizedFormattedMessage id="AGE" />:
                        </span>
                        <AdminEditableField
                            type={FieldTypes.NUMBER}
                            className="char-summary__entry char-summary__entry--extended"
                            value={user!.age}
                            onChange={async (val) =>
                                await updateUserData(user!.id, { age: val })
                            }
                        />

                        {isPrivate && (
                            <>
                                <span className="char-summary__label char-summary__label--short">
                                    <MemoizedFormattedMessage id="CYBERWARE" />:
                                </span>
                                <AdminEditableField
                                    type={FieldTypes.NUMBER}
                                    className="char-summary__entry char-summary__entry--extended"
                                    value={
                                        (user as IUserPrivate).cyberwareLevel
                                    }
                                    onChange={async (val) =>
                                        await updateUserData(user!.id, {
                                            cyberwareLevel:
                                                val as CyberwareLevel
                                        })
                                    }
                                />
                            </>
                        )}
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
                        value={user!.vibe}
                        onChange={async (val) =>
                            await updateUserData(user!.id, {
                                vibe: val as Vibe
                            })
                        }
                    />

                    {isPrivate && (
                        <>
                            <span className="char-summary__label">
                                <MemoizedFormattedMessage id="VIBE_ENGAGEMENT" />
                                :
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
                                value={user!.vibe}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        vibe: val as Vibe
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <>
                            <span className="char-summary__label">
                                <MemoizedFormattedMessage id="VIBE_FUNCTION" />:
                            </span>
                            <AdminEditableField
                                type={FieldTypes.TEXT}
                                className="char-summary__entry"
                                value={(user as IUserPrivate).vibeFunction}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        vibeFunction: val
                                    })
                                }
                            />
                        </>
                    )}

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="PROFESSION" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.TEXT}
                        className="char-summary__entry"
                        value={user!.professionPublic}
                        onChange={async (val) =>
                            await updateUserData(user!.id, {
                                professionPublic: val
                            })
                        }
                    />

                    {isPrivate && (
                        <>
                            <span className="char-summary__label">
                                <MemoizedFormattedMessage id="PROFESSION_ACTUAL" />
                                :
                            </span>
                            <AdminEditableField
                                type={FieldTypes.TEXT}
                                className="char-summary__entry"
                                value={(user as IUserPrivate).professionActual}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        professionActual: val
                                    })
                                }
                            />
                        </>
                    )}

                    <span className="char-summary__label">
                        <MemoizedFormattedMessage id="WEALTH" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.SELECT}
                        className="char-summary__entry"
                        value={user!.wealthLevel}
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
                        onChange={async (val) =>
                            await updateUserData(user!.id, {
                                wealthLevel: val as WealthLevels
                            })
                        }
                    />
                    {isPrivate && (user as IUserPrivate).hackingSkill > 0 && (
                        <>
                            <span className="char-summary__label">
                                <MemoizedFormattedMessage id="FACTION" />:
                            </span>
                            <AdminEditableField
                                type={FieldTypes.SELECT}
                                className="char-summary__entry"
                                options={[...Object.values(Factions)]}
                                value={user!.vibe}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        faction: val as Factions
                                    })
                                }
                            />
                        </>
                    )}
                    {isPrivate && (user as IUserPrivate).hackingSkill > 0 && (
                        <>
                            <AdminEditableField
                                type={FieldTypes.SLIDER}
                                className="char-summary__entry char-summary__entry--full-length"
                                value={(user as IUserPrivate).hackingSkill}
                                min={0}
                                max={3}
                                showValue={false}
                                label={intl.formatMessage({
                                    id: 'HACKING_SKILL'
                                })}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        hackingSkill: parseInt(val) as SkillStat
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <>
                            <AdminEditableField
                                type={FieldTypes.SLIDER}
                                className="char-summary__entry char-summary__entry--full-length"
                                value={(user as IUserPrivate).combatSkill}
                                min={0}
                                max={3}
                                showValue={false}
                                label={intl.formatMessage({
                                    id: 'COMBAT_SKILL'
                                })}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        combatSkill: parseInt(val) as SkillStat
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <>
                            <AdminEditableField
                                type={FieldTypes.SLIDER}
                                className="char-summary__entry char-summary__entry--full-length"
                                value={(user as IUserPrivate).talkativeVsSilent}
                                min={0}
                                max={4}
                                showMin={false}
                                showMax={false}
                                showValue={false}
                                label={intl.formatMessage({ id: 'TALKATIVE' })}
                                label2={intl.formatMessage({ id: 'SILENT' })}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        talkativeVsSilent: parseInt(
                                            val
                                        ) as CharStat
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <>
                            <AdminEditableField
                                type={FieldTypes.SLIDER}
                                className="char-summary__entry char-summary__entry--full-length"
                                value={
                                    (user as IUserPrivate)
                                        .confrontationVsNegotiation
                                }
                                min={0}
                                max={4}
                                showMin={false}
                                showMax={false}
                                showValue={false}
                                label={intl.formatMessage({
                                    id: 'CONFRONTATIONAL'
                                })}
                                label2={intl.formatMessage({
                                    id: 'NEGOTIATOR'
                                })}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        confrontationVsNegotiation: parseInt(
                                            val
                                        ) as CharStat
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <>
                            <AdminEditableField
                                type={FieldTypes.SLIDER}
                                className="char-summary__entry char-summary__entry--full-length"
                                value={(user as IUserPrivate).cowardVsFighter}
                                min={0}
                                max={4}
                                showMin={false}
                                showMax={false}
                                showValue={false}
                                label={intl.formatMessage({ id: 'COWARD' })}
                                label2={intl.formatMessage({ id: 'FIGHTER' })}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        cowardVsFighter: parseInt(
                                            val
                                        ) as CharStat
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <>
                            <AdminEditableField
                                type={FieldTypes.SLIDER}
                                className="char-summary__entry char-summary__entry--full-length"
                                value={(user as IUserPrivate).thinkerVsDoer}
                                min={0}
                                max={4}
                                showMin={false}
                                showMax={false}
                                showValue={false}
                                label={intl.formatMessage({ id: 'THINKER' })}
                                label2={intl.formatMessage({ id: 'DOER' })}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        thinkerVsDoer: parseInt(val) as CharStat
                                    })
                                }
                            />
                        </>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

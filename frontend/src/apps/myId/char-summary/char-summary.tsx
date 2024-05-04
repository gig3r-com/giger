import { FC, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import {
    CharStat,
    CyberwareLevel,
    IUserPrivate,
    IUserPublic,
    SkillStat,
    UserTypes,
    Vibe,
    VibeEngagement,
    WealthLevels
} from '../../../models/user';
import HumanSignature from '../../../assets/id-human.svg?react';
import AISignature from '../../../assets/id-ai.svg?react';
import AndroidSignature from '../../../assets/id-android.svg?react';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';
import { useUserService } from '../../../shared/services/user.service';
import { useStandardizedAnimation } from '../../../shared/services/standardizedAnimation.service';
import { SelectUser } from '../select-user/select-user';
import { Factions } from '../../../models/companies';

import './char-summary.scss';

export const CharSummary: FC<{
    mode: 'public' | 'private';
    userData?: IUserPublic;
}> = ({ userData, mode }) => {
    const intl = useIntl();
    const { isGod, fetchCurrentUser } = useUserService();
    const isPrivate = mode === 'private';
    const { updateUserData, currentUser } = useUserService();
    const { generateAnimation } = useStandardizedAnimation();
    const user = useMemo(
        () => userData ?? currentUser,
        [userData, currentUser]
    );
    const signature = () => {
        switch (user!.typePublic) {
            case UserTypes.HUMAN:
                return <HumanSignature className="char-summary__signature" />;
            case UserTypes.AI:
                return <AISignature className="char-summary__signature" />;
            case UserTypes.ANDROID:
                return <AndroidSignature className="char-summary__signature" />;
            default:
                return <HumanSignature className="char-summary__signature" />;
        }
    };

    useEffect(function getFreshUserData() {
        fetchCurrentUser();
    }, []);

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
                                            .stat
                                    }
                                    onChange={async (val) =>
                                        await updateUserData(user!.id, {
                                            cyberwareLevel: {
                                                stat: val
                                            } as CyberwareLevel
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
                                value={(user as IUserPrivate)!.vibeEngagement}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        vibeEngagement: val as VibeEngagement
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
                    {isPrivate && (
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

                    {isPrivate && isGod && (
                        <>
                            <span className="char-summary__label">
                                <MemoizedFormattedMessage id="ACTIVE" />:
                            </span>
                            <AdminEditableField
                                type={FieldTypes.SELECT}
                                className="char-summary__entry"
                                value={user!.active ? 'YES' : 'NO'}
                                options={['YES', 'NO']}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        active: val === 'YES'
                                    })
                                }
                            />
                        </>
                    )}

                    {isPrivate && (
                        <AdminEditableField
                            type={FieldTypes.SLIDER}
                            className="char-summary__entry char-summary__entry--full-length"
                            value={(user as IUserPrivate).hackingSkills.stat}
                            min={0}
                            max={3}
                            showValue={false}
                            label={intl.formatMessage({
                                id: 'HACKING_SKILL'
                            })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    hackingSkills: {
                                        stat: parseInt(val)
                                    } as SkillStat
                                })
                            }
                        />
                    )}

                    {isPrivate && (
                        <AdminEditableField
                            type={FieldTypes.SLIDER}
                            className="char-summary__entry char-summary__entry--full-length"
                            value={(user as IUserPrivate).combatSkill.stat}
                            min={0}
                            max={3}
                            showValue={false}
                            label={intl.formatMessage({
                                id: 'COMBAT_SKILL'
                            })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    combatSkill: {
                                        stat: parseInt(val)
                                    } as SkillStat
                                })
                            }
                        />
                    )}

                    {isPrivate && (
                        <AdminEditableField
                            type={FieldTypes.SLIDER}
                            className="char-summary__entry char-summary__entry--full-length"
                            value={
                                (user as IUserPrivate).talkativeVsSilent.stat
                            }
                            min={0}
                            max={4}
                            showMin={false}
                            showMax={false}
                            showValue={false}
                            label={intl.formatMessage({ id: 'TALKATIVE' })}
                            label2={intl.formatMessage({ id: 'SILENT' })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    talkativeVsSilent: {
                                        stat: parseInt(val)
                                    } as CharStat
                                })
                            }
                        />
                    )}

                    {isPrivate && (
                        <AdminEditableField
                            type={FieldTypes.SLIDER}
                            className="char-summary__entry char-summary__entry--full-length"
                            value={
                                (user as IUserPrivate)
                                    .confrontationVsNegotiation.stat
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
                                    confrontationVsNegotiation: {
                                        stat: parseInt(val)
                                    } as CharStat
                                })
                            }
                        />
                    )}

                    {isPrivate && (
                        <AdminEditableField
                            type={FieldTypes.SLIDER}
                            className="char-summary__entry char-summary__entry--full-length"
                            value={(user as IUserPrivate).cowardVsFighter.stat}
                            min={0}
                            max={4}
                            showMin={false}
                            showMax={false}
                            showValue={false}
                            label={intl.formatMessage({ id: 'COWARD' })}
                            label2={intl.formatMessage({ id: 'FIGHTER' })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    cowardVsFighter: {
                                        stat: parseInt(val)
                                    } as CharStat
                                })
                            }
                        />
                    )}

                    {isPrivate && (
                        <AdminEditableField
                            type={FieldTypes.SLIDER}
                            className="char-summary__entry char-summary__entry--full-length"
                            value={(user as IUserPrivate).thinkerVsDoer.stat}
                            min={0}
                            max={4}
                            showMin={false}
                            showMax={false}
                            showValue={false}
                            label={intl.formatMessage({ id: 'THINKER' })}
                            label2={intl.formatMessage({ id: 'DOER' })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    thinkerVsDoer: {
                                        stat: parseInt(val)
                                    } as CharStat
                                })
                            }
                        />
                    )}
                </div>
            </div>
        </motion.section>
    );
};

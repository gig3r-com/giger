import { FC, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import {
    CharStat,
    CyberwareLevel,
    IUserPrivate,
    SkillStat,
    UserTypes
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
import { ICharSummaryProps } from './char-summary.model';

export const CharSummary: FC<ICharSummaryProps> = ({ userData, mode }) => {
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
        const typeProperty = isPrivate
            ? (user as IUserPrivate)!.typeActual
            : user!.typePublic;

        switch (typeProperty) {
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
                        <MemoizedFormattedMessage id="AFFILIATION" />:
                    </span>
                    <AdminEditableField
                        type={FieldTypes.SELECT}
                        className="char-summary__entry"
                        skipTranslation={true}
                        options={Object.values(Factions) as Factions[]}
                        value={user!.factionRankPublic}
                        onChange={async (val) =>
                            await updateUserData(user!.id, {
                                factionRankPublic: val as Factions
                            })
                        }
                    />

                    {isPrivate && (
                        <>
                            <span className="char-summary__label">
                                <MemoizedFormattedMessage id="PROFESSION" />:
                            </span>
                            <AdminEditableField
                                type={FieldTypes.TEXT}
                                className="char-summary__entry"
                                value={(user as IUserPrivate).factionRankActual}
                                onChange={async (val) =>
                                    await updateUserData(user!.id, {
                                        factionRankActual: val
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
                                    .confrontationistVsAgreeable.stat
                            }
                            min={0}
                            max={4}
                            showMin={false}
                            showMax={false}
                            showValue={false}
                            label={intl.formatMessage({
                                id: 'CONFRONTATIONIST'
                            })}
                            label2={intl.formatMessage({
                                id: 'AGREEABLE'
                            })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    confrontationistVsAgreeable: {
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
                            value={(user as IUserPrivate).cowardVsBrave.stat}
                            min={0}
                            max={4}
                            showMin={false}
                            showMax={false}
                            showValue={false}
                            label={intl.formatMessage({ id: 'COWARD' })}
                            label2={intl.formatMessage({ id: 'BRAVE' })}
                            onChange={async (val) =>
                                await updateUserData(user!.id, {
                                    cowardVsBrave: {
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

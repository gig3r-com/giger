import { FC } from 'react';
import { useUserService } from '../../../shared/services/user.service';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import {
    VibeEngagement,
    IUserPrivate,
    Vibe as VibeNames
} from '../../../models/user';
import { SectionBody } from '../../../shared/components/section-body/section-body';
import { Controls } from '../../../shared/components/controls/controls';
import { AdminEditableField } from '../../../shared/components/admin-editable-field/admin-editable-field';
import { FieldTypes } from '../../../shared/components/admin-editable-field/admin-editable-field.model';

import './vibe.scss';

export const Vibe: FC = () => {
    const { updateUserData, currentUser } = useUserService();
    if (!currentUser) return;

    return (
        <SectionBody>
            <Controls leftSideOption="back" />
            <span className="vibe__label">
                <MemoizedFormattedMessage id="VIBE" />:
            </span>
            <AdminEditableField
                type={FieldTypes.SELECT}
                className="vibe__entry"
                options={[
                    VibeNames.DIGIEVO,
                    VibeNames.DIZORDERS,
                    VibeNames.HEDONIZERS,
                    VibeNames.OVERSEERS,
                    VibeNames.SW4RM,
                    VibeNames.NO_VIBE
                ]}
                value={currentUser!.vibe}
                onChange={async (val) =>
                    await updateUserData(currentUser!.id, {
                        vibe: val as VibeNames
                    })
                }
            />

            <span className="vibe__label">
                <MemoizedFormattedMessage id="VIBE_ENGAGEMENT" />:
            </span>
            <AdminEditableField
                type={FieldTypes.SELECT}
                className="vibe__entry"
                options={[
                    VibeEngagement.DISINTERESTED,
                    VibeEngagement.DOUBTING,
                    VibeEngagement.INTERESTED,
                    VibeEngagement.HYPED,
                    VibeEngagement.FANATIC
                ]}
                value={(currentUser as IUserPrivate)!.vibeEngagement}
                onChange={async (val) =>
                    await updateUserData(currentUser!.id, {
                        vibeEngagement: val as VibeEngagement
                    })
                }
            />

            <span className="vibe__label">
                <MemoizedFormattedMessage id="VIBE_FUNCTION" />:
            </span>
            <AdminEditableField
                type={FieldTypes.TEXT}
                className="vibe__entry"
                value={(currentUser as IUserPrivate).vibeFunction}
                onChange={async (val) =>
                    await updateUserData(currentUser!.id, {
                        vibeFunction: val
                    })
                }
            />

            <span className="vibe__label">
                <MemoizedFormattedMessage id="VIBE_OPINIONS" />:
            </span>
            <AdminEditableField
                type={FieldTypes.TEXTAREA}
                className="vibe__entry vibe__opinions"
                value={(currentUser as IUserPrivate).vibeOpinions}
                onChange={async (val) =>
                    await updateUserData(currentUser!.id, {
                        vibeOpinions: val
                    })
                }
            />
        </SectionBody>
    );
};

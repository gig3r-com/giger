import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { GigCategoryNames, IDraftGig, IGig } from '../../../models/gig';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { Controls } from '../../../shared/components/controls/controls';
import { useGigsService } from '../../../shared/services/gigs.service';
import { categories } from '../categories';
import { IGigProps } from '../gig/gig.model';
import './gig-form.scss';

type GigFormProps = {
    active: boolean;
    mode?: 'edit' | 'new';
} & Partial<IGigProps>;

export const GigForm: FC<GigFormProps> = ({
    mode = 'new',
    active,
    ...gigProps
}) => {
    const { gig } = gigProps;
    const navigate = useNavigate();
    const intl = useIntl();
    const { addNewGig, updateGig } = useGigsService();
    const [gigName, setGigName] = useState<string>('');
    const [publicDescription, setPublicDescription] = useState<string>('');
    const [privateMessage, setPrivateMessage] = useState<string>('');
    const [payout, setPayout] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<
        GigCategoryNames | ''
    >('');

    const wrapperClassnames = classNames({
        'gig-form': true,
        'gig-form--active': active
    });

    const gigReady = useMemo(() => {
        const isEditModeReady =
            mode !== 'edit' || (!!gig?.id && !!gig?.author && !!gig?.status);
        return (
            isEditModeReady &&
            gigName !== '' &&
            publicDescription !== '' &&
            privateMessage !== '' &&
            payout !== 0 &&
            payout !== undefined &&
            selectedCategory !== ''
        );
    }, [
        gig?.id,
        gig?.author,
        gig?.status,
        publicDescription,
        privateMessage,
        payout,
        selectedCategory
    ]);

    const newGig: IDraftGig | undefined = useMemo(() => {
        return mode === 'new' && gigReady
            ? {
                  title: gigName!,
                  description: publicDescription!,
                  message: privateMessage,
                  payout: payout!,
                  category: selectedCategory! as GigCategoryNames,
                  id: uuidv4()
              }
            : undefined;
    }, [
        gigName,
        publicDescription,
        privateMessage,
        payout,
        selectedCategory,
        gigReady
    ]);

    const modifiedGig: IGig | undefined = useMemo(() => {
        return mode === 'edit' && gigReady
            ? {
                  id: gig?.id!,
                  status: gig?.status!,
                  author: gig?.author!,
                  title: gigName!,
                  description: publicDescription!,
                  payout: payout!,
                  category: selectedCategory! as GigCategoryNames
              }
            : undefined;
    }, [
        gig?.id,
        gig?.status,
        gig?.author,
        gigName,
        publicDescription,
        privateMessage,
        payout,
        selectedCategory,
        gigReady
    ]);

    const clearFields = useCallback(() => {
        setGigName('');
        setPublicDescription('');
        setPrivateMessage('');
        setPayout(0);
        setSelectedCategory('');
    }, []);

    const handleAddingNewGig = () => {
        if (!newGig) {
            console.error('Gig is not defined');
            return;
        }
        addNewGig(newGig);
        clearFields();
        navigate('/giger');
    };

    const handleEditGig = () => {
        if (!modifiedGig) {
            console.error('Gig is not defined');
            return;
        }
        updateGig(modifiedGig);
        clearFields();
        navigate('/giger');
    };

    useEffect(() => {
        if (mode !== 'edit' || !gig) return;
        setGigName(gig.title);
        setPublicDescription(gig.description);
        setPrivateMessage(' ');
        setPayout(gig.payout);
        setSelectedCategory(gig.category);
    }, [mode, gig]);

    return (
        <section className={wrapperClassnames}>
            <Controls leftSideOption="back" />
            {mode === 'edit'}
            <input
                type="text"
                className="gig-form__input"
                placeholder={intl.formatMessage({ id: 'GIG_NAME' })}
                value={gigName}
                onChange={(event) => setGigName(event.target.value)}
            />
            <select
                className="gig-form__input"
                value={selectedCategory}
                onChange={(event) =>
                    setSelectedCategory(event.target.value as GigCategoryNames)
                }
            >
                <option value={''}>
                    <MemoizedFormattedMessage id="CHOOSE_CATEGORY" />
                </option>
                {categories.map((category) => (
                    <option key={category.type} value={category.type}>
                        {category.type}
                    </option>
                ))}
            </select>
            <textarea
                className="gig-form__input"
                placeholder={intl.formatMessage({ id: 'PUBLIC_DESC' })}
                value={publicDescription}
                onChange={(event) => setPublicDescription(event.target.value)}
            />
            <textarea
                className="gig-form__input"
                placeholder="Private message to the contractor"
                value={privateMessage}
                onChange={(event) => setPrivateMessage(event.target.value)}
            />
            <input
                type="number"
                placeholder={intl.formatMessage({ id: 'PAYOUT' })}
                value={payout}
                onChange={(event) => setPayout(parseInt(event.target.value))}
            />
            {mode === 'edit' ? (
                <BigButton
                    color="primary"
                    text={intl.formatMessage({ id: 'SAVE_CHANGES' })}
                    onClick={handleEditGig}
                />
            ) : (
                <BigButton
                    disabled={!gigReady}
                    color="primary"
                    text={intl.formatMessage({ id: 'ADD_GIG' })}
                    onClick={handleAddingNewGig}
                />
            )}
        </section>
    );
};

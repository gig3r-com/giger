import { FC, useState, KeyboardEvent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMyIdService } from '../../../shared/services/myid.service';
import { BigButton } from '../../../shared/components/big-button/big-button';

import './code-entry.scss';

export const CodeEntry: FC = () => {
    const intl = useIntl();
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [messageToShow, setMessageToShow] = useState<
        'success' | 'wrongCode' | null
    >(null);
    const { enterRevealCode } = useMyIdService();
    const onEntry = async () => {
        if (loading || code.trim() === '') return;
        setLoading(true);
        setMessageToShow(await enterRevealCode(code.trim()));
        setCode('');
        setLoading(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onEntry();
        }
    };

    return (
        <div className="code-entry">
            <h2 className="code-entry__heading">
                <FormattedMessage id="CODE_ENTRY" />
            </h2>
            <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
                className="code-entry__input"
            />

            {loading && (
                <div className="code-entry__loading">
                    <FormattedMessage id="LOADING" />
                </div>
            )}

            {messageToShow === 'success' && (
                <div className="code-entry__success code-entry__result">
                    <FormattedMessage id="SUCCESS" />
                </div>
            )}

            {messageToShow === 'wrongCode' && (
                <div className="code-entry__wrong-code code-entry__result">
                    <FormattedMessage id="WRONG_CODE" />
                </div>
            )}

            <BigButton
                disabled={code.trim() === ''}
                onClick={() => onEntry()}
                text={intl.formatMessage({ id: 'ENTER' })}
            />
        </div>
    );
};

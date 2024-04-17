import { FC, useState } from 'react';
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
        setLoading(true);
        setMessageToShow(await enterRevealCode(code));
        setCode('');
        setLoading(false);
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
                className="code-entry__input"
            />

            {messageToShow === 'success' && (
                <div className="code-entry__success">
                    <FormattedMessage id="SUCCESS" />
                </div>
            )}

            {messageToShow === 'wrongCode' && (
                <div className="code-entry__wrong-code">
                    <FormattedMessage id="WRONG_CODE" />
                </div>
            )}

            <BigButton
                disabled={code === ''}
                onClick={() => onEntry()}
                text={intl.formatMessage({ id: 'ENTER' })}
            />

            {loading && (
                <div className="code-entry__loading">
                    <FormattedMessage id="LOADING" />
                </div>
            )}
        </div>
    );
};

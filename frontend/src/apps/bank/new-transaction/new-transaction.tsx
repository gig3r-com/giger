import { FC } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { Controls } from '../../../shared/components/controls/controls';
import { useBankingService } from '../../../shared/services/banking.service';
import { useHashService } from '../../../shared/services/hash.service';
import { AccountType } from '../../../models/banking';
import { BigButton } from '../../../shared/components/big-button/big-button';
import { Form } from '../../../shared/components/form/form';
import { NumberInput } from '../../../shared/components/form/inputs/number-input';
import { StringInput } from '../../../shared/components/form/inputs/string-input';
import { AccountPicker } from '../../../shared/components/form/inputs/account-picker';
import { UserPicker } from '../../../shared/components/form/inputs/user-picker';

import './new-transaction.scss';

export const NewTransaction: FC = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const { hashParams, } = useHashService();
    const { sendTransfer, fetchAccounts } = useBankingService();
    const handleTransfer = async ({ handle, amount, title, account }) => {
        await sendTransfer(
            handle,
            amount,
            title,
            account
        );
        fetchAccounts();
        navigate('/bank');
    };
    const initialValues = {
        amount: hashParams.amount || 0,
        title: hashParams.title || '',
        account: AccountType.PRIVATE,
        handle: hashParams.handle || '',
    };
    const schema = Yup.object({
        amount: Yup
            .number()
            .min(1)
            .max(200)
            .required('Field required'),
        title: Yup
            .string()
            .trim()
            .required('Field required'),
        account: Yup
            .mixed()
            .oneOf([AccountType.PRIVATE, AccountType.BUSINESS])
            .required('Field required'),
        handle: Yup
            .string()
            .required('Field required'),
    });

    const amountPlaceholder = intl.formatMessage({ id: 'AMOUNT' });
    const titlePlaceholder = intl.formatMessage({ id: 'TITLE' });
    const transferButtonText = intl.formatMessage({ id: 'TRANSFER' });

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleTransfer}
            schema={schema}
            className="new-transaction"
        >
            <Controls leftSideOption="back" />
            <NumberInput name="amount" placeholder={amountPlaceholder} />
            <StringInput name="title" placeholder={titlePlaceholder} />
            <AccountPicker name="account" />
            <UserPicker name="handle" />
            <BigButton type="submit" text={transferButtonText} />
        </Form>
    );
};

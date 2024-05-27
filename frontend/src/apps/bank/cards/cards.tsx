import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AccountType } from '../../../models/banking';
import { ICardsProps } from './cards.model';

import './cards.scss';

export const Cards: FC<ICardsProps> = ({ accounts, onAccountChange }) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const cardBgClassNames = (accountType: AccountType) =>
        classNames({
            'cards__card-bg': true,
            'cards__card-bg--private': accountType === AccountType.PRIVATE,
            'cards__card-bg--business': accountType === AccountType.BUSINESS
        });

    const scrollerClassNames = classNames({
        cards__scroller: true,
        'cards__scroller--double': accounts.length > 1
    });

    useEffect(() => {
        if (!scrollerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const cardIndex = Array.from(
                        entry.target.parentElement!.children
                    ).indexOf(entry.target);

                    onAccountChange(accounts[cardIndex]);
                });
            },
            { threshold: 0.7 }
        );

        Array.from(scrollerRef.current.children).forEach((child) => {
            observer.observe(child);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const displayedAccountNumber = (accountNumber: string) => {
        const base = Array(16).fill('*');

        Array.from(accountNumber).reverse().forEach((char, index) => {
            base[base.length - 1 - index] = char;
        });

        const splitBase = [
            base.slice(0, 4),
            ' ',
            base.slice(4, 8),
            ' ',
            base.slice(8, 12),
            ' ',
            base.slice(12, 16)
        ];

        return splitBase.flat().join('');
    };

    return (
        <article className="cards">
            <div className={scrollerClassNames} ref={scrollerRef}>
                {accounts.map((account) => (
                    <div className="cards__card" key={account.id}>
                        <div className={cardBgClassNames(account.type)}>
                            <span className="cards__account-type">
                                <MemoizedFormattedMessage
                                    id={`${account.type.toUpperCase()}_ACCOUNT`}
                                />
                            </span>
                            <span className="cards__number">
                                {displayedAccountNumber(account.accountNumber)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
};

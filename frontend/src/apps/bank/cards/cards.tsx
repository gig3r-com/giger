import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import MemoizedFormattedMessage from 'react-intl/src/components/message';
import { AccountType } from '../../../models/banking';

import './cards.scss';
import { ICardsProps } from './cards.model';

export const Cards: FC<ICardsProps> = ({ accounts, onAccountChange }) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const cardClassNames = (accountType: AccountType) =>
        classNames({
            cards__card: true,
            'cards__card--private': accountType === AccountType.PRIVATE,
            'cards__card--business': accountType === AccountType.BUSINESS
        });

    useEffect(() => {
        if (!scrollerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const cardIndex = Array
                    .from(entry.target.parentElement!.children)
                    .indexOf(entry.target);
                    
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

    return (
        <article className="cards">
            <div className="cards__scroller" ref={scrollerRef}>
                {accounts.map((account) => (
                    <div
                        className={cardClassNames(account.type)}
                        key={account.id}
                    >
                        <span className="cards__account-type">
                            <MemoizedFormattedMessage
                                id={`${account.type.toUpperCase()}_ACCOUNT`}
                            />
                        </span>
                        <span className="cards__number">
                            {account.accountNumber}
                        </span>
                    </div>
                ))}
            </div>
        </article>
    );
};

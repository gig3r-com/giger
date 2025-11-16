import { FC, Children } from 'react';

import './section-body.scss';

export const SectionBody: FC<{ children: Children }> = ({ children }) => {
    return (
        <section className="section-body">
            { children }
        </section>
    );
};

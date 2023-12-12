import { FC } from 'react';
import './contacts.scss';

type Contact = {
    name: string;
    relation?: string;
};

export type ContactsProps = {
    contacts?: Contact[];
    onItemClick?: (name: string) => void;
};

export const Contacts: FC<ContactsProps> = ({ contacts = contanctsMock }) => {
    const mapContacts = ({ name, relation }: Contact) => (
        <li key={name} className="contacts__list-item">
            <span className="contacts__list-item--name">{name}</span>
            {relation && <span className='contacts__list-item--action'>{relation}</span>}
        </li>
    );

    const contactsWithRelation = contacts.filter((contact) => contact?.relation);
    return (
        <section className="contacts">
            <h2>Contacts</h2>
            <ul className="contacts__list contacts__list--relation">{contactsWithRelation.map(mapContacts)}</ul>
            <h2>All</h2>
            <ul className="contacts__list contacts__list--all">{contacts.map(mapContacts)}</ul>
        </section>
    );
};

const contanctsMock: Contact[] = [
    { name: 'Alice Cooper', relation: 'father' },
    { name: 'Barbara Streisand', relation: 'mother' },
    { name: 'Candy Kowalski', relation: 'ex' },
    { name: 'Dorothy Parker', relation: 'coworker' },
    { name: 'Elisabeth Taylor', relation: 'coworker' },
    { name: 'Freddy Mercury' },
    { name: 'Greta Garbo' },
    { name: 'Humphrey Bogart' },
    { name: 'Irene Adler' },
    { name: 'John Doe' }
];

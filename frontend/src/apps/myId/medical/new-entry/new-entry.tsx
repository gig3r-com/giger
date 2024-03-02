import { FC, useState } from 'react';

import './new-entry.scss';

/**
 * A small component handling displaying and adding new entries to the medical history
 * @param onAdd function to fire when adding a new entry
 */
export const NewEntry: FC<{ onAdd: (name: string, year: number) => void }> = ({
    onAdd
}) => {
    const [year, setYear] = useState<number>(2077);
    const [name, setName] = useState<string>('');

    const handleAdd = () => {
        onAdd(name, year);
        setName('');
        setYear(2077);
    };

    return (
        <>
            <span className="new-entry__year">
                <input
                    className="new-entry__input new-entry__year-input"
                    value={year}
                    onChange={(event) => setYear(parseInt(event.target.value))}
                />
            </span>
            <span className="new-entry__info">
                <input
                    className="new-entry__input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </span>
            <button
                disabled={!name || !year}
                className="new-entry__add material-icons"
                onClick={handleAdd}
            >
                add
            </button>
        </>
    );
};

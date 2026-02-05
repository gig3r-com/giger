import { initialValues } from './initialValues';
import U from '@/configs/entities/user';
import { splitByAllowedValues } from '../utils/splitByAllowedValues';

export const mapUserToForm = (data: User) => {
    const values = initialValues;
    const warnings: string[] = [];
    const errors: string[] = [];

    if (!data.handle) errors.push('User needs handle.');
    else values.handle = data.handle;

    values.active = Boolean(data.active);
    values.summary = String(data.summary);
    values.name = String(data.name);
    values.surname = String(data.surname);
    checkArray('roles', data.roles, U.roles);

    checkArray('speciesPublic', data.speciesPublic, U.species);
    checkArray('speciesActual', data.speciesActual, U.species);

    checkArray('vibe', data.vibe, U.vibes);
    checkArray('vibeLevel', data.vibeLevel, U.vibeLevels);

    checkArray('affiliation', data.affiliation, U.affiliations);
    checkArray('profession', data.profession, U.professions);
    checkArray('wealth', data.wealth, U.wealth);
    checkArray('cyberwareLevel', data.cyberwareLevel, U.cyberwareLavels);


    return { values, warnings, errors };

    function checkArray(name: string, toCheck: [], config: []) {
        const { valid, invalid } = splitByAllowedValues(toCheck, config);
        values[name] = valid;
        if (invalid.length) {
            warnings.push(`Unknown ${name} ignored: ${invalid.join(', ')}`);
        }
    }
};

type ValidateArrayResult<T> = {
    valid: T[];
    invalid: T[];
};

export const splitByAllowedValues = <T>(
    input: readonly T[] | undefined,
    allowed: readonly T[],
): ValidateArrayResult<T> => {
    if (!Array.isArray(input)) {
        return { valid: [], invalid: [] };
    }

    return input.reduce<ValidateArrayResult<T>>(
        (acc, value) => {
            if (allowed.includes(value)) acc.valid.push(value);
            else acc.invalid.push(value);
            return acc;
        },
        { valid: [], invalid: [] },
    );
};

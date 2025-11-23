export function makeValues(array: readonly string[]): Record<string, string> {
    return array.reduce<Record<string, string>>((acc, key) => {
        acc[key] = key;
        return acc;
    }, {});
}

export function makeLabels(array: readonly string[]): Record<string, string> {
    return array.reduce<Record<string, string>>((acc, key) => {
        acc[key] = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        return acc;
    }, {});
}

export function makeOptions(array: readonly string[], labels: Record<string, string>):
    { value: string, label: string, }[] {
    return array.reduce<{ value: string; label: string }[]>((acc, key) => {
        acc.push({ value: key, label: labels[key] });
        return acc;
    }, []);
}

export function makeConst<const T extends readonly string[]>(array: T) {
    const VALUES = makeValues(array);
    const LABELS = makeLabels(array);
    const OPT = makeOptions(array, LABELS);
    return [VALUES, LABELS, OPT] as const;
}
import * as Yup from 'yup';

const str = () => Yup.string().defined();

export const plotSchema = Yup.object({
    id: str().required(),
    name: str().required(),
    description: str().required(),
    users: Yup.array().of(Yup.string()),
});

import { GigCategoryNames, IGigCategory } from "../../models/gig";
import IconRelation from '../../.../../assets/icon-seks-relacje-1.svg'
import IconAmmo from '../../.../../assets/icon-amunicja-1.svg';
import IconMed from '../../.../../assets/icon-medycyna-1.svg';
import IconHack from '../../.../../assets/icon-hakowanie-1.svg';
import IconInfo from '../../.../../assets/icon-informacje-1.svg';
import IconDrug from '../../.../../assets/icon-narkotyki-1.svg';
import IconCourier from '../../.../../assets/icon-kurierka-1.svg';
import IconCombat from '../../.../../assets/icon-przemoc-1.svg';
import IconTech from '../../.../../assets/icon-tech.svg';

export const categories: IGigCategory[] = [
    {
        type: GigCategoryNames.RELATION,
        icon: IconRelation
    },
    {
        type: GigCategoryNames.COMBAT,
        icon: IconCombat
    },
    {
        type: GigCategoryNames.TECH,
        icon: IconTech
    },
    {
        type: GigCategoryNames.INFO,
        icon: IconInfo
    },
    {
        type: GigCategoryNames.COURIER,
        icon: IconCourier
    },
    {
        type: GigCategoryNames.MEDICAL,
        icon: IconMed
    },
    {
        type: GigCategoryNames.HACKING,
        icon: IconHack
    },
    {
        type: GigCategoryNames.WEAPONS,
        icon: IconAmmo
    },
    {
        type: GigCategoryNames.DRUGS,
        icon: IconDrug
    }
]

export const categoriesByRows: IGigCategory[][] = [
    categories.slice(0, 3),
    categories.slice(3, 5),
    categories.slice(5, 8),
    categories.slice(8, 9)
]
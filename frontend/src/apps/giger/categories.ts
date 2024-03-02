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
        type: GigCategoryNames.LOVER_EXPERIENCE,
        icon: IconRelation
    },
    {
        type: GigCategoryNames.HIT,
        icon: IconCombat
    },
    {
        type: GigCategoryNames.TECH,
        icon: IconTech
    },
    {
        type: GigCategoryNames.INTEL,
        icon: IconInfo
    },
    {
        type: GigCategoryNames.DELIVERY,
        icon: IconCourier
    },
    {
        type: GigCategoryNames.FIRST_AID,
        icon: IconMed
    },
    {
        type: GigCategoryNames.BANK_ACCOUNT_MANIPULATION,
        icon: IconHack
    },
    {
        type: GigCategoryNames.GUNS_AND_AMMO,
        icon: IconAmmo
    },
    {
        type: GigCategoryNames.DRUGS,
        icon: IconDrug
    }
]

export const categoriesByRows: GigCategoryNames[][] = [
    categories.slice(0, 3).map(cat => cat.type),
    categories.slice(3, 5).map(cat => cat.type),
    categories.slice(5, 8).map(cat => cat.type),
    categories.slice(8, 9).map(cat => cat.type)
]

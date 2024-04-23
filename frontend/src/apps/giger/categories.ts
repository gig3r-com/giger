import {
    GigCategoryNames,
    GigSubcategoryNames,
    IGigCategory
} from '../../models/gig';
import IconMed from '../../.../../assets/icon-medycyna-1.svg';
import IconInfo from '../../.../../assets/icon-informacje-1.svg';
import IconCombat from '../../.../../assets/icon-przemoc-1.svg';
import IconTech from '../../.../../assets/icon-tech.svg';

export const categories: IGigCategory[] = [
    {
        type: GigCategoryNames.KILLER,
        icon: IconCombat,
        subcategories: [
            {
                type: GigSubcategoryNames.ITEM_ACQUISITION,
                minPayout: 100,
                maxPayout: 1200
            },
            {
                type: GigSubcategoryNames.ANDROID_ACQUISITION,
                minPayout: 250,
                maxPayout: 1750
            },
            {
                type: GigSubcategoryNames.DEBT_COLLECTION,
                minPayout: 100,
                maxPayout: 6000
            },
            {
                type: GigSubcategoryNames.INTIMIDATION,
                minPayout: 100,
                maxPayout: 500
            },
            {
                type: GigSubcategoryNames.KIDNAPPING,
                minPayout: 1000,
                maxPayout: 2000
            },
            {
                type: GigSubcategoryNames.BODYGUARD,
                minPayout: 100,
                maxPayout: 500
            },
            {
                type: GigSubcategoryNames.HIT,
                minPayout: 6000,
                maxPayout: 150000
            }
        ]
    },
    {
        type: GigCategoryNames.HACKING,
        icon: IconTech,
        subcategories: [
            {
                type: GigSubcategoryNames.INTEL,
                minPayout: 100,
                maxPayout: 1500
            },
            {
                type: GigSubcategoryNames.BANK_ACCOUNT_MANIPULATION,
                minPayout: 1000,
                maxPayout: 6000
            },
            {
                type: GigSubcategoryNames.SPOOFING,
                minPayout: 400,
                maxPayout: 2000
            },
            {
                type: GigSubcategoryNames.SECURITY,
                minPayout: 100,
                maxPayout: 500
            },
            {
                type: GigSubcategoryNames.ANDROID_HIJACK,
                minPayout: 250,
                maxPayout: 1750
            },
            {
                type: GigSubcategoryNames.MINDEXPLOIT,
                minPayout: 250,
                maxPayout: 1750
            }
        ]
    },
    {
        type: GigCategoryNames.FIXER,
        icon: IconInfo,
        subcategories: [
            { type: GigSubcategoryNames.INTEL, minPayout: 40, maxPayout: 1200 },
            { type: GigSubcategoryNames.TECH, minPayout: 400, maxPayout: 7000 },
            {
                type: GigSubcategoryNames.DELIVERY,
                minPayout: 40,
                maxPayout: 250
            },
            {
                type: GigSubcategoryNames.GUNS_AND_AMMO,
                minPayout: 10,
                maxPayout: 1500
            },
            { type: GigSubcategoryNames.DRUGS, minPayout: 10, maxPayout: 200 },
            {
                type: GigSubcategoryNames.OTHER_MERCH,
                minPayout: 10,
                maxPayout: 500
            }
        ]
    },
    {
        type: GigCategoryNames.WELLBEING,
        icon: IconMed,
        subcategories: [
            {
                type: GigSubcategoryNames.LOVER_EXPERIENCE,
                minPayout: 100,
                maxPayout: 500
            },
            {
                type: GigSubcategoryNames.SEX_DOLL,
                minPayout: 400,
                maxPayout: 1500
            },
            { type: GigSubcategoryNames.QUICKIE, minPayout: 30, maxPayout: 50 },
            {
                type: GigSubcategoryNames.FIRST_AID,
                minPayout: 200,
                maxPayout: 500
            },
            {
                type: GigSubcategoryNames.CYBERWARE,
                minPayout: 400,
                maxPayout: 7000
            },
            {
                type: GigSubcategoryNames.MEDEVAC,
                minPayout: 100,
                maxPayout: 500
            },
            {
                type: GigSubcategoryNames.RENTING_LOCATION,
                minPayout: 100,
                maxPayout: 500
            }
        ]
    }
];

export const categoriesByRows: GigCategoryNames[][] = [
    categories.slice(0, 2).map((cat) => cat.type),
    categories.slice(2, 4).map((cat) => cat.type)
];

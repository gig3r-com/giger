import { GigCategoryNames } from "../../../../models/gig";

export interface IHexagonProps {
    category: GigCategoryNames,
    select: (category: GigCategoryNames) => void;
    delayMultiplier: number;
    isSelected: boolean;
}

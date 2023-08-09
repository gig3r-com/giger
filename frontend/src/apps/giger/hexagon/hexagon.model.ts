import { IGigCategory } from "../../../models/gig";

export interface IHexagonProps {
    category: IGigCategory,
    select: (category: IGigCategory) => void;
    delayMultiplier: number;
}
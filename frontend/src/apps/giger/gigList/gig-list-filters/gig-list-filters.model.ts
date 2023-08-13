import { GigCategoryNames } from "../../../../models/gig";

export interface IGigListFiltersProps {
    onFiltersUpdate: (categories: Set<GigCategoryNames>) => void;
    toggleMenuState: () => void;
    active: boolean;
}

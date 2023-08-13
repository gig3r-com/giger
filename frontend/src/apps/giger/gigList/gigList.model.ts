import { IGig } from "../../../models/gig";

export interface IGigListProps {
    gigs: IGig[];
    toggleMenuState: () => void;
}

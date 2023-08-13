import { IGig } from "../../../models/gig";

export interface IGigProps {
    gig: IGig;
    selectedId: string | undefined;
    setSelected: (gig: IGig) => void;
    delayMultiplier: number;
}

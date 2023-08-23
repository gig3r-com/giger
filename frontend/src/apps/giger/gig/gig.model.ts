import { IGig } from "../../../models/gig";

export interface IGigProps {
    gig: IGig;
    selectedId: string | undefined;
    delayMultiplier: number;
}

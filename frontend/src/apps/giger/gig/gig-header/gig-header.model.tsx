import { IGig } from '../../../../models/gig';

export interface IGigHeaderProps {
    gig: IGig;
    delayMultiplier: number;
    mode: 'list' | 'full';
}

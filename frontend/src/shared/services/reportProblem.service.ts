import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useReportProblem() {
    const [problemDescription, setProblemDescription] = useState<string>('');
    const [searchparams] = useSearchParams();

    /**
     * Not implemented yet.
     */

    const handleReportProblem = () => {
        console.log('Gig id: ', searchparams.get('gigId'));
        console.log('Report problem: ', problemDescription);
    };

    const onBack = () => {
        history?.back?.();
    };

    return {
        handleReportProblem,
        problemDescription,
        setProblemDescription,
        onBack
    };
}

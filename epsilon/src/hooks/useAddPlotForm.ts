import { useCallback } from 'react';
import { useFormsStore } from '@/store/formsStore';

function UseAddPlotForm(props) {
    const { addTab } = useFormsStore();
    const addPlot = useCallback((plotId?: string) => {
        addTab({});
    });
    return (
        null
    );
}

export default UseAddPlotForm;
import React from 'react';
import { Controls } from '../../../shared/components/controls/controls';

const LoginHelp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="login-help">
            <Controls
                navigateBack={false}
                leftSideOption='back'
                onLeftSideClick={onBack}
            />
            <p>This is the place for app help and support</p>
        </div>
    );
};

export default LoginHelp;

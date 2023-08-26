import { FC, useState } from 'react';
import { ShaderPrecision } from '../../shader-bg/shader.model';
import { ShaderBG } from '../../shader-bg/shaderBg';
import { chromaticAberration } from '../../shader-bg/shaders/chromatic-aberration/chromatic-aberration';
import textureUrl from '../../../assets/logo-giger@3x.png';
import { DecodeText } from '../decode-text/decodeText';

import './splash-screen.scss';

export const SplashScreen: FC<{ entering?: boolean }> = ({ entering }) => {
    const [textureLoaded, setTextureLoaded] = useState(false);
    const img = new Image(256, 44);
    img.onload = () => setTextureLoaded(true);
    img.src = textureUrl;

    return (
        <div className="splash-screen">
            {textureLoaded && (
                <>
                    <div className="splash-screen__logo-wrapper">
                        <ShaderBG
                            shader={chromaticAberration(ShaderPrecision.high)}
                            classNames="splash-screen__shader"
                            texture={img}
                            width={256}
                            height={44}
                        />
                    </div>
                    <span className='splash-screen__loader'></span>
                    <div className="splash-screen__content">
                        <DecodeText text={entering ? 'Decrypting...' : 'Encrypting...'} />
                    </div>
                </>
            )}
        </div>
    );
};

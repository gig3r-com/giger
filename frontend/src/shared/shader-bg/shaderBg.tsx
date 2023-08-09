import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { ShaderCanvas } from 'shader-canvas';
import {
    IShaderBGProps,
    IUniformUpdateData,
    UniformsRequired
} from './shader.types';

import './shaderBg.scss';

/**
 * A component used to render a fragment shader to canvas
 * @param shader {IShader} shader data required for render
 */
export const ShaderBG: FC<IShaderBGProps> = ({
    shader,
    classNames = '',
    resolutionModifier = 1
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const shaderCanvas = new ShaderCanvas();
    const uniforms: IUniformUpdateData = {
        time: 0,
        height: 740,
        width: 360,
        mouse: [0, 0, 0, 0]
    };

    const renderFrame = () => {
        let animReq: number;
        const animate = (timestamp: number) => {
            uniforms.time = timestamp / 1000;
            setUniforms();
            shaderCanvas.render();
            animReq = window.requestAnimationFrame(animate);
        };
        animReq = window.requestAnimationFrame(animate);
    };

    const initShaderCanvas = () => {
        uniforms.height =
            wrapperRef!.current!.getBoundingClientRect().height *
            window.devicePixelRatio;
        uniforms.width =
            wrapperRef!.current!.getBoundingClientRect().width *
            window.devicePixelRatio;

        shaderCanvas.setShader(shader.code);
        shaderCanvas.setSize(
            uniforms.width / window.devicePixelRatio,
            uniforms.height / window.devicePixelRatio
        );
        setUniforms();

        wrapperRef.current?.appendChild(shaderCanvas.domElement);
        renderFrame();
    };

    const setUniforms = () => {
        const uniformsRequired = shader.uniformsRequired;

        if (uniformsRequired.includes(UniformsRequired.resolution)) {
            shaderCanvas.setUniform('iResolution', [
                uniforms.width,
                uniforms.height,
                window.devicePixelRatio
            ]);
        }

        if (uniformsRequired.includes(UniformsRequired.time)) {
            shaderCanvas.setUniform('iTime', uniforms.time);
        }

        if (uniformsRequired.includes(UniformsRequired.mouse)) {
            shaderCanvas.setUniform('iMouse', uniforms.mouse);
        }
    };

    useLayoutEffect(initShaderCanvas, []);

    useEffect(function handleResize() {
        const setDimenions = () => {
            const wrapperRect = wrapperRef.current?.getBoundingClientRect();
            uniforms.height = wrapperRect
                ? wrapperRect.height * resolutionModifier
                : uniforms.height;
            uniforms.width = wrapperRect
                ? wrapperRect.width * resolutionModifier
                : uniforms.width;
        };
        window.addEventListener('resize', setDimenions);

        return () => window.removeEventListener('resize', setDimenions);
    }, []);

    return (
        <div ref={wrapperRef} className={`shader-wrapper ${classNames}`}></div>
    );
};

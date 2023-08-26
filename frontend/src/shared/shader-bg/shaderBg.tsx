import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { ShaderCanvas } from 'shader-canvas';
import {
    IShaderBGProps,
    IUniformUpdateData,
    UniformsRequired
} from './shader.model';

import './shaderBg.scss';

/**
 * A component used to render a fragment shader to canvas
 * @param shader {IShader} shader data required for render
 * @param classNames {string} css classes to be added to canvas
 * @param resolutionModifier {number} a number to multiply the resolution by. Defaults to 1. Fractions will diminish quality but improve performance
 * @param texture {HTMLImageElement} an image to be used as a texture. only use if the shader requires a texture uniform
 * @param height {number} height of the canvas. Defaults to 740
 * @param width {number} width of the canvas. Defaults to 360
 */
export const ShaderBG: FC<IShaderBGProps> = ({
    shader,
    classNames = '',
    resolutionModifier = 1,
    texture,
    height,
    width
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const shaderCanvas = new ShaderCanvas();
    const uniforms: IUniformUpdateData = {
        time: 0,
        height: height || 740,
        width: width || 360,
        mouse: [0, 0, 0, 0]
    };

    const renderFrame = () => {
        const animate = (timestamp: number) => {
            uniforms.time = timestamp / 1000;
            setUniforms();
            shaderCanvas.render();
            window.requestAnimationFrame(animate);
        };
        window.requestAnimationFrame(animate);
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

        const start = () => {
            const canvasSet =
                wrapperRef.current &&
                Array.from(wrapperRef.current?.querySelectorAll('canvas'))
                    .length > 0;
            setUniforms();

            !canvasSet &&
                wrapperRef.current?.appendChild(shaderCanvas.domElement);
            renderFrame();
        };

        if (texture) {
            shaderCanvas.setTexture('iChannel0', texture);
            texture.complete ? start() : (texture.onload = start);
        } else {
            start();
        }
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

        if (uniformsRequired.includes(UniformsRequired.texture)) {
            shaderCanvas.setUniform('iChannel0', 0);
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

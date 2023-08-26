import { useEffect } from 'react';
import * as React from 'react';
import './decodeText.scss';

// originally created by Ben Racicot: https://codepen.io/BRacicot/pen/Nryjpa

export const DecodeText: React.FC<{ text: string }> = (props) => {
    const textArray = props.text.split('');

    const decode = () => {
        const text = document.getElementsByClassName('decode-text')[0];
        // debug with
        // console.log(text, text.children.length);

        // assign the placeholder array its places
        const state: number[] = [];
        for (let i = 0, j = text.children.length; i < j; i++) {
            text.children[i].classList.remove('state-1', 'state-2', 'state-3');
            state[i] = i;
        }

        // shuffle the array to get new sequences each time
        const shuffled = shuffle(state);

        for (let i = 0, j = shuffled.length; i < j; i++) {
            const child = text.children[shuffled[i]];
            const classes = child.classList;

            // fire the first one at random times
            const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
            if (classes.contains('text-animation')) {
                setTimeout(firstStages.bind(null, child), state1Time);
            }
        }
    };

    // send the node for later .state changes
    const firstStages = (child: Element) => {
        if (child.classList.contains('state-2')) {
            child.classList.add('state-3');
        } else if (child.classList.contains('state-1')) {
            child.classList.add('state-2');
        } else if (!child.classList.contains('state-1')) {
            child.classList.add('state-1');
            setTimeout(secondStages.bind(null, child), 100);
        }
    };

    const secondStages = (child: Element) => {
        if (child.classList.contains('state-1')) {
            child.classList.add('state-2');
            setTimeout(thirdStages.bind(null, child), 100);
        } else if (!child.classList.contains('state-1')) {
            child.classList.add('state-1');
        }
    };

    const thirdStages = (child: Element) => {
        if (child.classList.contains('state-2')) {
            child.classList.add('state-3');
        }
    };

    const shuffle = (array: number[]) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    useEffect(function runDecode() {
        decode();
    }, []);

    return (
        <div className="decode-text">
            {textArray.map((letter, index) => (
                <div key={`${letter} ${index}`} className="text-animation">{letter}</div>
            ))}
        </div>
    );
};

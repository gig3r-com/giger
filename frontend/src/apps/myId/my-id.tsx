import { FC } from "react";
import { Controls } from "../../shared/components/controls/controls";
import { BigButton } from "../../shared/components/big-button/big-button";

import "./my-id.scss";

export const MyId: FC = () => {
    return (
        <section className='my-id'>
            <Controls />

            <div className='my-id__buttons'>
                <BigButton className='my-id__msg' text='message' color='primary' onClick={() => {}} />
                <BigButton className='my-id__notes' text='notes' color='primary' onClick={() => {}} />
                <BigButton className='my-id__follow' text='follow' color='primary' onClick={() => {}} />
            </div>
        </section>
    );
};

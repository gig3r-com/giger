import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Controls } from "../../shared/components/controls/controls";
import { BigButton } from "../../shared/components/big-button/big-button";
import { CharSummary } from "./char-summary/char-summary";
import { IUser } from "../../models/user";
import { RootState } from "../../store/store";

import "./my-id.scss";

export const MyId: FC = () => {
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const [userToShow, setUserToShow] = useState<IUser>();

    useEffect(function setUserOnMount() {
        setUserToShow(currentUser);
    }, []);

    return (
        <section className='my-id'>
            <Controls leftSideOption='back' />
            {userToShow && <CharSummary user={userToShow} />}

            <div className='my-id__buttons'>
                <BigButton className='my-id__msg' text='message' color='primary' onClick={() => {}} />
                <BigButton className='my-id__notes' text='notes' color='primary' onClick={() => {}} />
                <BigButton className='my-id__follow' text='follow' color='primary' onClick={() => {}} />
            </div>
        </section>
    );
};

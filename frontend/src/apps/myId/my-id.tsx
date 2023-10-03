import { FC, useEffect, useState } from "react";
import { Controls } from "../../shared/components/controls/controls";
import { BigButton } from "../../shared/components/big-button/big-button";
import { CharSummary } from "./char-summary/char-summary";
import { useAuthenticationService } from "../../shared/services/authentication.service";
import { IUser } from "../../models/user";

import "./my-id.scss";

export const MyId: FC = () => {
    const { currentUser } = useAuthenticationService();
    const [userToShow, setUserToShow] = useState<IUser>();

    useEffect(function setUserOnMount() {
        setUserToShow(currentUser());
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

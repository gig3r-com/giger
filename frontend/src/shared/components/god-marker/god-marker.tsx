import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useUserService } from "../../services/user.service";

import "./god-marker.scss";

export const GodMarker: FC = () => {
    const { isGod } = useUserService();

    return <div className={`god-marker ${isGod && 'god-marker--shown'}`}>
        <span className="god-marker__sign"><FormattedMessage id="GOD_MODE" /></span>
    </div>;
};

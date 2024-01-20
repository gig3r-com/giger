import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useUserService } from "../../services/user.service";

import "./admin-marker.scss";

export const AdminMarker: FC = () => {
    const { isAdmin } = useUserService();

    return <div className={`admin-marker ${isAdmin && 'admin-marker--shown'}`}>
        <span className="admin-marker__sign"><FormattedMessage id="ADMIN_MODE" /></span>
    </div>;
};

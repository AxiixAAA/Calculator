import React, { FC } from "react";
import { compose } from "redux";
import withNavigateToLogin from "../../hoc/withNavigateToLogin";
import Users from "./Users.tsx";

const UsersContainer: FC = () => {
    return <Users />
}

export default compose<React.Component>(
    withNavigateToLogin
)(UsersContainer)

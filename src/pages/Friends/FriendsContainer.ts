import React from "react"
import { compose } from "redux";
import {Friends} from "./Friends"
import withNavigateToLogin from "../../hoc/withNavigateToLogin";

export default compose<React.ComponentType>(
    withNavigateToLogin
)(Friends)

import React, { ComponentType, FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { TGlobalState } from "../store/reduxStore";
import { getIsLogged } from "../store/selectors/authSelector";

const withNavigateToLogin = <T,> (Component: ComponentType<T>) => {
    const WrapperComponent: FC<TProps> = (props) => {
        const { initialized, isLogged, ...restProps } = props
        if (initialized && !isLogged) return <Navigate to='/login' />
        return (
            <Component {...restProps as T} />
        )   
    }

    return connect(mapStateToProps)(WrapperComponent);
}

const mapStateToProps = (state: TGlobalState) => ({
    isLogged: getIsLogged(state),
    initialized: state.app.initialized
})

export default withNavigateToLogin;

type TProps = ReturnType<typeof mapStateToProps>
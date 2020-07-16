import React, { Component } from "react";

export function privateRoute(WrappedComponent) {
    return class extends Component {
        state = {
            auth: new AuthToken(this.props.token)
        };

        static async getInitialProps(ctx) {
            // create AuthToken
            const auth = AuthToken.fromNext(ctx);
            const initialProps = { auth };
            // if the token is expired, that means the user is no longer (or never was) authenticated
            // and if we allow the request to continue, they will reach a page they should not be at.
            if (WrappedComponent.getInitialProps) {
                const wrappedProps = await WrappedComponent.getInitialProps(initialProps);
                return { ...wrappedProps, auth };
            }
            return initialProps;
        }

        componentDidMount() {
            // since getInitialProps returns our props after they've JSON.stringify
            // we need to reinitialize it as an AuthToken to have the full class
            // with all instance methods available
            this.setState({ auth: new AuthToken(this.props.token) })
        }

        render() {
            // we want to hydrate the WrappedComponent with a full instance method of
            // AuthToken, the existing props.auth is a flattened auth, we want to use
            // the state instance of auth that has been rehydrated in browser after mount
            const { ...propsWithoutAuth } = this.props;
            return <WrappedComponent {...propsWithoutAuth} />;
        }
    };
}
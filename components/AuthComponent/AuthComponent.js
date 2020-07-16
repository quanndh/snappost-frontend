import React, { Component } from "react";

export default function privateRoute(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                auth: false
            }
        }
        componentDidMount() {
            let token = localStorage.getItem("token")
            if (!token || token == "null" || token == null) {
                window.location.href = "http://localhost:3000/auth"
            }
        }

        render() {
            const { ...propsWithoutAuth } = this.props;
            return <WrappedComponent {...propsWithoutAuth} />;
        }
    };
}
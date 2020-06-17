import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'

export default function (BaseComponent) {
    class ComponentWrapped extends Component {
        constructor(props) {
            super(props)
            this.props = props
            this.state = {
                token: ""
            }
        }

        componentDidMount() {
            this._checkAndRedirect();
            this.setState({
                token: localStorage.getItem('token')
            })
        }

        componentDidUpdate() {
            this._checkAndRedirect();
        }

        _checkAndRedirect() {
            const { token, router } = this.props;

            if (token || this.state.token != "") {
                router.push("/")
            }
        }

        render() {
            return (
                <div>
                    {(this.props.token != "" || this.state.token != "") ? <BaseComponent {...this.props} /> : null}
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            token: state.userReducer.token
        };
    };

    return withRouter(connect(
        mapStateToProps
    )(ComponentWrapped));
}


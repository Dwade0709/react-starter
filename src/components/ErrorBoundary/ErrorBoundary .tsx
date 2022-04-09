import React, { ErrorInfo, CSSProperties } from 'react';
import PropTypes from 'prop-types';

export type PropsType = Readonly<{
    name: string;
}>;

export type StateType = Readonly<{
    error: Error | null;
    errorInfo: ErrorInfo | null;
}>;

export class ErrorBoundary extends React.Component<PropsType, StateType> {
    public static propTypes: { name: PropTypes.Requireable<string>; };
    state: StateType = { error: null, errorInfo: null };
    styleDetails: CSSProperties = { whiteSpace: 'pre-wrap' };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        const { errorInfo } = this.state;
        if (errorInfo) {
            const { error } = this.state;
            const { name = 'Error Boundary' } = this.props;
            return (
                <div>
                    <h2>{name} - Something went wrong</h2>
                    <details style={this.styleDetails}>
                        {error ? error.toString() : null}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

import * as React from 'react';

export const Error = React.createContext();

const ErrorContext = ({children}) => {
    const [error, setError] = React.useState(null);

    return (
        <Error.Provider value={{
            states: {
                error: error
            },
            actions: {
                setError: setError
            }
        }}>
            {children}
        </Error.Provider>
    );
}
export default ErrorContext;
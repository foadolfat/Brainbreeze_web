import * as React from 'react';

export const Load = React.createContext();

const LoadContext = ({children}) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <Load.Provider value={{
            states: {
                loading: loading
            },
            actions: {
                setLoading: setLoading
            }
        }}>
            {children}
        </Load.Provider>
    );
}
export default LoadContext;
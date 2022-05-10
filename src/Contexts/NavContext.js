import * as React from 'react';

export const Nav = React.createContext();

const NavContext = ({children}) => {
    const [nav, setNav] = React.useState();
    const [currentClass, setCurrentClass] = React.useState();
    const [currentModule, setCurrentModule] = React.useState();
    const [currentLesson, setCurrentLesson] = React.useState();
    const [currentUnit, setCurrentUnit] = React.useState();

    const changeNav = (nav) => {
        setNav(nav);
    }
    React.useEffect(() => {
        if(localStorage.getItem("nav")){
            setNav(localStorage.getItem("nav"));
        } else {
            setNav("landing");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);

    React.useEffect(() => {
        localStorage.setItem("nav", nav);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nav]);


    return (
        <Nav.Provider value={{
            states: {
                nav: nav,
                currentClass: currentClass,
                currentModule: currentModule,
                currentLesson: currentLesson,
                currentUnit: currentUnit
            },
            actions: {
                setNav: setNav,
                setCurrentClass: setCurrentClass,
                setCurrentModule: setCurrentModule,
                setCurrentLesson: setCurrentLesson,
                setCurrentUnit: setCurrentUnit,
                changeNav: changeNav
            }
        }}>
            {children}
        </Nav.Provider>
    );
}
export default NavContext;
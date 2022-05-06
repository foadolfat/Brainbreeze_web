import * as React from 'react';
import {Class} from '../Contexts/ClassContext';
import {Nav} from '../Contexts/NavContext';
import Searchresults from '../Components/Searchresults/Searchresults.jsx';

const Search = () => {
    const {actions:ClassActions, states:ClassStates} = React.useContext(Class);
    const {states:NavStates} = React.useContext(Nav);


    return(
        <div>
            {NavStates.nav==="search" &&
                <div>
                    <h1>Search</h1>
                    <form onChange={
                            (e) => {
                                e.preventDefault();
                                ClassActions.setClassName(e.target.value);
                            }
                        }>
                        <input className="searchbar" type="text" name="class" placeholder="Enter class name to search" required/>
                    </form>
                    <div>
                        {
                            ClassStates && ClassStates.listOfClasses && ClassStates.listOfClasses.length ?
                            <div>
                                {
                                    ClassStates.listOfClasses.map((data,index)=>{
                                        return <Searchresults key={index} data={data}/>
                                    })
                                }
                            </div>
                            :
                            <p>...</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default Search;
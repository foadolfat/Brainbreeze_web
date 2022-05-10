import React from "react";
import { animated } from "react-spring";
import {Nav} from '../../Contexts/NavContext';
import "./Menu.css";
import Createclass from "../Classcard/Createclass";
import Createmodule from "../Modulecard/Createmodule";
import Createlesson from "../Lessoncard/Createlesson";
import Createunit from "../Unitcard/Createunit";
import Createquiz from "../Quizcard/Createquiz.jsx";
import Editclass from "../Classcard/Editclass";
import Editmodule from "../Modulecard/Editmodule";
import Editlesson from "../Lessoncard/Editlesson";
import Editunit from "../Unitcard/Editunit";



const Menu = ({ style, mode, setFullMenuVisible, fullMenuVisible }) => {
  const {states:NavStates} = React.useContext(Nav);
  return(
    <animated.div className="menu menu--full iteminmenu" style={style}>
      {mode ==="edit" ?
        <div>
          {NavStates.nav === "modules" &&
            <div>
              <Editclass setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
            </div>
           }
           {NavStates.nav === "lessons" &&
            <div>
              <Editmodule setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
            </div>
           }
           {NavStates.nav === "units" &&
            <div>
              <Editlesson setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
            </div>
           }
           {NavStates.nav === "content" &&
            <div>
              <Editunit setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
            </div>
           }
        </div>

      :<div>
          {mode==="class" &&
            <div>
              <Createclass setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
              <button onClick={()=>{
                setFullMenuVisible(false);
              }
              }>
                Close
              </button>
            </div>
          }
          {mode==="module" &&
            <div>
              <Createmodule setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
              <button onClick={()=>{
                setFullMenuVisible(false);
              }
              }>
                Close
              </button>
            </div>
          }
          {mode==="lesson" &&
            <div>
              <Createlesson setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
              <button onClick={()=>{
                setFullMenuVisible(false);
              }
              }>
                Close
              </button>
            </div>
          }
          {mode==="unit" && 
            <div>
              <Createunit setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
              <button onClick={()=>{
                setFullMenuVisible(false);
              }
              }>
                Close
              </button>
            </div>
          }
          {mode==="quiz" &&
            <div>
              <Createquiz setFullMenuVisible={setFullMenuVisible} fullMenuVisible={fullMenuVisible}/>
              <button onClick={()=>{
                setFullMenuVisible(false);
              }
              }>
                Close
              </button>
            </div>
          }
      </div>}
    </animated.div>
  )
}
export default Menu;

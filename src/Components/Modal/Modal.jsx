import React, { useState } from "react";
import { useSpring } from "react-spring";
import  Menu  from "./Menu";
import "./Styles.css";

function Modal({mode}) {
  const [fullMenuVisible, setFullMenuVisible] = useState(false);



  const fullMenuAnimation = useSpring({
    transform: fullMenuVisible ? `translateY(0)` : `translateY(100%)`,
    opacity: fullMenuVisible ? 1 : 0
  });

  return (
    <div>
      {mode==="edit" ?
        <div>
          <div className="App popup">
          <button
            className="tab-button"
            onClick={() => setFullMenuVisible(true)}
          >
            Edit
          </button>
          <Menu mode={mode} setFullMenuVisible={setFullMenuVisible} style={fullMenuAnimation} />
        </div>
      </div>
      :
      <div className="App popup">
        <button
          className="tab-button"
          onClick={() => setFullMenuVisible(true)}
        >
          Create New
        </button>
        <Menu mode={mode} setFullMenuVisible={setFullMenuVisible} style={fullMenuAnimation} />
      </div>
    }
    </div>
  );
}

export default Modal;

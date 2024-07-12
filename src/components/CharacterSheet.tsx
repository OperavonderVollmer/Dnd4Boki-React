import {useState} from "react";
import "./CharacterSheet.css";
import Cookies from "js-cookie";

const CharacterSheet = () => {
    const panelColor = `rgb(${Cookies.get("panelColor")})`;
    return (
        <>
            <div className="everythingContainer">
                <div className="bigContainer mainContainer" style={{backgroundColor: panelColor}}></div>
                <div className="sideContainer mainContainer" style={{backgroundColor: panelColor}}></div>
            </div>
        </>
    );
};

export default CharacterSheet;

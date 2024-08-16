import React, {useEffect, useState} from "react";
import {SliderPicker} from "react-color";
import Cookies from "js-cookie";
import "./ConfigMenu.css";

const ConfigMenu = () => {
    const [bgImageValue, setBgImageValue] = useState("");
    const [panelColor, setPanelColor] = useState(`rgb(${Cookies.get("panelColor")})`);
    const [buttonColor, setButtonColor] = useState(`rgb(${Cookies.get("buttonColor")})`);
    const fontColor = Cookies.get("fontColor");
    const [fontSize, setFontSize] = useState(Number(Cookies.get("fontSize")));

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBgImageValue(event.target.value);
    };

    const handleImageSubmit = (type: string) => {
        if (type === "submit") {
            console.log(`Image set to ${bgImageValue}`);
            Cookies.set("backgroundImage", bgImageValue, {expires: 7});
        } else if (type === "reset") {
            console.log(`Image reset`);
            Cookies.set("backgroundImage", "./background-image.jpg", {expires: 7});
        }
        window.location.reload();
    };

    const handlePanelColorChange = (color: {rgb: {r: any; g: any; b: any}}) => {
        const newColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.7`;
        const newbtnColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1`;
        setPanelColor(`rgb(${newColor})`);
        setButtonColor(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1)`);
        Cookies.set("panelColor", newColor, {expires: 7});
        Cookies.set("buttonColor", newbtnColor, {expires: 7});
        console.log(buttonColor);
        console.log(`New Color: ${newColor}`);
    };
    console.log("buttonColor" + Cookies.get("buttonColor"));
    console.log("panelColor" + Cookies.get("panelColor"));
    const handleFontColorChange = (event: any) => {
        let c = event.target.value;
        c ? Cookies.set("fontColor", c, {expires: 7}) && window.location.reload() : null;
    };

    const handleFontSizeChange = (event: any) => {
        setFontSize(event.target.value);
    };

    const handleFontSizeSubmit = () => {
        fontSize && fontSize > 0 && fontSize < 100 ? Cookies.set("fontSize", String(fontSize), {expires: 7}) && window.location.reload() : alert("Please enter a valid font size");
    };

    return (
        <div className="everythingContainer">
            <div className="configMainContainer mainContainer" style={{backgroundColor: `${panelColor}`}}>
                <div className="insideContainer">
                    <div className="bgConfigContainer configContainer">
                        <label htmlFor="bgImage">Background Image</label>
                        <input name="bgImage" id="bgImage" type="text" value={bgImageValue} onChange={handleImageInputChange} />
                        <button id="bgImageSubmit" className={`configButton`} style={{backgroundColor: buttonColor, color: fontColor}} onClick={() => handleImageSubmit("submit")}>
                            Submit
                        </button>
                        <button id="bgImageReset" className={`configButton`} style={{backgroundColor: buttonColor, color: fontColor}} onClick={() => handleImageSubmit("reset")}>
                            Reset
                        </button>
                    </div>
                    <div className="panelColorConfigContainer configContainer">
                        <label htmlFor="panelColor">Panel Color</label>
                        <SliderPicker color={`${panelColor}`} onChange={handlePanelColorChange} />
                    </div>
                    <div className="fontColorConfigContainer configContainer">
                        <label htmlFor="fontColor">Font Color</label>
                        <select name="fontColor" id="fontColor" defaultValue={fontColor} onChange={handleFontColorChange}>
                            <option value="select" disabled>
                                Select...
                            </option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                        </select>
                    </div>
                    <div className="fontSizeConfigContainer configContainer">
                        <label htmlFor="fontSize">Font Size</label>
                        <input type="text" className="fontSize" name="fontSize" id="fontSize" value={fontSize} onChange={handleFontSizeChange} />
                        <button id="fontSizeSubmit" className="configButton" style={{backgroundColor: buttonColor, color: fontColor}} onClick={handleFontSizeSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigMenu;

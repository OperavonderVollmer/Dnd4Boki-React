import {useState, useEffect} from "react";
import "./App.css";
import CharacterSheet from "./components/CharacterSheet";
import Cookies from "js-cookie";
import ConfigMenu from "./components/ConfigMenu";

const App = () => {
    const defaults = {
        fontSize: "10",
        fontColor: "white",
        panelColor: "32, 43, 56, 0.7",
        backgroundImage: "/background-image.jpg",
    };

    const [activeControl, changeActiveControl] = useState("ConfigMenu");

    const [config, setConfig] = useState({
        fontSize: Cookies.get("fontSize") || defaults.fontSize,
        fontColor: Cookies.get("fontColor") || defaults.fontColor,
        panelColor: Cookies.get("panelColor") || defaults.panelColor,
        backgroundImage: Cookies.get("backgroundImage") || defaults.backgroundImage,
    });

    useEffect(() => {
        const updateConfig = () => {
            setConfig({
                fontSize: Cookies.get("fontSize") || defaults.fontSize,
                fontColor: Cookies.get("fontColor") || defaults.fontColor,
                panelColor: Cookies.get("panelColor") || defaults.panelColor,
                backgroundImage: Cookies.get("backgroundImage") || defaults.backgroundImage,
            });
        };

        window.addEventListener("storage", updateConfig);
        Cookies.set("fontSize", config.fontSize, {expires: 7});
        Cookies.set("panelColor", config.panelColor, {expires: 7});
        Cookies.set("backgroundImage", config.backgroundImage, {expires: 7});
    }, [config]);

    const bodyStyle = {
        background: "color",
        fontSize: `${config.fontSize}px`,
        color: `${config.fontColor}`,
        backgroundImage: `url(${config.backgroundImage})`,
    };

    return (
        <div className="body" style={bodyStyle}>
            <div className="currentControl" id={"currentControl"}>
                {/* if statements that check activeControl*/}
                {activeControl === "CharacterSheet" && <CharacterSheet />}
                {activeControl === "ConfigMenu" && <ConfigMenu />}
            </div>
        </div>
    );
};

export default App;

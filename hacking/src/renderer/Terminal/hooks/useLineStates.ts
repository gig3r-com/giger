import {useState} from "react";

const gigerArt = [
  '',
  '',
  `##########################################################################################`,
  `                      ________ .___   ________ ________  __________ `,
  `                     /  _____/ |   | /  _____/ \\_____  \\ \\______   \\`,
  `                    /   \\  ___ |   |/   \\  ___   _(__  <  |       _/`,
  `                    \\    \\_\\  \\|   |\\    \\_\\  \\ /       \\ |    |   \\`,
  `                     \\______  /|___| \\______  //______  / |____|_  /`,
  `                            \\/              \\/        \\/         \\/ `,
  `##########################################################################################`,
  '',
  '',
]

export function useLineStates() {
  const [lines, setLines] = useState(gigerArt);
  const [userLines, setUserLines] = useState([]);
  const addLine = (line) => setLines(lines => [ ...lines, line]);
  const addLines = (lines) => setLines(oldLines => [ ...oldLines, ...lines]);
  const addUserLine = (line) => {
    addLine(`<span class="user-line">${line}</span>`);
    setUserLines(lines => [ ...lines, line]);
  }

  return { lines, setLines, userLines, setUserLines, addLine, addLines, addUserLine, };
}

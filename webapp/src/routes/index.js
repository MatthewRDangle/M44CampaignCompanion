import battleByTileId from './scenario/tile/battleByTileId.js'
import mapByTileId from './scenario/tile/mapByTileId.js'
import setupByTileId from './scenario/tile/setupByTileId.js'
import activeScenario from './scenario/activeScenario.js'
import sessionLobby from './session/sessionLobby.js'
import scenarioList from './settings/scenarioList.js'
import scenarioUpload from './settings/scenarioUpload.js'
import mainMenu from './mainMenu.js';
import splash from './splash.js'

export default [
    battleByTileId,
    mapByTileId,
    setupByTileId,
    activeScenario,
    sessionLobby,
    scenarioList,
    scenarioUpload,
    mainMenu,
    splash,
]
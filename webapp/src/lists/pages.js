import battleByTileId from '../routes/scenario/tile/BattleByTileId.view.js'
import mapByTileId from '../routes/scenario/tile/MapByTileId.view.js'
import setupByTileId from '../routes/scenario/tile/SetupByTileId.view.js'
import activeScenario from '../routes/scenario/ActiveScenario.view.js'
import sessionLobby from '../routes/session/SessionLobby.view.js'
import scenarioList from '../routes/settings/ScenarioList.view.js'
import scenarioUpload from '../routes/settings/ScenarioUpload.view.js'
import main from '../routes/MainMenu.view.js';
import playMenu from '../routes/SessionMenu.view.js';
import settingsMenu from '../routes/SettingsMenu.view.js';
import splash from '../routes/Splash.view.js'

export default [
    battleByTileId,
    mapByTileId,
    setupByTileId,
    activeScenario,
    sessionLobby,
    scenarioList,
    scenarioUpload,
    main,
    playMenu,
    settingsMenu,
    splash,
]
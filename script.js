
const { demo, group, wait } = require("demokit");
const { br, type, paste, key, backspace } = require("demokit/keyboard");
const scene = require("demokit/scene");
const recording = require("demokit/recording");

const window = require("demokit/window");
const editor = require("demokit/window/code-editor");
const browser = require("demokit/window/browser");

const dialog = require("./dialog");
const comment = require("./comment");

const mouse = require("demokit/mouse");

const NotebookDemo = require("./notebook-demo");
const EndpointDemo = require("./endpoint-demo");
const EmbedDemo = require("./embed-demo");
const EndCredits = require("./end-credits");
const { link } = require("demokit/html");
module.exports = <demo>

    <link rel = "stylesheet" href = "https://fonts.googleapis.com/css?family=Lato:400,400i|Roboto"  />
    <link rel = "stylesheet" href = "https://code.cdn.mozilla.net/fonts/fira.css" />

    <wait.loaded font = "'Fira Sans'" />
    <wait.loaded font = "Roboto" />

    <scene width = { 1624 } height = { 868 } background = "rgba(0, 0, 0, 1)" />

    <dialog id = "dialog"
            contentRect =  { { origin: { x: "center", y: "center" }, size: { width: 1624, height: 868 } } } />

    <NotebookDemo.initialize/>
    <EndpointDemo.initialize/>
    <EmbedDemo.initialize/>

    <wait delay = { 1000 } />

    <mouse.move window = "dialog" selector = ".logo" dy = { 300 } />
    <mouse.hide/>
    
    <recording.start filePath = { "videos/video" } clickRegions = { true } />

    <wait delay = { 2000 } />

    <dialog.initial id = "dialog" />

    <NotebookDemo />
    <EndpointDemo />
    <EmbedDemo />
    <EndCredits/>

    <wait delay = { 10000 } />

    <recording.stop />

</demo>;

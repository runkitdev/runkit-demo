
const { demo, wait, group, delay, immediate, using } = require("demokit");
const { type, br, paste, key } = require("demokit/keyboard");
const window = require("demokit/window");
const browser = require("demokit/window/browser");
const terminal = require("demokit/window/terminal");
const mouse = require("demokit/mouse");
const execute = require("demokit/execute");

const clean = require("./clean-runkit");

const dialog = require("./dialog");
const comment = require("./comment");


module.exports = 
    <demo>
        <using window = "dialog">
            <dialog.deleteToRunKit />
            <dialog.type> lets you create an API instantly.</dialog.type>
        </using>

        <wait delay = { 1500 } />

        <group animate = { true }>
            <dialog.moveUp id = "dialog" />
            <window.style id = "endpoint-browser" opacity = { 1 } y = { 150 } />
        </group>
        
        <immediate>
            <dialog.showButton id = "dialog" which = "right" />
        </immediate>

        <using window = "endpoint-browser">
            <selectCell index = { 1 } />
            <comment>Any playground can become an API by exporting a function:</comment>
            <type>exports.endpoint = function (request, response)<br/>
&#123;<br pause = { 150 }/>
<paste>&nbsp;&nbsp;&nbsp;&nbsp;</paste>response.end("Hello World from RunKit!\n");<br/>
&#125;
            </type>
        </using>

        <wait delay = { 800 }/>

        <window.style id = "endpoint-terminal" y = { 400 } animate = { true } />

        <wait delay = { 800 }/>

        <using id = "endpoint-terminal">
            <type id = "endpoint-terminal">curl <wait delay = { 500 }/><paste>https://runkit.io/test/hello-world/branches/master</paste></type>
            <type><br pause = { 800 } /><paste>Hello World from RunKit!</paste><br/><paste>$ </paste></type>
        </using>
        
        <wait delay = { 2000 }/>

        <group animate = { true } >
            <dialog.moveDown id = "dialog" />
            <window.style id = "endpoint-browser" opacity = { 0 } y = { 500 } />
            <window.style id = "endpoint-terminal" opacity = { 0 } y = { 868 } />
        </group>

    </demo>;

async function selectCell({ window:aWindow, index })
{
    return  <using window = { aWindow } >
                <mouse.click move = { false } effect = { false } selector = { `${cellSelector(index)} .source-editor` } />
                <key code = "Down" />
            </using>
}

function cellSelector(anIndex)
{
    return ".cell-container:nth-of-type(" + (anIndex + 2) + ")";
}

module.exports.initialize = async function ()
{
    return  <demo>
                <clean window = "endpoint-browser" />

                <terminal   id = "endpoint-terminal"
                            contentRect = { { origin: { x: 700, y: "offscreen-bottom" }, size: { width: 600, height: 400 } } }/>
            </demo>;
}
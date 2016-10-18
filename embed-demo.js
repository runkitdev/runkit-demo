
const { demo, wait, group, immediate, using } = require("demokit");
const { paste, br, type } = require("demokit/keyboard");
const window = require("demokit/window");
const editor = require("demokit/window/code-editor");
const browser = require("demokit/window/browser");
const mouse = require("demokit/mouse");
const fs = require("fs");
const execute = require("demokit/execute");

const dialog = require("./dialog");

module.exports =
    <demo>
        <using window = "dialog">
            <dialog.deleteToRunKit />
            <dialog.type direction = "right" > brings your documentation to life.</dialog.type>
        </using>

        <wait delay = { 1500 } />

        <group animate = { true }>
            <dialog.moveUp id = "dialog" />
            <window.style id = "documentation-code-editor" x = { 337 } />
            <window.style id = "documentation-browser" x = { 832 } />
        </group>
        
        <immediate>
            <dialog.showButton id = "dialog" which = "right" />
        </immediate>

        <group>
            <dim window = "documentation-code-editor" direction = "in" />
            <dim window = "documentation-browser" direction = "in" dy = { -10 } />
        </group>

        <using window = "documentation-code-editor">
            <mouse.click selector = ".cm-tag" nth = { 10 } dx = { -30 } dy = { -20 }/>
            <wait delay = { 500 } />
            <paste>  &lt;script src="https://embed.runkit.com"</paste>
            <type><br/></type>
            <paste>data-element-id="sort-by"&gt;&lt;/script&gt;</paste>
        </using>

        <wait delay = { 1000 } />

        <execute window = "documentation-browser" script = { function (resolve, reject) { replace().then(resolve).catch(reject) } } />

        <group>
            <dim window = "documentation-code-editor" direction = "out" />
            <dim window = "documentation-browser" direction = "out" dy= { -10 } />
        </group>

        <mouse.click window = "documentation-browser" selector = "#code" dx = { 173 } dy = { 31 } />
        <mouse.hide/>

        <execute window = "documentation-browser" script = { (resolve, reject) => waitForEvaluate().then(resolve).catch(reject) } />

        <wait delay = { 2000 }/>

        <group animate = { true } >
            <dialog.moveDown id = "dialog" />
            <window.style id = "documentation-code-editor" opacity = { 0 } y = { 500 } />
            <window.style id = "documentation-browser" opacity = { 0 } y = { 500 } />
        </group>

    </demo>;

function log({children:[str]})
{
    console.log(str);
}

function dim({ window, direction = "in", dy = 0 })
{
    return  <execute
                window = { window }
                args = {[{direction, dy}]}
                script = { function({direction ,dy}, resolve, reject)
                {
                    function dimmer(id, props)
                    {
                        const keys = Object.keys(props);
                        const transitionKeys = keys.filter(function (aKey)
                        {
                            return Array.isArray(props[aKey]);
                        });
                        const normalKeys = keys.filter(function (aKey)
                        {
                            return !Array.isArray(props[aKey]);
                        });

                        var element = direction === "in" ? document.createElement("div") : document.getElementById(id);
                        var style = element.style;

                        if (direction === "in")
                        {
                            document.body.style.position = "relative";

                            element.id = id;

                            document.body.appendChild(element);

                            style.background = "rgba(0,0,0,0.5)";
                            style.position = "absolute";
                            style.width = "100vw";
                            style.zIndex = "1000";
                        }

                        style.transition = transitionKeys.map(function(aKey)
                        {
                            return aKey + " .45s";
                        }).join(", ");
                        for (var key of normalKeys)
                            style[key] = props[key];

                        for (var key of transitionKeys)
                            style[key] = props[key][0];

                        window.setTimeout(function()
                        {
                            for (var key of transitionKeys)
                                window.getComputedStyle(element)[key];

                            for (var key of transitionKeys)
                                style[key] = props[key][1];
                        }, 1000);
                    }

                    document.addEventListener("transitionend", function handle()
                    {
                        resolve();
                        document.removeEventListener("transitionend", handle);
                    });

                    if (direction === "in")
                    {
                        dimmer("top", { top:0, height:["0px", (182 + dy) + "px"], opacity:[0,1] });
                        dimmer("bottom", { top:["100vh", (385 + dy) + "px"], bottom:"0px", opacity:[0,1] });
                    }
                    else
                    {
                        dimmer("top", { height:[(182 + dy) + "px", "0px"], opacity:[1,0] });
                        dimmer("bottom", { top:[(385 + dy) + "px", "100vh"], opacity:[1,0] });
                    }
                } } />
}

module.exports.initialize = function ()
{
    return  <demo>
                <editor id = "documentation-code-editor"
                        title = "docs.html"
                        source = { fs.readFileSync(require.resolve("./embed-demo/code-editor-contents.html"), "utf8") }
                        firstLineNumber = { 79 }
                        contentRect = { { origin: { x: "offscreen-left", y: 173 }, size: { width: 450, height: 511 } } }/>

                <browser    id = "documentation-browser"
                            title = "lodash.com/docs/4.15.0"
                            contentURL = { require.resolve("./embed-demo/browser-contents.html") }
                            contentRect = { { origin: { x: "offscreen-right", y: 184 }, size: { width: 450, height: 500 } } } />

                <execute window = "documentation-code-editor" script = { resolve => resolve(true) } />
                <execute window = "documentation-browser" script = { resolve => resolve(true) } />

            </demo>
}

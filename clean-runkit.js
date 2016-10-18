
const { demo ,wait, using } = require("demokit");
const window = require("demokit/window");
const browser = require("demokit/window/browser");
const mouse = require("demokit/mouse");
const execute = require("demokit/execute");

module.exports = async function({ window:aWindow })
{
    return  <using window = { aWindow }>

                <browser    title = "runkit.com"
                            contentURL = "https://www.runkit.com/register"
                            contentRect = { { origin: { x: "center", y: 200 }, size: { width: 800, height: 600 } } } />

                <wait delay = { 1000 } />
                <mouse.click selector = "a[href='/skip']" move = { false } />
                <wait delay = { 1000 } />
                <mouse.click selector = ".toolbar-button a[href='/new']" move = { false } />
                <wait delay = { 1000 } />
                <wait.visible selector = ".blank-doc-help" />

                <window.style opacity = { 0 } y = { 500 } />

                <execute script =
                {
                    function (resolve, reject)
                    {
                        document.querySelector(".site-navigation").style.visibility = "hidden";
                        // Help
                        document.querySelector(".blank-doc-help").style.visibility = "hidden";
                        // No Comments
                        document.querySelector(".blank-doc-help").nextSibling.style.visibility = "hidden";
                        // No Save
                        document.querySelector(".save-indicator").style.visibility = "hidden";

                        document.querySelector(".page-sizer").style.padding = "0px 100px 0px 84px";
                        document.querySelector(".page-sizer").style.marginBottom = "150px";

                        document.querySelector("button").style.visibility = "hidden";

                        resolve();
                    }
                }/>

            </using>;
}

function log({ children:[str] })
{
    console.log(str);
}

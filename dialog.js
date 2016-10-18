
const { demo, group } = require("demokit");
const window = require("demokit/window");
const execute = require("demokit/execute");
const borderless = require("demokit/window/borderless");

module.exports = async function (props)
{
    return <demo>
                <borderless { ...props }
                            contentURL = { require.resolve("./dialog.html") } />
                <execute window = { props.id } script = { setTheme } />
            </demo>
}

function setTheme(resolve, reject)
{
    document.body.style.color = "white";
    
    resolve();
}

module.exports.initial = async function ({ id })
{
    await execute(
    {
        window: id,
        script: function (resolve, reject)
        {
            initial().then(resolve).catch(function(e) { alert("WHY"); alert(e); reject() });
        }
    })
}

module.exports.type = async function ({ id, children:[text], WPM = 300, direction = "right" })
{
    await execute(
    {
        window: id,
        args: [{ text, WPM, direction }],
        script: function ({ text, WPM, direction }, resolve, reject)
        {
            type(text, WPM, direction).then(resolve).catch(function(e) { alert("WHY"); alert(e); reject() });
        }
    })
}

module.exports.showButton = function({ id, which })
{
    return <execute window = "dialog" args = { [{ which }] } script= { function({ which }, resolve, reject) { showButton(which).then(resolve).catch(reject) } } />
}

module.exports.moveUp = async function ({ id })
{
    return <window.style id = { id } height = { 110 } />;
}

module.exports.moveDown = async function ({ id })
{
    return  <group>
                <execute window = "dialog" script= { function(resolve, reject) { hideButton("right").then(resolve).catch(reject) } } />
                <window.style id = { id } height = { 868 } />;
            </group>
}

module.exports.deleteToRunKit = async function ({ id })
{
    await execute(
    {
        id: window,
        script: function (resolve, reject)
        {
            deleteToRunKit(350).then(resolve).catch(function(e) { alert("WHY"); alert(e); reject() });
        }
    })
}

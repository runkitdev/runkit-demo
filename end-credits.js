
const { demo, wait, group, delay, using } = require("demokit");
const window = require("demokit/window");
const execute = require("demokit/execute");

const dialog = require("./dialog");

module.exports =
    <demo>
        
        <using id = "dialog">
            <dialog.deleteToRunKit />
            <group>
                <execute window = "dialog" script = { (resolve, reject) => fadeIn().then(resolve).catch(reject) } />
                <dialog.type>.com</dialog.type>
            </group>
        </using>
        
        <group>
            <dialog.showButton id = "dialog" which = "end-replay" />
            <dialog.showButton id = "dialog" which = "end-try-it-now" />
        </group>
        
    </demo>
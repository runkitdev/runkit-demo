
const { reduce } = require("ramda");
const { wait } = require("demokit");
const { br, type } = require("demokit/keyboard");


module.exports = async function comment({ window, children: [aString] })
{
    const maximumLength = 62;
    const lines = reduce(function(lines, word)
    {
        const appended = lines[lines.length - 1] + " " + word;

        if (appended.length <= maximumLength)
            return lines.slice(0, lines.length - 1).concat(appended);

        return lines.concat(["\n// " + word]);
    }, ["//"], aString.split(" "));

    return  <type window = { window }>
                { lines }
                <wait delay = { 1000 } />
                <br/>
            </type>
}

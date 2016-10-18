
const { demo, wait, group, immediate, using } = require("demokit");
const { paste, br, type, key } = require("demokit/keyboard");
const window = require("demokit/window");
const editor = require("demokit/window/code-editor");
const browser = require("demokit/window/browser");
const fs = require("fs");
const clean = require("./clean-runkit");
const { callout, blurb } = require("demokit/callout");
const { span, i, button } = require("demokit/html");
const mouse = require("demokit/mouse");

const dialog = require("./dialog");
const comment = require("./comment");

const styledBlurb = <blurb style = "font-family: 'Lato', 'Roboto'; color: #ccc;" />;
const wordmark = <span style = "font-family: 'Fira Sans'; font-weight: bold;" />;


module.exports = async function NotebookDemo()
{
    return  <demo>
                <dialog.type id = "dialog"> is a node playground in your browser.</dialog.type>

                <wait delay = { 1500 } />

                <group animate = { true }>
                    <dialog.moveUp id = "dialog"/>
                    <window.style id = "notebook-browser" opacity = { 1 } y = { 150 } />
                </group>
                
                <immediate>
                    <dialog.showButton id = "dialog" which = "right"/>
                </immediate>
                
                <using window = "notebook-browser">

                    <selectCell index = { 1 } />

                    {/* Cell 1 */}
                    <wait delay = { 1000 } />
                    <comment newline = { false } >RunKit runs real node just like your REPL...</comment>
                    <type>"Node.js " + process.version</type>

                    <wait delay = { 500 } />

                    <mouse.click selector = ".engines-dropdown" />
                    <wait delay = { 500 } />
                    <mouse.click selector = "span[value='6.x.x']" />

                    <clickLastRunButton />

                    <wait delay = { 1000 } />

                    {/* Cell 2 */}
                    <comment>...except you can require ANY package from npm instantly:</comment>
                    <mouse.click selector = "button svg" />

                    <wait delay = { 500 } />
                    <wait.visible selector = ".module-search" />

                    <type>roman numeral</type>

                    <wait delay = { 1000 } />
                    <mouse.move selector = "button.require-button"/>
                    <mouse.effect selector = "button.require-button"/>

                    <wait delay = { 100 } />
                    <key code = "Escape"/>
                    <immediate>
                        <mouse.hide/>
                    </immediate>

                    <selectCell index = { 2 } />
                    <paste>require("roman-numeral")</paste>
                    <wait delay = { 500 } />
                    <type>.convert(2016)</type>
                    <clickLastRunButton/>

                    <wait delay = { 1000 } />

                    {/* Cell 3 */}
                    <comment>RunKit can also VISUALIZE your results.</comment>
                    <comment>Let&apos;s get the location of the International Space Station:</comment>
                    <type>
                        const getJSON = require(<wait delay = { 200 }/><paste>"async-get-json"</paste>);<br/>
                        const ISS_API = <wait delay = { 200 }/><paste>"http://api.open-notify.org&#47;iss-now.json"</paste>;<wait delay = { 200 }/><br/>
                        (await getJSON(ISS_API)).iss_position;
                    </type>
                    <clickLastRunButton/>

                    <wait.visible selector = ".leaflet-container" />
                    <window.scroll selector = "span[value='com.tonicdev.coordinates-as-map']" />

                    <window.style dx = { 300 } animate = { true } />
                    <callout from = { { x: 670, y: 163 } } to = { { x: 750, y: 163 } }>
                        <styledBlurb>
                            <wordmark>RunKit</wordmark> shows results using special <i>object viewers</i>.
                        </styledBlurb>
                        <styledBlurb>
                            In this case <wordmark>RunKit</wordmark> chose a map viewer because the result <i>looked like</i> a geographic coordinate.
                        </styledBlurb>
                        <styledBlurb>
                            You can always show the native representation by choosing the <i>properties viewer</i> from the pop up menu.
                        </styledBlurb>

                        <mouse.click selector = { `${cellSelector(3)} span[value='com.tonicdev.coordinates-as-map']` } />
                        <mouse.click selector = { `${cellSelector(3)} .dropdown-menu span[value='com.tonic.properties-and-prototype-of']` } reveal = { true } />
                    </callout>

                    <window.style dx = { -300 } animate = { true } />

                    <wait delay = { 1000 } />

                    <mouse.click selector = { `${cellSelector(3)} span[value='com.tonicdev.coordinates-as-map']` } />
                    <mouse.click selector = { `${cellSelector(3)} .dropdown-menu span[value='com.tonicdev.coordinates-as-map']` } reveal = { true } />

                    <wait delay = { 1000 } />

                    <window.scroll selector = { cellSelector(4) } />
                    <selectCell index = { 4 } />

                    {/* Cell 4 */}
                    <comment>Let&apos;s require a RunKit playground to play with GitHub data:</comment>
                    <type>const stats = require("@runkit/runkit/github-stats/1.0.0");</type><br/>
                    <type>const R = require("ramda");</type><br/>
                    <br/>
                    <comment>We can now find the most popular repos on GitHub:</comment>
                    <type>const repos = (await stats.getMostPopularRepos(&#123; limit: 3 &#125;));</type><br/>
                    <type>const names = R.pluck("full_name", repos);</type>
                    <clickLastRunButton/>

                    <wait.visible selector = { `${cellSelector(4)} .object-description` } />
                    <window.scroll selector = { `${cellSelector(4)} .object-description` } />

                    <wait delay = { 1000 } />

                    <window.scroll selector = { cellSelector(5) } />

                    {/* Cell 5 */}
                    <comment>Cool! But let&apos;s see which is the most active.</comment>
                    <comment>Every cell still has access to the data before it:</comment>
                    <type>const &#123; map &#125; = require("bluebird");</type><br/>
                    <type>const commits = await map(names, stats.getCommitActivity);</type><br/>
                    <type>const commitsPerDay = R.pluck("days", commits);</type><br/>
                    <br/>
                    <type>R.zipObj(names, commitsPerDay);</type>

                    <clickLastRunButton/>

                    <wait.visible selector = { `${cellSelector(5)} .object-description` } />
                    <window.scroll selector = { `${cellSelector(5)} .object-description` } />

                    <wait delay = { 1000 } />

                    <window.style dx = { 300 } animate = { true } />
                    <callout from = { { x: 670, y: 163 } } to = { { x: 750, y: 163 } }>
                        <styledBlurb>
                            This just an ordinary JavaScript object, but we can again use the pop up menu
                            to choose a more interesting viewer.
                        </styledBlurb>

                        <mouse.click selector = { `${cellSelector(5)} span[value='com.tonic.properties-and-prototype-of']` } />
                        <mouse.click selector = { `${cellSelector(5)} span[value='com.tonic.chart-from-object-of-objects']` } reveal = { true } />

                        <wait.visible selector = { `${cellSelector(5)} .c3-event-rect` } />
                        <window.scroll selector =  { `${cellSelector(5)} .object-description` } />

                        <styledBlurb>
                            <wordmark>RunKit</wordmark> was able to show us this data as a much easier to read <i>graph</i>
                        </styledBlurb>

                    </callout>

                    <window.style dx = { -300 } animate = { true } />

                    <wait delay = { 2000 }/>

                </using>

                <group animate = { true } >
                    <dialog.moveDown id = "dialog" />
                    <window.style id = "notebook-browser" opacity = { 0 } y = { 500 } />
                </group>
            </demo>
}

function clickLastRunButton({ window })
{
    return <mouse.click window = { window } selector = "button.run-button" reveal = { true } />
}

async function selectCell({ window:aWindow, index })
{
    return  <using window = { aWindow } >
                <mouse.click move = { false } effect = { false } selector = { `${cellSelector(index)} .source-editor` } />
                <wait.visible selector = { `${cellSelector(index)}.focused` } />
                <key code = "Down" />
            </using>
}

function cellSelector(anIndex)
{
    return ".cell-container:nth-of-type(" + (anIndex + 2) + ")";
}

module.exports.initialize = function initialize()
{
    return <clean window = "notebook-browser" />
}

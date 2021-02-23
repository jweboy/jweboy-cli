"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var open_1 = __importDefault(require("open"));
var OSX_CHROME = 'google chrome';
var Actions = Object.freeze({
    NONE: 0,
    BROWSER: 1,
    SCRIPT: 2,
});
function getBrowserEnv() {
    var value = process.env.BROWSER;
    var args = process.env.BROWSER_ARGS ? process.env.BROWSER_ARGS.split(' ') : [];
    var action;
    if (!value) {
        action = Actions.BROWSER;
    }
    else if (value.toLowerCase().endsWith('.js')) {
        action = Actions.SCRIPT;
    }
    else if (value.toLowerCase() === 'none') {
        action = Actions.NONE;
    }
    else {
        action = Actions.BROWSER;
    }
    return { action: action, value: value, args: args };
}
function executeNodeScript(scriptPath, url) {
    var extraArgs = process.argv.slice(2);
    var child = cross_spawn_1.default('node', __spread([scriptPath], extraArgs, [url]), {
        stdio: 'inherit',
    });
    child.on('close', function (code) {
        if (code !== 0) {
            console.log();
            console.log(chalk_1.default.red('The script specified as BROWSER environment variable failed.'));
            console.log(chalk_1.default.cyan(scriptPath) + " exited with code " + code + ".");
            console.log();
        }
    });
    return true;
}
function startBrowserProcess(browser, url, args) {
    var shouldTryOpenChromeWithAppleScript = process.platform === 'darwin' && (typeof browser !== 'string' || browser === OSX_CHROME);
    if (shouldTryOpenChromeWithAppleScript) {
        try {
            child_process_1.execSync('ps cax | grep "Google Chrome"');
            child_process_1.execSync("osascript openChrome.applescript \"" + encodeURI(url) + "\"", {
                cwd: __dirname,
                stdio: 'ignore',
            });
            return true;
        }
        catch (err) {
        }
    }
    if (process.platform === 'darwin' && browser === 'open') {
        browser = undefined;
    }
    if (typeof browser === 'string' && args.length > 0) {
        browser = [browser].concat(args);
    }
    try {
        var options = { app: browser, wait: false, url: true };
        open_1.default(url, options).catch(function () { });
        return true;
    }
    catch (err) {
        return false;
    }
}
function openBrowser(url) {
    var _a = getBrowserEnv(), action = _a.action, value = _a.value, args = _a.args;
    switch (action) {
        case Actions.NONE:
            return false;
        case Actions.SCRIPT:
            return executeNodeScript(value, url);
        case Actions.BROWSER:
            return startBrowserProcess(value, url, args);
        default:
            throw new Error('Not implemented.');
    }
}
exports.default = openBrowser;

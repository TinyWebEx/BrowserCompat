/**
 * Helper functions useful for ensuring browser compatibility.
 *
 * @public
 * @module BrowserCompat
 */

/**
 * Returns a value based on what browser this is running in.
 *
 * @private
 * @param  {Object} switchBrowser an object with values to return per browser
 * @returns {Promise<string>}
 */
export async function getBrowserValue(switchBrowser) {
    if (browser.runtime.getBrowserInfo) {
        const browserInfo = await browser.runtime.getBrowserInfo();

        if (browserInfo.name === "Thunderbird") {
            return switchBrowser.thunderbird;
        }
        return switchBrowser.firefox;
    }
    return switchBrowser.chrome;
}

/**
 * Check if the current browser is Chrome/Chromium.
 *
 * @returns {Promise<boolean>}
 */
export async function isChrome() {
    if (browser.runtime.getBrowserInfo) {
        const browserInfo = await browser.runtime.getBrowserInfo();

        if (browserInfo.vendor === "Mozilla") {
            return false;
        } else if (browserInfo.vendor === "Google") {
            return true;
        }

        switch (browserInfo.name) {
            case "Thunderbird":
            case "Firefox":
                return false;
        
            case "Chrome":
            case "Chromium":
            default:
                return true;
        }
    }
    return true;
}
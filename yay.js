const sleep = async (milliseconds) => {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
};

const thePayloadYay = async () => {
    if (typeof marketAPI === 'undefined') {
        alert("❌ marketAPI is undefined — likely wrong context.");
        return;
    }

    const maxTries = 20;
    const delayMs = 1000;
    let found = false;

    for (let i = 0; i < maxTries; i++) {
        const apps = marketAPI.getInstalledApps({});
        for (let app of apps) {
            if (app.packageName === "com.fortimind.witrace") {
                marketAPI.openApp({ "pName": "com.fortimind.witrace" });
                found = true;
                break;
            }
        }
        if (found) break;
        await sleep(delayMs);
    }

    if (!found) {
    }
};

// Step 1: Sanity check and debug before install

// Step 2: Trigger install
console.log("✅ marketAPI.install is about to be called");
marketAPI.install({
    "extra_params": {
        "downloadImmediately": "true",
        "startDownload": "true",
        "callerPackage": "com.xiaomi.mipicks",
        "sourcePackage": "com.miui.home",
        "callerSignature": "88daa889de21a80bca64464243c9ede6",
        "launchWhenInstalled": "true",
        "pName": "com.fortimind.witrace",
        "appClientId": "com.xiaomi.mipicks",
        "refs": "-detail/com.fortimind.witrace",
        "pos": "detailInstallBtn"
    },
    "title": "Witrace",
    "pName": "com.fortimind.witrace",
    "appId": 3472931,
    "appInfo": {
        "packageName": "com.fortimind.witrace",
        "displayName": "Witrace",
        "publisherName": "FORTIMIND R&D (SMC-PRIVATE) LIMITED",
        "versionName": "1.0",
        "versionCode": 1
    },
    "callBack": "marketAsyncCb.installCb"
});
console.log("✅ marketAPI.install called successfully");
// Step 3: Poll until app appears, then launch
thePayloadYay();

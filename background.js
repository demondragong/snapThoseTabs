// Where we will expose all the data we retrieve from storage.sync.
const storageCache = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
  // Copy the data retrieved from storage into storageCache.
  Object.assign(storageCache, items);
});


// listen to the user clicking
// it's such a beautiful sound
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await initStorageCache;
  } catch (e) {
    // Handle error that occurred during storage initialization.
    console.log("error during storage initialization")
  }
  
  // find the tabs to snap
  let tabsToSnap = await chrome.tabs.query({
    currentWindow: storageCache.closeInCurrentWindowOnlySetting ? true : undefined,
    pinned: storageCache.closePinnedTabsSetting ? undefined : false,
  });
  const tabsToSnapIds = tabsToSnap.map(({ id }) => id);

  // open a new tab if the user asked for that
  if (storageCache.openEmptyTabSetting) {
    chrome.tabs.create({});
  }
  // snap them
  await chrome.tabs.remove(tabsToSnapIds);
});

// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.
function getAllStorageSyncData() {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(null, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}
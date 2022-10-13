// load the default options
let closeInCurrentWindowOnlySetting = true;
let closePinnedTabsSetting = false;
let openEmptyTabSetting = false;

// get the actual user options
chrome.storage.sync.get(
  {
    closeInCurrentWindowOnlySetting: true,
    closePinnedTabsSetting: false,
    openEmptyTabSetting: false,
  },
  function (items) {
    closeInCurrentWindowOnlySetting = items.closeInCurrentWindowOnlySetting;
    closePinnedTabsSetting = items.closePinnedTabsSetting;
    openEmptyTabSetting = items.openEmptyTabSetting;
  }
);

// listen to the user clicking
// it's such a beautiful sound
chrome.action.onClicked.addListener(async () => {
  // find the tabs to snap
  let tabsToSnap = await chrome.tabs.query({
    currentWindow: closeInCurrentWindowOnlySetting ? true : undefined,
    pinned: closePinnedTabsSetting ? undefined : false,
  });
  // snap them
  chrome.tabs.remove(tabsToSnap.map((tab) => tab.id));
  // open a new tab if the user asked for that
  if (openEmptyTabSetting) {
    chrome.tabs.create({});
  }
});

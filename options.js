// Saves options to chrome.storage
function save_options() {
  const closeInCurrentWindowOnlySetting = document.getElementById(
    "closeInCurrentWindowOnlySetting"
  ).checked;
  const closePinnedTabsSetting = document.getElementById(
    "closePinnedTabsSetting"
  ).checked;
  const openEmptyTabSetting = document.getElementById(
    "openEmptyTabSetting"
  ).checked;
  chrome.storage.sync.set(
    {
      closeInCurrentWindowOnlySetting,
      closePinnedTabsSetting,
      openEmptyTabSetting,
    },
    function () {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores options using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      closeInCurrentWindowOnlySetting: true,
      closePinnedTabsSetting: false,
      openEmptyTabSetting: false,
    },
    function (items) {
      document.getElementById("closeInCurrentWindowOnlySetting").checked =
        items.closeInCurrentWindowOnlySetting;
      document.getElementById("closePinnedTabsSetting").checked =
        items.closePinnedTabsSetting;
      document.getElementById("openEmptyTabSetting").checked =
        items.openEmptyTabSetting;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);

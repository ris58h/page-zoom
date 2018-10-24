const zoomLevel = 1.33

const noUrlTabs = new Set()

chrome.tabs.onCreated.addListener(function (tab) {
    noUrlTabs.add(tab.id)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    if (noUrlTabs.has(tabId) && changeInfo.url) {
        chrome.tabs.setZoom(tabId, zoomLevel)
        noUrlTabs.delete(tabId)
    }
})

chrome.tabs.onRemoved.addListener(function (tabId) {
    noUrlTabs.delete(tabId)
})
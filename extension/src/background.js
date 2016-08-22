const skipPatterns = [
    'bandwidth-hero\.s3\.amazonaws\.com',
    'syndication\.twitter\.com',
    'facebook\.com/(tr/|rsrc\.php|impression\.php)',
    'google-analytics',
    'favicon',
    '.*\.svg'
];
const placeholder = chrome.extension.getURL('/res/images/placeholder.png');

chrome.webRequest.onBeforeRequest.addListener(
    details => {
        if (!details.url.match(RegExp(`(${skipPatterns.join('|')})`, 'i'))
            && details.url.match(/https?:\/\/.+/i)) {
            return {
                redirectUrl: placeholder
            };
        }
    },
    {
        urls: ["<all_urls>"],
        types: ["image"]
    },
    ["blocking"]
);
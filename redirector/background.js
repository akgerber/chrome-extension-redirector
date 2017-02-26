chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var redirects, pattern, from, to, redirecUrl;
    utm = JSON.parse(localStorage.getItem('utm') || '[]');
    try {
      pattern = new RegExp('utm_source', 'ig');
    } catch(err) {
      //bad pattern
    }
    match = details.url.match(pattern);
    if (match) {
      redirectUrl = URI(details.url)
	.removeSearch("utm_source")
        .addSearch({utm_source: "mybutt"})
	.toString();

      if (redirectUrl != details.url) {
        return {redirectUrl: redirectUrl};
        }
    }
    return {};
  },
  {
    urls: [
      "<all_urls>",
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);

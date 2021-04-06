const functions = require('firebase-functions');
const useragent = require('useragent');
const fetch = require('node-fetch');

exports.proxy = functions.https.onRequest((req, res) => {
  const HOSTING_ORIGIN = 'https://doronko-acf15.web.app';
  const HTML_DIRECTORY = '/_html';
  let fetchURL = `${HOSTING_ORIGIN}${HTML_DIRECTORY}${req.path}`;
  const isModern = (UA) => {
    // The versions that has Array.from and fetch
    // Anything older than this is legacy.
    const modern = {
      chrome: 42,
      firefox: 32,
      safari: 10.1,
      mobile_safari: 10.3,
      edge: 14,
    };
    const browserList = useragent.is(UA);
    let isModern = false;
    for (const key in browserList) {
      if (modern[key]) {
        const browserVersion = parseFloat(useragent.lookup(UA).toVersion());
        if (browserVersion >= modern[key]) {
          isModern = true;
        } else {
          isModern = false;
          break;
        }
      }
    }
    return isModern;
  };
  if (!isModern(req.header('user-agent'))) {
    let prefix = '';
    if (req.path.split('#')[0] === '/') {
      prefix = 'index';
    }
    fetchURL = `${fetchURL}${prefix}_polyfill`;
  }
  console.log(
    'new request:',
    req.header('user-agent'),
    isModern(req.header('user-agent')),
    fetchURL);
  fetch(fetchURL)
    .then((content) => content.text()
      .then((text) => res.status(200).send(text)));
});



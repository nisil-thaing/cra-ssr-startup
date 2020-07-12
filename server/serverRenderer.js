import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// import our main App component
import App from '../src/app/App';
// import the manifest generated with the create-react-app build
import manifest from '../build/asset-manifest.json';

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
  .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
  .map(k => assets[k]);

export default function (req, res, _) {
  const modules = [];
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    // render the app as a string
    const initialMarkup = ReactDOMServer.renderToString(
      <App />
    );

    const extraChunks = extractAssets(manifest, modules)
      .map(c => `<script type="text/javascript" src="/${c}"></script>`);

    return res.send(
      htmlData
        .replace(
          '<div id="root"></div>',
          `<div id="root">${ initialMarkup }</div>`
        )
        .replace('</body>', extraChunks.join('') + '</body>')
    );
  });
}
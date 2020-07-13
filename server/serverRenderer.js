import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

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
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    const sheet = new ServerStyleSheet();
    const helmetContext = {};
    const routerContext = {};
    let initialMarkup, styleTags;

    try {
      initialMarkup = ReactDOMServer.renderToString(
        <HelmetProvider context={ helmetContext }>
          <StyleSheetManager sheet={ sheet.instance }>
            <StaticRouter location={ req.baseUrl } context={ routerContext }>
              <App />
            </StaticRouter>
          </StyleSheetManager>
        </HelmetProvider>
      );
      styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    } catch (error) {
      // TODO: handle error
      console.error(error);
    } finally {
      sheet.seal();
    }

    const extraChunks = extractAssets(manifest, modules)
      .map(c => `<script type="text/javascript" src="/${c}"></script>`);
    const { helmet } = helmetContext;

    return res.send(
      htmlData
        .replace(
          '<div id="root"></div>',
          `<div id="root">${ initialMarkup }</div>`
        )
        .replace('</body>', extraChunks.join('') + '</body>')
        .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
        .replace('<style></style>', styleTags)
    );
  });
}
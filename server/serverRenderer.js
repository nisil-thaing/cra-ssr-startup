import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// import our main App component
import App from 'app/App';
// import the manifest generated with the create-react-app build
import manifest from '../build/asset-manifest.json';

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
  .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
  .map(k => assets[k]);

export default function (rootStore, history) {
  return function (req, res, _) {
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
          <Loadable.Capture report={ moduleName => modules.push(moduleName) }>
            <HelmetProvider context={ helmetContext }>
              <StyleSheetManager sheet={ sheet.instance }>
                <ReduxProvider store={ rootStore }>
                  <ConnectedRouter history={ history }>
                    <StaticRouter location={ req.baseUrl } context={ routerContext }>
                      <I18nextProvider i18n={ req.i18n }>
                        <App />
                      </I18nextProvider>
                    </StaticRouter>
                  </ConnectedRouter>
                </ReduxProvider>
              </StyleSheetManager>
            </HelmetProvider>
          </Loadable.Capture>
        );
        styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
      } catch (error) {
        // TODO: handle error
        console.error(error);
      } finally {
        sheet.seal();
      }
  
      const extraChunks = extractAssets(manifest, modules)
        .map(chunk => `<script type="text/javascript" src="/${ chunk }"></script>`);
      const { helmet } = helmetContext;
      const reduxState = JSON.stringify(rootStore.getState());
  
      return res.send(
        htmlData
          .replace(
            '<div id="root"></div>',
            `<div id="root">${ initialMarkup }</div>`
          )
          .replace('__INITIAL_REDUX_STATE__={}', `__INITIAL_REDUX_STATE__=${ reduxState }`)
          .replace('</body>', extraChunks.join('') + '</body>')
          .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
          .replace('<style></style>', styleTags)
      );
    });
  };
}
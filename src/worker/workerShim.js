if (
  typeof WorkerGlobalScope !== 'undefined' &&
  // @ts-ignore
  self instanceof window.WorkerGlobalScope
) {
  self.global = self;
  self.window = self;
}

import RefreshRuntime from '/@react-refresh';

if (import.meta.env.DEV) {
  RefreshRuntime.injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => (type) => type;
  window.__vite_plugin_react_preamble_installed__ = true;
}

import { initContentManager } from './content-manager.js';

window._initContentManager = initContentManager;
document.addEventListener('admin-logged-in', () => initContentManager());

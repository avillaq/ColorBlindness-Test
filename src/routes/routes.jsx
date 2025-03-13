import { Home } from '../pages/Home';
import { TestList } from '../pages/TestList';
import { NotFound } from '../pages/NotFound';
import { IshiharaTest } from '../pages/IshiharaTest';
import { FarnsworthD15Test } from '../pages/FarnsworthD15Test';
import { CambridgeTest } from '../pages/CambridgeTest';
import { FarnsworthLanternTest } from '../pages/FarnsworthLanternTest';
import { AnomaloscopeTest } from '../pages/AnomaloscopeTest';
import { KidsTest } from '../pages/KidsTest';

export const routes = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/tests',
    element: TestList,
  },
  {
    path: '/tests/ishihara-test',
    element: IshiharaTest,
  },
  {
    path: '/tests/farnsworth-d-15-test',
    element: FarnsworthD15Test,
  },
  {
    path: '/tests/cambridge-test',
    element: CambridgeTest,
  },
  {
    path: '/tests/farnsworth-lantern-test',
    element: FarnsworthLanternTest,
  },
  {
    path: '/tests/anomaloscope-test',
    element: AnomaloscopeTest,
  },
  {
    path: '/tests/kids-colorblindness-test',
    element: KidsTest,
  },
  {
    path: '*',
    element: NotFound,
  },
];
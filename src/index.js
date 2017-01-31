require('./styles.scss');
import {
  SceneLogo
} from './tmpo.io/scenelogo';

const contentLoaded = () => {
  const scene = new SceneLogo();
}
document.addEventListener('DOMContentLoaded', contentLoaded);

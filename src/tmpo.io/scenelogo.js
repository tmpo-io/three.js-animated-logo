import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from 'three';
import * as TWEEN from 'tween.js';

import {
  Words
} from './words';
import {
  Box
} from './box';


export class SceneLogo {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseZoom = 150;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.totalBoxes = 3000;
    this.boxes = [];
    this.wordBuilt = false;
    this.currentWord = 0;
    this.clickTimeOut = null;

    this.initScene();
    //this.initStats();
    this.buildBoxes();
    this.buildNewWord();
    this.randomFly();
    this.addEvents();

    this.documentClick();
  };

  initScene() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = this.mouseZoom;

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  initStats() {
    /*this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);*/
  }

  buildBoxes() {
    for (let i = 0; i < this.totalBoxes; i++) {
      this.boxes[i] = new Box();
      this.scene.add(this.boxes[i].instance);
    }
  };

  buildNewWord() {
    let word = Words[this.currentWord];
    if (this.currentWord < (Words.length - 1)) {
      this.currentWord++;
    } else {
      this.currentWord = 0;
    }

    let centerX = word.Width / 2;
    let centerY = word.Height / 2;

    for (let i = 0; i < Words[4].Bytes.length; i++) {
      if (i < word.Bytes.length) {
        this.boxes[i].setPosition(
          word.Bytes[i][0] - centerX, -(word.Bytes[i][1] - centerY)
        );
      }
      else {
        this.boxes[i].setPosition();
      }
    }
  }

  randomFly() {
    let start = Math.round((Math.random() * this.totalBoxes));
    let gap = Math.round((Math.random() * 100));
    for (let i = start; i < (start + gap); i++) {
      if (i < this.boxes.length) {
        this.boxes[i].randomFly();
      }
    }
    setTimeout(() => this.randomFly(), (Math.random() * 1000));
  }

  addEvents() {
    document.addEventListener('click', (e) => this.documentClick());
    document.addEventListener('mousemove', (e) => this.mouseMove(e));
    document.addEventListener('mousewheel', (e) => this.mouseWheel(e));
    window.addEventListener('resize', (e) => this.windowResize(e));
    requestAnimationFrame((time) => this.render(time));
  }

  documentClick() {
    this.wordBuilt = !this.wordBuilt;
    if (this.wordBuilt == false) {
      this.buildNewWord();
    }
    for (let i = 0; i < Words[4].Bytes.length; i++) {
      this.boxes[i].toggleAnimate(this.wordBuilt);
    }
    if (this.clickTimeOut) {
      clearTimeout(this.clickTimeOut);
      this.clickTimeOut = null;
    }

    this.autoClick();
  }

  autoClick() {
    if (this.clickTimeOut) {
      clearTimeout(this.clickTimeOut);
      this.clickTimeOut = null;
    }
    this.clickTimeOut = setTimeout(() => {
      this.documentClick();
    }, 5000);
  }

  mouseMove(e) {
    this.mouseX = (e.clientX - this.windowHalfX);
    this.mouseY = (e.clientY - this.windowHalfY);
  }

  mouseWheel(e) {
    this.mouseZoom -= e.wheelDelta * .1;
    if (this.mouseZoom > 1000) {
      this.mouseZoom = 1000
    }
    if (this.mouseZoom < 20) {
      this.mouseZoom = 20;
    }
  }

  windowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(time) {
    //this.stats.begin();

    TWEEN.update(time);
    this.renderer.render(this.scene, this.camera);
    this.camera.position.y += (this.mouseY - this.camera.position.y) * .1;
    this.camera.position.x += (this.mouseX - this.camera.position.x) * .1;
    this.camera.position.z = this.mouseZoom;
    this.camera.lookAt(this.scene.position);

    //this.stats.end();
    requestAnimationFrame((t) => this.render(t));
  }
}

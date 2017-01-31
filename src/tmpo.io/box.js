import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color
} from 'three';
import * as TWEEN from 'tween.js';

export class Box {

  constructor() {
    this.tween = null;
    this.canRandomFly = true;

    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({
      color: new Color(
        "#000000".replace(/0/g, function () {
          return (~~(Math.random() * 16)).toString(16);
        })
      )
    });
    this.instance = new Mesh(this.geometry, self.material);

    this.initData = this.randomCoord();
    this.instance.position.x = this.initData.x;
    this.instance.position.y = this.initData.y;
    this.instance.position.z = this.initData.z;
  }

  randomCoord() {
    return {
      x: (Math.round(Math.random() * 1000) - 500),
      y: (Math.round(Math.random() * 1000) - 500),
      z: (Math.round(Math.random() * 1000) - 500)
    };
  }

  setPosition(x, y, z = 0) {
    if (!x && !y) {
      this.finalData = this.initData;
      return;
    }
    this.canRandomFly = false;
    this.finalData = {
      x,
      y,
      z
    };
  }

  randomFly() {
    if (this.canRandomFly) {
      this.animate(this.randomCoord());
    }
  }

  toggleAnimate(isBuilding) {
    let toPos = this.initData;
    if (isBuilding) {
      toPos = this.finalData;
    }
    this.animate(toPos);
  }

  animate(dest) {
    if (this.tween) {
      this.tween.stop();
    }
    let coords = this.instance.position;
    var s = this;
    this.tween = new TWEEN.Tween(coords)
      .to(dest, (Math.random() * 800) + 400)
      .delay((Math.random() * 1200))
      .start();
  }
};

import { Component, OnInit } from '@angular/core';
import * as THREE from 'three.js';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
    private camera; // 相机实例
    private scene; // 场景实例
    private renderer; // 渲染器实例
    constructor() {
        //
    }

    public ngOnInit() {
        this.initScene();
        this.initLight();
        this.initCamera();
        this.initRenderer();
        this.initDom('putsangto', this.renderer.domElement);
        this.lineDemo(); // 彩色线条例子
    }

    private lineDemo() {
        let geometry = new THREE.Geometry();
        let material = new THREE.LineBasicMaterial({vertexColors: true});
        let color = new THREE.Color(0x444444);
        let color2 = new THREE.Color(0xFF0000);
        let p1 = new THREE.Vector3(-100, 0, 100);
        let p2 = new THREE.Vector3(100, 0, -100);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.colors.push(color, color2);
        let line = new THREE.Line(geometry, material, THREE.LineSegments);
        this.scene.add(line);
        this.renderer.render(this.scene, this.camera);
    }
    private meshDemo() {
        let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        let material = new THREE.MeshNormalMaterial();
        let mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        this.rotate(mesh, [0.02, 0.01, 0]);
    }
    private rotate(mesh: any, value: number[]) {
        if (value[0]) {
            mesh.rotation.x += value[0];
        }
        if (value[1]) {
            mesh.rotation.y += value[1];
        }
        if (value[2]) {
            mesh.rotation.z += value[2];
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.rotate(mesh, value));
    }
    private initScene() {
        this.scene = new THREE.Scene();
    }
    private initLight() {
        let light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 200);
        this.scene.add(light);
    }
    private initCamera() {
        this.camera = new THREE.PerspectiveCamera( 45, 600 / 500, 1, 10000 );
        this.camera.position.x = 0;
        this.camera.position.y = 1000;
        this.camera.position.z = 0;
        this.camera.up.x = 0;
        this.camera.up.y = 0;
        this.camera.up.z = 1;
        this.camera.lookAt({
            x : 0,
            y : 0,
            z : 0
        });
    }
    private initRenderer() {
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( 600, 500 );
    }
    private initDom(id: string, elem: any) {
        let dom = document.getElementById(id);
        dom.innerHTML = '';
        dom.appendChild(elem);
    }
}

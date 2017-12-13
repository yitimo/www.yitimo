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
        this.initCamera();
        this.initRenderer();
        this.initDom('putsangto', this.renderer.domElement);
        this.meshDemo(); // 旋转方块例子
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
    private initCamera() {
        this.camera = new THREE.PerspectiveCamera( 70, 600 / 500, 0.01, 10 );
        this.camera.position.z = 1;
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

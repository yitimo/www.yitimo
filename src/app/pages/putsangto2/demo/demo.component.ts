import { Component, OnInit } from '@angular/core';
import * as Three from 'three.js';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
    private camera;
    private scene;
    private renderer;
    private geometry;
    private material;
    private mesh;
    constructor() {
        //
    }

    public ngOnInit() {
        this.init();
        this.animate();
    }

    private init() {
        this.camera = new Three.PerspectiveCamera( 70, 600 / 500, 0.01, 10 );
        this.camera.position.z = 1;
        this.scene = new Three.Scene();
        this.geometry = new Three.BoxGeometry( 0.2, 0.2, 0.2 );
        this.material = new Three.MeshNormalMaterial();
        this.mesh = new Three.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
        this.renderer = new Three.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( 600, 500 );
        document.getElementById('putsangto').appendChild( this.renderer.domElement );
    }

    private animate() {
        requestAnimationFrame(() => this.animate());
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    }
}

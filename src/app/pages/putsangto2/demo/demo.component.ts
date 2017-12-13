import { Component, OnInit } from '@angular/core';
import * as THREE from 'three.js';
import * as Stats from 'stats.js';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
    private camera; // 相机实例
    private scene; // 场景实例
    private renderer; // 渲染器实例
    private stats; // 性能监控器实例
    constructor() {
        //
    }

    public ngOnInit() {
        this.baseInit('putsangto', [600, 500]);
        // this.lineDemo(); // 彩色线条例子
        this.meshDemo();
        Observable.fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 37: // 左
                this.cameraMove([10]);
                return;
                case 38: // 上
                this.cameraMove([0, 10]);
                return;
                case 39: // 右
                this.cameraMove([-10]);
                return;
                case 40: // 下
                this.cameraMove([0, -10]);
                return;
                default:
                console.log(event.keyCode);
                return;
            }
        });
    }

    private cameraMove(distance: number[]) {
        if (distance[0]) {
            this.camera.position.x += distance[0];
        }
        if (distance[1]) {
            this.camera.position.z += distance[1];
        }
        this.renderer.render(this.scene, this.camera);
    }
    private lineDemo() {
        let geometry = new THREE.Geometry();
        geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
        geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

        for ( let i = 0; i <= 20; i ++ ) {
            let line1 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x4F4F4F, opacity: 0.2 } ) );
            line1.position.z = ( i * 50 ) - 500;
            this.scene.add( line1 );

            let line2 = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x4F4F4F, opacity: 0.2 } ) );
            line2.position.x = ( i * 50 ) - 500;
            line2.rotation.y = 90 * Math.PI / 180;
            this.scene.add( line2 );
        }
        this.renderer.render(this.scene, this.camera);
    }
    private meshDemo() {
        let geometry = new THREE.CubeGeometry( 200, 100, 50, 4, 4);
        let material = new THREE.MeshLambertMaterial({color: 0x880000});
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        mesh.rotation.x = 1;
        mesh.rotation.z = 1;
        mesh.rotation.y = 1;
        this.scene.add(mesh);
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
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
        this.stats.update();
        requestAnimationFrame(() => this.rotate(mesh, value));
    }
    private baseInit(id: string, size: number[]) {
        size[0] = size[0] || 600;
        size[1] = size[1] || 500;
        // new 场景
        let scene = new THREE.Scene();
        // new 光照
        let light = new THREE.DirectionalLight(0xFF0000);
        light.position.set(0, 0, 1);
        scene.add(light);
        let light2 = new THREE.AmbientLight(0x00FF00);
        scene.add(light2);
        // new 相机
        let camera = new THREE.PerspectiveCamera( 45, size[0] / size[1], 1, 10000 );
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt({
            x : 0,
            y : 0,
            z : 0
        });
        // new 渲染器
        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( size[0], size[1] );
        renderer.setClearColor(0xFFFFFF, 1.0);
        // new 性能监控
        let stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        // 添加 dom
        let dom = document.getElementById('putsangto');
        dom.innerHTML = '';
        dom.appendChild(renderer.domElement);
        dom.appendChild(stats.domElement);
        // 赋值变量
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.stats = stats;
    }
}

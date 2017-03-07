/**
 * App.js
 *
 * The main entry point, appends Three to the DOM
 * and starts a render and animation loop
 *
 */

import Renderer from './Renderer/EffectRenderer';
import RendererStore from './stores/RendererStore';
import { Scene, PerspectiveCamera, PCFSoftShadowMap } from 'three';
import * as THREE from 'three'; // used for Orbit Controls
import Bunny from './objects/StanfordBunny/Bunny.js';
import BasicLights from './objects/BasicLights';
import TestCube from './objects/TestKnot';
import { ShaderPass, RenderPass, CopyShader, ColorifyShader, ClearPass, BasicShader, ColorTR } from './Renderer/EffectRenderer';
import { FXAAShader } from './Shaders/fxaa/fxaa';
import { SSAOShader } from './Shaders/ssao/ssao';
import { TestShader } from './Shaders/test/test';
import { Grain } from './Shaders/grain/grain';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new Renderer({antialias: false}, scene, camera);
//const OrbitControls = require('three-orbit-controls')(THREE)
const mesh = new TestCube();
const rPass = new RenderPass(scene, camera);
const FXAA = new ShaderPass(FXAAShader);
const SSAO = new ShaderPass(SSAOShader);
const test2 = new ShaderPass(TestShader);
const grain = new ShaderPass(Grain);
const copy = new ShaderPass(CopyShader);
const copy2 = new ShaderPass(CopyShader);
const copy3 = new ShaderPass(CopyShader);
const colori = new ShaderPass(ColorifyShader);
const clear = new ClearPass(0xFF00FF, 1);
const basic = new ShaderPass(BasicShader);
const c1 = new ShaderPass(TestShader);
const c2 = new ShaderPass(TestShader);
const c3 = new ShaderPass(TestShader);
const c4 = new ShaderPass(TestShader);
const c5 = new ShaderPass(TestShader);

// // Add a renderer pass
renderer.addPass(rPass);

FXAA.uniforms.resolution.value.set(window.innerWidth * 2, window.innerHeight * 2)

renderer.addPass(c5);

c4.uniforms.COLOR.value.set(0xFF00FF);
c4.uniforms.CENTRE.value.set(256 * 5, 256);
renderer.addPass(c4);

c3.uniforms.COLOR.value.set(0xFFFF00);
c3.uniforms.CENTRE.value.set(256 * 4, 256);
renderer.addPass(c3);

c2.uniforms.COLOR.value.set(0xFF0000);
c2.uniforms.CENTRE.value.set(256 * 3, 256);
renderer.addPass(c2);

c1.uniforms.COLOR.value.set(0x00FFFF);
c1.uniforms.CENTRE.value.set(256 * 2, 256);

renderer.addPass(c1);

// basic.renderToScreen = true;
// renderer.addPass(test);

// // SSAO.renderToScreen = true;
// // console.log(SSAO)
// // renderer.addPass(SSAO);

// //
// //
// // x.renderToScreen = true;
// // grain.renderToScreen = true;
// // renderer.addPass(grain);
// // // composer.addPass(new RenderPass(scene, camera));

// // SSAO.renderToScreen = true;
// // console.log(SSAO)
// // renderer.addPass(SSAO);

FXAA.renderToScreen = true;
renderer.addPass(FXAA);

// // // colori.renderToScreen = true;
// // colori.uniforms.color.value.set(0xFF00FF)
// // renderer.addPass(colori);

// // // clear.renderToScreen = true;
// renderer.addPass(clear);

// // rPass.clear = false;
// // renderer.addPass(rPass);

// // renderer.addPass(copy3);
// // copy3.uniforms.opacity.value = 0.75;

// // //copy.renderToScreen = true;
// // renderer.addPass(copy);
// // copy.uniforms.opacity.value = 0.75;
// // //console.log()

// test2.renderToScreen = true;
// renderer.addPass(test2);
// copy2.renderToScreen = true;
// renderer.addPass(copy2);

// window.composer = composer;

RendererStore.addChangeListener( (d)=>{
  const { width, height, resolution } = d;
  // set camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  // update the FXAA pass
  renderer.passes[6].uniforms.resolution.value.set(width * resolution, height * resolution);

} );
const OrbitControls = require('three-orbit-controls')(THREE)
const Bunnies = new Bunny();
const Lights = new BasicLights();

// Three JS inspector
// https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi?hl=en
// window.THREE = THREE;
// window.scene = scene;

// Renderer
renderer.renderer.shadowMap.enabled = true;
renderer.renderer.shadowMap.type = PCFSoftShadowMap;
renderer.renderer.setClearColor(0x000000,1);

// Scene
new OrbitControls(camera);
scene.add(Bunnies, Lights);
camera.position.z = 10;
camera.position.y = 1;

// DOM
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild( renderer.domElement );

// Go!
renderer.start();

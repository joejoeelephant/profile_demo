<template>
    <div class="relative">
        <canvas ref="canvasRef"></canvas>
        <div class="absolute top-0 left-0 h-screen w-screen bg-black text-white flex flex-col justify-start items-center pt-52" v-if="loaded < 100 ">
            <div class="text-3xl text-rose-700">
                loading
            </div>
            <div class="text-5xl mt-5">
                {{loaded}}%
            </div>
            <div class="w-60 h-1 bg-slate-50 mt-10">
                <div class="w-1 h-1 bg-rose-700" :style="{width: loaded +'%'}"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import * as THREE from 'three'
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
    import nightShaderVertex from './nightVertex.glsl?raw'
    import nightShaderFragment from './nightFrag.glsl?raw'
    import atmosphereVertex from './atmosVertex.glsl?raw'
    import atmosphereFragment from './atmosFrag.glsl?raw'
    definePageMeta({
        layout: "work",
    });

    const canvasRef = ref(null);
    const loaded = ref(0);
    onMounted(() => {
        // SCENE
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // CAMERAs
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(2,13,220);

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.value });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        
        // CONTROLS
        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update();

        const SunPosition = new THREE.Vector3(180,0,0);
        const sunGroup = new THREE.Group();
        function addSunLight() {
            // DIRECTIONAL LIGHT
            const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
            dirLight.intensity = 1.0;
            dirLight.position.copy(SunPosition);
            dirLight.castShadow = true
            dirLight.shadow.mapSize.width = 4096;
            dirLight.shadow.mapSize.height = 4096;
            const d = 120;
            dirLight.shadow.camera.left = - d;
            dirLight.shadow.camera.right = d;
            dirLight.shadow.camera.top = d;
            dirLight.shadow.camera.bottom = - d;
            dirLight.shadow.camera.lookAt(0, 0, 0);

            // const dLightHelper = new THREE.DirectionalLightHelper(dirLight, 2);
            // sunGroup.add(dLightHelper);
            sunGroup.add(dirLight);
            
        }
        addSunLight();
        scene.add(sunGroup);

        const axesHelper = new THREE.AxesHelper(8);
        scene.add(axesHelper);

        THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            loaded.value = Math.floor(itemsLoaded / itemsTotal * 100);
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        THREE.DefaultLoadingManager.onError = function ( url ) {
            console.log( 'There was an error loading ' + url );
        };

        THREE.DefaultLoadingManager.onLoad = function ( ) {
            console.log( 'Loading Complete!');
        };

        const textureLoader = new THREE.TextureLoader();
        const earthBaseColor = textureLoader.load('./textures/earth/earth_color_10K.png');
        const earthHeightMap = textureLoader.load('./textures/earth/topography_5k.png');
        // const earthRoughness = textureLoader.load('./textures/earth/earth_landocean_4K.png');

        const earthCloudsColor = textureLoader.load('./textures/earth/earth_clouds_8K.png');
        const earthNightColor = textureLoader.load('./textures/earth/earth_nightlights_10K.png');

        const radius = 52;

        function initSurface() {
            const geometry = new THREE.SphereGeometry(radius,128,128);
            const sphere = new THREE.Mesh(geometry, 
                new THREE.MeshStandardMaterial({ 
                    map: earthBaseColor,
                    displacementMap: earthHeightMap,
                    displacementScale: 0.16,
                    // roughnessMap: earthRoughness,
                    bumpMap: earthHeightMap,
                    bumpScale: 0.5,
                }));
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            scene.add(sphere);
        }

        function initNightSurface() {
            const geometry = new THREE.SphereGeometry(radius+0.1,128,128);
            const material = new THREE.ShaderMaterial({
                vertexShader: nightShaderVertex,
                fragmentShader: nightShaderFragment,
                uniforms: {
                    globeTexture:{
                        value: earthNightColor
                    },
                    sunPosition: {
                        value: SunPosition
                    }
                },
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            const sphere = new THREE.Mesh(
                    geometry,
                    material 
                );
            scene.add(sphere);
        }
        let cloudSphere;
        function initClouds() {
            const geometry = new THREE.SphereGeometry(radius,128,128);
            cloudSphere = new THREE.Mesh(geometry, 
                new THREE.MeshStandardMaterial( {
                    map: earthCloudsColor,
                    displacementMap: earthCloudsColor,
                    displacementScale: 0.2,
                    bumpMap: earthCloudsColor,
                    bumpScale: 0.1,
                    transparent: true,
                    blending: THREE.AdditiveBlending

                } ));
            const cloudScale = 1.005;
            cloudSphere.scale.set( cloudScale, cloudScale, cloudScale );
            scene.add(cloudSphere);
        }

        function initAtmosphere() {
            const geometry = new THREE.SphereGeometry(radius*1.02,128,128);
            const material = new THREE.ShaderMaterial({
                vertexShader: atmosphereVertex,
                fragmentShader: atmosphereFragment,
                uniforms: {
                    sunPosition: {
                        value: SunPosition
                    },
                    c: {
                        value: 0.8
                    },
                    p: {
                        value: 3.2
                    },
                    glowColor: {
                        value: new THREE.Vector3(0,0.53,1.0)
                    },
                    viewVector: {
                        value: camera.position
                    }
                },
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending
            });
            const sphere = new THREE.Mesh(
                    geometry,
                    material 
                );
            scene.add(sphere);
        }
        
        initSurface();
        initNightSurface();
        initClouds();
        initAtmosphere();

        window.addEventListener('resize', onWindowResize);

        const rotateSpeed = 0.0005;
        sunGroup.rotateZ(Math.PI / 6);
        SunPosition.applyAxisAngle(new THREE.Vector3(0,0,1), Math.PI / 6);

        function animate() {
            cloudSphere.rotateY(0.-0.00005);
            sunGroup.rotateY(rotateSpeed);
            SunPosition.applyAxisAngle(new THREE.Vector3(0,1,0), rotateSpeed);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    })
</script>

<style scoped>
    
</style>
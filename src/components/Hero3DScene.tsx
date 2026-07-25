import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parentEl = canvas.parentElement || document.getElementById("hero") || document.body;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();

    let width = parentEl.clientWidth || window.innerWidth;
    let height = parentEl.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 2. Lighting (Ambient + Key Directional + Accent Rim Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 3.0);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x0066ff, 1.5);
    fillLight.position.set(0, -5, 4);
    scene.add(fillLight);

    // 3. Parent Pivot Group for Mouse LERP & ScrollTrigger Transformations
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    // 4. Temporary Placeholder Geometry (Icosahedron + Wireframe Overlay)
    const placeholderGroup = new THREE.Group();

    const icoGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const placeholderMesh = new THREE.Mesh(icoGeo, icoMat);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(icoGeo, wireMat);
    wireMesh.scale.setScalar(1.02);

    // Decorative orbital tech rings for extra visual flair
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.35 });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;

    placeholderGroup.add(placeholderMesh, wireMesh, ringMesh, ring2Mesh);
    modelPivot.add(placeholderGroup);

    // 5. GLTFLoader: Load 3D model with auto-centering & scale-normalization
    const loader = new GLTFLoader();
    const modelPaths = [
      "/assets/hero-model.glb",
    ];

    let loadedModel: THREE.Group | null = null;

    const loadModelAtPath = (index: number) => {
      if (index >= modelPaths.length) return;
      loader.load(
        modelPaths[index],
        (gltf) => {
          const gltfScene = gltf.scene;

          // Auto-centering math
          const box = new THREE.Box3().setFromObject(gltfScene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          gltfScene.position.x = -center.x;
          gltfScene.position.y = -center.y;
          gltfScene.position.z = -center.z;

          // Scale-normalization math (fits target bounding dimension of 3.2 units)
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetSize = 3.2;
          const scaleFactor = maxDim > 0 ? targetSize / maxDim : 1.0;
          gltfScene.scale.set(scaleFactor, scaleFactor, scaleFactor);

          const modelContainer = new THREE.Group();
          modelContainer.add(gltfScene);

          // Hide placeholder & reveal GLTF model
          placeholderGroup.visible = false;
          loadedModel = modelContainer;
          modelPivot.add(modelContainer);
        },
        undefined,
        () => {
          // Fallback to next path if present
          loadModelAtPath(index + 1);
        }
      );
    };

    loadModelAtPath(0);

    // 6. Physics & Mouse LERP Smoothing
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. GSAP ScrollTrigger Binding
    const scrollObj = { progress: 0 };
    const triggerInstance = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        scrollObj.progress = self.progress;
      },
    });

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse LERP smoothing (5% factor)
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      // Base idle continuous rotation
      const idleRotY = elapsedTime * 0.25;
      const idleRotX = Math.sin(elapsedTime * 0.5) * 0.1;

      // Scroll progress transformations
      const p = scrollObj.progress;
      const scrollRotY = p * Math.PI * 1.5;
      const scrollRotX = p * 0.4;
      const scrollPosY = -p * 2.2;
      const scrollPosZ = -p * 1.8;
      const scrollScale = 1 - p * 0.3;

      // Apply combined rotations & position to pivot
      modelPivot.rotation.y = idleRotY + scrollRotY + mouse.currentX * 0.35;
      modelPivot.rotation.x = idleRotX + scrollRotX + mouse.currentY * 0.25;
      modelPivot.position.y = scrollPosY;
      modelPivot.position.z = scrollPosZ;
      modelPivot.scale.setScalar(scrollScale);

      // Animate decorative rings inside placeholder when active
      if (placeholderGroup.visible) {
        ringMesh.rotation.z = elapsedTime * 0.4;
        ring2Mesh.rotation.z = -elapsedTime * 0.3;
      }

      // Animate GLTF sub-parts if loaded
      if (loadedModel) {
        loadedModel.rotation.y = Math.sin(elapsedTime * 0.2) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Window Resize Listener
    const handleResize = () => {
      if (!canvas || !renderer || !camera) return;
      width = parentEl.clientWidth || window.innerWidth;
      height = parentEl.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      triggerInstance.kill();

      // Clean up Three.js scene memory
      icoGeo.dispose();
      icoMat.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="webgl-canvas" ref={canvasRef} className="hero-webgl-canvas" />;
}

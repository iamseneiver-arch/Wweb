// LOADER
window.onload = () => {
  gsap.to("#loader", {
    opacity: 0,
    duration: 1,
    onComplete: () => document.getElementById("loader").style.display = "none"
  });
};

// GSAP REGISTER
gsap.registerPlugin(ScrollTrigger);

// REVEAL ANIMATION
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%"
    },
    opacity: 1,
    y: 0,
    duration: 1
  });
});

/* THREE.JS SCENE */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

// GEOMETRY
const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// LIGHT
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

camera.position.z = 6;

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

/* MOUSE PARALLAX */
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  camera.position.x = x;
  camera.position.y = -y;
});

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

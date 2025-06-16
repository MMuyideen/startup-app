
// Three.js animated background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

// Create floating geometric shapes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});

const cubes = [];
for (let i = 0; i < 50; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (Math.random() - 0.5) * 100;
    cube.position.y = (Math.random() - 0.5) * 100;
    cube.position.z = (Math.random() - 0.5) * 100;
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    scene.add(cube);
    cubes.push(cube);
}

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        cube.position.y += Math.sin(Date.now() * 0.001 + cube.position.x) * 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Interactive particles on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = Math.random() * 6 + 2 + 'px';
    particle.style.height = particle.style.width;
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Demo modal functionality
function showDemo() {
    alert('🚀 Demo Request Submitted!\n\nThank you for your interest in LogiTech AI. Our team will contact you within 24 hours to schedule a personalized demonstration of our AI-powered logistics platform.\n\nExpected ROI: 40% cost reduction\nImplementation time: 2-4 weeks\nSupport: 24/7 dedicated team');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Dynamic greeting based on time
const currentHour = new Date().getHours();
let greeting = 'Welcome to';
if (currentHour < 12) greeting = 'Good Morning! Welcome to';
else if (currentHour < 18) greeting = 'Good Afternoon! Welcome to';
else greeting = 'Good Evening! Welcome to';

// Add dynamic content
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero .subtitle');
    heroSubtitle.textContent = `${greeting} the future of intelligent logistics`;
}, 2000);

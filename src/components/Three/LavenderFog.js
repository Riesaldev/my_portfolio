import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function LavenderFog() {
    const mountRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const clockRef = useRef(null);
    const trailRef = useRef([]);
    const animationIdRef = useRef(null);

    // Configurar y limpiar Three.js
    useEffect(() => {
        // Inicialización del componente LavenderFog
        
        // Esperar a que el DOM esté listo
        if (!mountRef.current) {
            return;
        }

        // Inicializar referencias
        sceneRef.current = new THREE.Scene();
        clockRef.current = new THREE.Clock();
        trailRef.current = [];

        // Variables para Three.js (alcance local)
        const scene = sceneRef.current;
        const clock = clockRef.current;
        const mouseTrail = trailRef.current;
        const maxTrailLength = 20;
        const trailLifetime = 1.0;
        
        // Configuración del cursor y el rastro
        const cursorRadius = 0.3; // Radio del halo principal
        
        // Mouse (con posición segura inicial)
        const mouse = new THREE.Vector2(0.5, 0.5);
        
        // Configuración de cámara
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;
        
        // Renderer con comprobaciones de seguridad
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        rendererRef.current = renderer;
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Limpiar cualquier canvas existente antes de añadir uno nuevo
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
        
        // Material con shader
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0.0 },
                u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
                u_mouseTrail: { value: Array(maxTrailLength).fill().map(() => new THREE.Vector3(0.5, 0.5, -1.0)) },
                u_trailLength: { value: 0 },
                u_cursorRadius: { value: cursorRadius }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform vec2 u_mouse;
                uniform vec3 u_mouseTrail[20];
                uniform int u_trailLength;
                uniform float u_cursorRadius;
                varying vec2 vUv;
                
                // Funciones de ruido y utilidad
                vec2 hash(vec2 p) {
                    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
                    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
                }
                
                // Ruido de Simplex
                float noise(in vec2 p) {
                    const float K1 = 0.366025404;
                    const float K2 = 0.211324865;
                    
                    vec2 i = floor(p + (p.x + p.y) * K1);
                    vec2 a = p - i + (i.x + i.y) * K2;
                    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec2 b = a - o + K2;
                    vec2 c = a - 1.0 + 2.0 * K2;
                    
                    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
                    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
                    
                    return dot(n, vec3(70.0));
                }
                
                // Ruido fractal con ajuste de contraste
                float fbm(vec2 uv, float contrast) {
                    float f = 0.0;
                    float amplitude = 0.5;
                    float frequency = 1.0;
                    
                    for (int i = 0; i < 4; i++) { // Reducir a 4 octavas para patrones más grandes
                        f += amplitude * noise(frequency * uv);
                        frequency *= 2.0;
                        amplitude *= 0.5;
                    }
                    
                    f = f * 0.5 + 0.5; // Normalizar a 0-1
                    
                    // Aplicar ajuste de contraste
                    f = pow(f, contrast); // Más contraste para patrones más definidos
                    
                    return f;
                }
                
                void main() {
                    // Corrección de aspecto para círculos perfectos
                    float aspectRatio = u_resolution.x / u_resolution.y;
                    
                    // Ajustar coordenadas
                    vec2 uv = vUv;
                    vec2 mousePos = u_mouse;
                    
                    // Ajustar coordenada X para mantener forma circular
                    vec2 aspectUv = uv;
                    aspectUv.x = (uv.x - 0.5) * aspectRatio + 0.5;
                    mousePos.x = (mousePos.x - 0.5) * aspectRatio + 0.5;
                    
                    // Tiempo base para animaciones
                    float t = u_time * 0.15; // Velocidad base
                    
                    // TODAS LAS CAPAS SE MUEVEN DE IZQUIERDA A DERECHA
                    
                    // Colores muy diferenciados para cada capa
                    vec3 color1 = vec3(0.9, 0.6, 1.0);   // Lavanda muy claro, casi rosado
                    vec3 color2 = vec3(0.7, 0.3, 0.9);   // Púrpura medio brillante
                    vec3 color3 = vec3(0.5, 0.1, 0.7);   // Morado medio
                    vec3 color4 = vec3(0.3, 0.0, 0.4);   // Morado muy oscuro
                    
                    // Capa 1 - Primer plano (muy rápida)
                    vec2 uv1 = uv * 2.5;
                    // Movimiento principal de izquierda a derecha, velocidad rápida
                    uv1.x -= t * 0.7; // Negativo porque se mueve el sistema de coordenadas
                    // Ligero movimiento vertical para que no sea rígido
                    uv1.y += sin(t * 0.8) * 0.2; 
                    float noise1 = fbm(uv1, 1.8);
                    
                    // Capa 2 - Plano medio (velocidad media)
                    vec2 uv2 = uv * 1.5;
                    // Movimiento principal de izquierda a derecha, velocidad media
                    uv2.x -= t * 0.3; // También negativo
                    // Ligeras ondulaciones
                    uv2.y += sin(t * 0.5) * 0.15;
                    float noise2 = fbm(uv2, 1.5);
                    
                    // Capa 3 - Fondo (lenta)
                    vec2 uv3 = uv * 0.8;
                    // Movimiento lento de izquierda a derecha
                    uv3.x -= t * 0.1; // Negativo para mismo sentido
                    // Muy poco movimiento vertical
                    uv3.y += sin(t * 0.3) * 0.08;
                    float noise3 = fbm(uv3, 1.3);
                    
                    // Capa 4 - Detalles (ultrarápida pero sutil)
                    vec2 uv4 = uv * 4.0;
                    // Movimiento rápido en misma dirección
                    uv4.x -= t * 1.2; // Negativo
                    // Fluctuaciones mínimas
                    uv4.y += sin(t * 2.0) * 0.05;
                    float noise4 = fbm(uv4, 1.2);
                    
                    // Combinar capas con transiciones suaves pero colores contrastados
                    vec3 baseColor = mix(color4, color3, noise3);
                    baseColor = mix(baseColor, color2, noise2 * 0.8);
                    baseColor = mix(baseColor, color1, noise1 * 0.7);
                    baseColor = mix(baseColor, color2, noise4 * 0.5);
                    
                    // Efecto del cursor
                    float cursorDistance = distance(aspectUv, mousePos);
                    float cursorEffect = smoothstep(u_cursorRadius, 0.0, cursorDistance);
                    
                    // Efecto de estela
                    float trailEffect = 0.0;
                    for (int i = 0; i < 20; i++) {
                        if (i >= u_trailLength) break;
                        
                        vec3 trailPoint = u_mouseTrail[i];
                        vec2 trailPos = trailPoint.xy;
                        float trailAge = trailPoint.z;
                        
                        trailPos.x = (trailPos.x - 0.5) * aspectRatio + 0.5;
                        
                        float trailDistance = distance(aspectUv, trailPos);
                        float fadeWithAge = 1.0 - trailAge;
                        float trailRadius = u_cursorRadius;
                        float pointEffect = smoothstep(trailRadius, 0.0, trailDistance) * fadeWithAge;
                        
                        trailEffect = max(trailEffect, pointEffect);
                    }
                    
                    // Combinar efectos
                    float totalEffect = max(cursorEffect, trailEffect);
                    float opacity = 0.7 * (1.0 - totalEffect);
                    
                    // Circulo transparente en cursor
                    if (cursorDistance < 0.05) {
                        opacity = 0.0;
                    }
                    
                    gl_FragColor = vec4(baseColor, opacity);
                }
            `,
            transparent: true
        });
        
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Función de animación (con comprobaciones de seguridad)
        function animate() {
            if (!scene || !renderer || !material || !clockRef.current) {
                return;
            }
            
            animationIdRef.current = requestAnimationFrame(animate);
            
            try {
                const currentTime = clockRef.current.getElapsedTime();
                
                // Actualizar tiempo
                material.uniforms.u_time.value = currentTime;
                
                // Actualizar estela
                if (mouseTrail && mouseTrail.length > 0) {
                    while (mouseTrail.length > 0 && 
                           currentTime - mouseTrail[0].time > trailLifetime) {
                        mouseTrail.shift();
                    }
                }
                
                const trailArray = material.uniforms.u_mouseTrail.value;
                for (let i = 0; i < maxTrailLength; i++) {
                    if (mouseTrail && i < mouseTrail.length) {
                        const trailPoint = mouseTrail[mouseTrail.length - 1 - i];
                        const age = (currentTime - trailPoint.time) / trailLifetime;
                        trailArray[i].set(trailPoint.x, trailPoint.y, age);
                    } else {
                        trailArray[i].set(0.5, 0.5, -1.0);
                    }
                }
                
                material.uniforms.u_trailLength.value = mouseTrail ? mouseTrail.length : 0;
                
                // Renderizar
                renderer.render(scene, camera);
            } catch (error) {
                console.error("Error en la animación:", error);
                cancelAnimationFrame(animationIdRef.current);
            }
        }
        
        // Manejar eventos del mouse
        function handleMouseMove(event) {
            if (!material || !material.uniforms || !clockRef.current || !mouseTrail) {
                return;
            }
            
            try {
                const x = event.clientX / window.innerWidth;
                const y = 1.0 - (event.clientY / window.innerHeight);
                
                mouse.set(x, y);
                material.uniforms.u_mouse.value.copy(mouse);
                
                const currentTime = clockRef.current.getElapsedTime();
                mouseTrail.push({ 
                    x: x, 
                    y: y, 
                    time: currentTime
                });
                
                if (mouseTrail.length > maxTrailLength) {
                    mouseTrail.shift();
                }
            } catch (error) {
                console.error("Error en el evento de mouse:", error);
            }
        }
        
        // Manejar resize
        function handleResize() {
            if (!renderer || !material || !material.uniforms) {
                return;
            }
            
            try {
                const width = window.innerWidth;
                const height = window.innerHeight;
                renderer.setSize(width, height);
                material.uniforms.u_resolution.value.set(width, height);
            } catch (error) {
                console.error("Error en el resize:", error);
            }
        }
        
        clock.start();
        animate();
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        
        setIsInitialized(true);
        
        return () => {
            // Cleanup al desmontar el componente
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;
            }
            
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            
            if (mountRef.current) {
                while (mountRef.current.firstChild) {
                    mountRef.current.removeChild(mountRef.current.firstChild);
                }
            }
            
            sceneRef.current = null;
            clockRef.current = null;
            trailRef.current = [];
            
            setIsInitialized(false);
        };
    }, []);

    return (
        <div 
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 10,
                pointerEvents: 'none'
            }}
        />
    );
}
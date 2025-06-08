import React, { useEffect, useRef, useState } from 'react';

// PlayCanvas TypeScript declarations
declare global {
  interface Window {
    pc: any;
  }
}

// PlayCanvas Software Development Animation Component
const PlayCanvasSoftwareAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Load PlayCanvas library and initialize
    const script = document.createElement('script');
    script.src = 'https://code.playcanvas.com/playcanvas-stable.min.js';
    script.onload = () => {
      console.log('PlayCanvas loaded successfully');
      initializePlayCanvas();
    };
    script.onerror = () => {
      console.error('Failed to load PlayCanvas');
    };
    document.head.appendChild(script);

    const initializePlayCanvas = () => {
      try {
        console.log('Initializing PlayCanvas...');
        
        // @ts-ignore - PlayCanvas is loaded dynamically
        const app = new (window as any).pc.Application(canvas, {
          mouse: new (window as any).pc.Mouse(canvas),
          touch: new (window as any).pc.TouchDevice(canvas),
          keyboard: new (window as any).pc.Keyboard(window),
        });

        appRef.current = app;
        app.start();

        // Configure canvas
        app.setCanvasFillMode((window as any).pc.FILLMODE_FILL_WINDOW);
        app.setCanvasResolution((window as any).pc.RESOLUTION_AUTO);

        // Create camera entity
        const camera = new (window as any).pc.Entity('camera');
        camera.addComponent('camera', {
          clearColor: new (window as any).pc.Color(0.05, 0.05, 0.15),
          fov: 60,
        });
        camera.setPosition(0, 5, 12);
        camera.lookAt(0, 0, 0);
        app.root.addChild(camera);

        // Create lighting setup
        const directionalLight = new (window as any).pc.Entity('directional-light');
        directionalLight.addComponent('light', {
          type: 'directional',
          color: new (window as any).pc.Color(0.8, 0.9, 1.0),
          intensity: 2,
          castShadows: true,
        });
        directionalLight.setEulerAngles(45, 30, 0);
        app.root.addChild(directionalLight);

        const pointLight1 = new (window as any).pc.Entity('point-light-1');
        pointLight1.addComponent('light', {
          type: 'point',
          color: new (window as any).pc.Color(0.2, 0.8, 1.0),
          intensity: 1.5,
          range: 15,
        });
        pointLight1.setPosition(-5, 5, 3);
        app.root.addChild(pointLight1);

        const pointLight2 = new (window as any).pc.Entity('point-light-2');
        pointLight2.addComponent('light', {
          type: 'point',
          color: new (window as any).pc.Color(1.0, 0.4, 0.8),
          intensity: 1.2,
          range: 12,
        });
        pointLight2.setPosition(3, 2, -3);
        app.root.addChild(pointLight2);

        // Helper function to create materials
        const createMaterial = (options: any) => {
          const material = new (window as any).pc.StandardMaterial();
          if (options.diffuse) material.diffuse = options.diffuse;
          if (options.emissive) material.emissive = options.emissive;
          if (options.metalness !== undefined) material.metalness = options.metalness;
          if (options.shininess !== undefined) material.shininess = options.shininess;
          material.update();
          return material;
        };

        // Create central core sphere
        const core = new (window as any).pc.Entity('core');
        core.addComponent('render', {
          type: 'sphere',
          material: createMaterial({
            diffuse: new (window as any).pc.Color(0.1, 0.3, 0.8),
            emissive: new (window as any).pc.Color(0.05, 0.15, 0.4),
            metalness: 0.8,
            shininess: 90,
          })
        });
        app.root.addChild(core);

        // Create floating code blocks representing different technologies
        const codeBlocks = [
          { position: [-3, 2, 0], text: 'React', color: new (window as any).pc.Color(0.38, 0.85, 0.98) },
          { position: [3, 2, 0], text: 'Node.js', color: new (window as any).pc.Color(0.41, 0.63, 0.39) },
          { position: [0, 3, -2], text: 'API', color: new (window as any).pc.Color(0.96, 0.62, 0.07) },
          { position: [-2, 0, 2], text: 'DB', color: new (window as any).pc.Color(0.55, 0.36, 0.96) },
          { position: [2, 0, 2], text: 'Cloud', color: new (window as any).pc.Color(0.02, 0.71, 0.83) }
        ];

        codeBlocks.forEach((block, i) => {
          const entity = new (window as any).pc.Entity(`code-block-${i}`);
          
          // Create emissive color manually instead of using clone().scale()
          const emissiveColor = new (window as any).pc.Color(
            block.color.r * 0.3,
            block.color.g * 0.3,
            block.color.b * 0.3
          );
          
          entity.addComponent('render', {
            type: 'box',
            material: createMaterial({
              diffuse: block.color,
              emissive: emissiveColor,
              metalness: 0.5,
              shininess: 60,
            })
          });
          entity.setPosition(block.position[0], block.position[1], block.position[2]);
          entity.setLocalScale(0.8, 0.8, 0.8);
          app.root.addChild(entity);
        });

        // Create network nodes in circular formation
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const entity = new (window as any).pc.Entity(`network-node-${i}`);
          
          // Create colors using hue values
          const hue = i * 45;
          const diffuseColor = new (window as any).pc.Color();
          const emissiveColor = new (window as any).pc.Color();
          
          // Set HSL colors manually
          diffuseColor.fromString(`hsl(${hue}, 70%, 60%)`);
          emissiveColor.fromString(`hsl(${hue}, 70%, 30%)`);
          
          entity.addComponent('render', {
            type: 'sphere',
            material: createMaterial({
              diffuse: diffuseColor,
              emissive: emissiveColor,
              metalness: 0.7,
              shininess: 80,
            })
          });
          entity.setPosition(
            Math.cos(angle) * 4,
            Math.sin(i * Math.PI / 8) * 2,
            Math.sin(angle) * 4
          );
          entity.setLocalScale(0.3, 0.3, 0.3);
          app.root.addChild(entity);
        }

        // Create data stream cylinders
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const entity = new (window as any).pc.Entity(`data-stream-${i}`);
          entity.addComponent('render', {
            type: 'cylinder',
            material: createMaterial({
              diffuse: new (window as any).pc.Color(0.1, 0.9, 0.3),
              emissive: new (window as any).pc.Color(0.05, 0.45, 0.15),
              metalness: 0.3,
              shininess: 40,
            })
          });
          entity.setPosition(
            Math.cos(angle) * 5,
            Math.sin(i * 0.5) * 2,
            Math.sin(angle) * 5
          );
          entity.setLocalScale(0.1, 2, 0.1);
          app.root.addChild(entity);
        }

        // Create orbital rings with rotating elements
        for (let ring = 1; ring <= 3; ring++) {
          const ringGroup = new (window as any).pc.Entity(`orbital-ring-${ring}`);
          app.root.addChild(ringGroup);

          const itemCount = ring * 4 + 4;
          for (let i = 0; i < itemCount; i++) {
            const angle = (i / itemCount) * Math.PI * 2;
            const entity = new (window as any).pc.Entity(`ring-${ring}-item-${i}`);
            entity.addComponent('render', {
              type: 'box',
              material: createMaterial({
                diffuse: new (window as any).pc.Color(0.9, 0.1 + ring * 0.2, 0.6),
                emissive: new (window as any).pc.Color(0.3, 0.05, 0.2),
                metalness: 0.6,
                shininess: 70,
              })
            });
            entity.setPosition(
              Math.cos(angle) * (ring * 2 + 4),
              0,
              Math.sin(angle) * (ring * 2 + 4)
            );
            entity.setLocalScale(0.2, 0.2, 0.2);
            ringGroup.addChild(entity);
          }
        }

        // Create particle cloud
        for (let i = 0; i < 50; i++) {
          const entity = new (window as any).pc.Entity(`particle-${i}`);
          entity.addComponent('render', {
            type: 'sphere',
            material: createMaterial({
              diffuse: new (window as any).pc.Color(Math.random(), Math.random(), 1),
              emissive: new (window as any).pc.Color(0.2, 0.2, 0.8),
              metalness: 0.4,
              shininess: 50,
            })
          });
          entity.setPosition(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 20
          );
          entity.setLocalScale(0.05, 0.05, 0.05);
          app.root.addChild(entity);
        }

        console.log('PlayCanvas scene created successfully');

        // Animation system
        let time = 0;
        app.on('update', (dt: number) => {
          time += dt;

          // Animate central core with pulsing and rotation
          const coreScale = 1 + Math.sin(time * 2) * 0.1;
          core.setLocalScale(coreScale, coreScale, coreScale);
          core.rotate(0.5 * dt * 57.3, 1 * dt * 57.3, 0);

          // Animate floating code blocks
          codeBlocks.forEach((blockData, i) => {
            const entity = app.root.findByName(`code-block-${i}`);
            if (entity) {
              const baseY = blockData.position[1];
              const newY = baseY + Math.sin(time * 2 + i * 0.5) * 0.5;
              entity.setPosition(blockData.position[0], newY, blockData.position[2]);
              entity.rotate(0, 30 * dt, 0);
            }
          });

          // Animate network nodes with pulsing
          for (let i = 0; i < 8; i++) {
            const entity = app.root.findByName(`network-node-${i}`);
            if (entity) {
              const scale = 0.3 + Math.sin(time * 4 + i * 0.3) * 0.1;
              entity.setLocalScale(scale, scale, scale);
            }
          }

          // Animate data streams with dynamic height and rotation
          for (let i = 0; i < 12; i++) {
            const entity = app.root.findByName(`data-stream-${i}`);
            if (entity) {
              const height = 2 + Math.sin(time * 6 + i * 0.2) * 1.5;
              entity.setLocalScale(0.1, height, 0.1);
              entity.rotate(0, 60 * dt, 0);
            }
          }

          // Animate orbital rings
          for (let ring = 1; ring <= 3; ring++) {
            const ringGroup = app.root.findByName(`orbital-ring-${ring}`);
            if (ringGroup) {
              ringGroup.rotate(0, (1 / ring) * 10 * dt, ring * 3 * dt);
            }
          }

          // Animate particles with twinkling effect
          for (let i = 0; i < 50; i++) {
            const entity = app.root.findByName(`particle-${i}`);
            if (entity) {
              const scale = 0.05 + Math.sin(time * 5 + i * 0.1) * 0.03;
              entity.setLocalScale(scale, scale, scale);
            }
          }

          // Orbit camera around the scene
          const radius = 12;
          const camX = Math.sin(time * 0.2) * radius;
          const camZ = Math.cos(time * 0.2) * radius;
          camera.setPosition(camX, 5, camZ);
          camera.lookAt(0, 0, 0);
        });

        console.log('PlayCanvas animation system started');
        
      } catch (error) {
        console.error('Error initializing PlayCanvas:', error);
      }
    };

    return () => {
      if (appRef.current) {
        appRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    />
  );
};

const BBGlobalSolutionsLanding: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sections = [
    {
      title: "BB Soluciones Globales",
      subtitle: "Socios Tecnológicos",
      description: "Desarrollo Web • Soluciones Cloud • Integración IA"
    },
    {
      title: "Desarrollo de Software",
      subtitle: "Soluciones Modernas",
      description: "Full-Stack • API • Base de Datos • Arquitectura"
    },
    {
      title: "Innovación a Escala",
      subtitle: "Nivel Empresarial",
      description: "Escalable • Seguro • Rendimiento • Calidad"
    },
    {
      title: "Alcance Global",
      subtitle: "Servicios Mundiales",
      description: "40+ Países • Soporte 24/7 • Métodos Ágiles"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection(prev => (prev + 1) % sections.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* PlayCanvas 3D Animation Background */}
      <PlayCanvasSoftwareAnimation />
      
      {/* Minimal Top Header */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-2 shadow-lg shadow-cyan-500/20">
          <h1 className="text-lg font-light text-cyan-300 neon-text-cyan">
            {sections[currentSection].title}
          </h1>
          <p className="text-xs text-blue-300/80 font-light neon-text-blue">
            {sections[currentSection].subtitle}
          </p>
        </div>
      </div>

      {/* Minimal Service Indicators */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex gap-2">
          {['💻', '☁️', '🤖', '🌐'].map((icon, index) => (
            <div 
              key={index}
              className="w-8 h-8 bg-black/20 backdrop-blur-sm border border-purple-400/30 rounded-lg flex items-center justify-center text-sm hover:bg-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 neon-glow-purple"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Center Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          {/* Compact Title */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-light text-cyan-200 mb-2 transition-all duration-1000 neon-text-cyan-bright">
              {sections[currentSection].description}
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto neon-line"></div>
          </div>
        </div>
      </div>

      {/* Minimal Bottom Actions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          {/* Compact CTA Buttons */}
          <button className="px-4 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-400/40 text-cyan-300 text-sm font-light rounded-lg hover:bg-cyan-500/20 transition-all duration-300 pointer-events-auto neon-button-cyan">
            Iniciar Proyecto
          </button>
          <button className="px-4 py-2 bg-transparent border border-purple-400/40 text-purple-300 text-sm font-light rounded-lg hover:bg-purple-500/10 transition-all duration-300 pointer-events-auto neon-button-purple">
            Portafolio
          </button>
          
          {/* Minimal Progress Indicators */}
          <div className="flex gap-1 ml-4">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto ${
                  index === currentSection 
                    ? 'bg-cyan-400 scale-125 neon-dot-active' 
                    : 'bg-blue-400/20 hover:bg-blue-400/60 neon-dot'
                }`}
                onClick={() => setCurrentSection(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Side Info */}
      <div className="absolute left-6 bottom-6 z-20">
        <div className="bg-black/20 backdrop-blur-sm border border-blue-400/30 rounded-lg px-3 py-2 max-w-xs shadow-lg shadow-blue-500/20">
          <p className="text-xs text-blue-300/80 font-light leading-relaxed neon-text-blue">
            Visualización avanzada 3D de desarrollo de software impulsada por PlayCanvas
          </p>
        </div>
      </div>

      {/* Subtle Floating Particles (Reduced) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <div className="w-1 h-1 bg-cyan-400/20 rounded-full neon-particle"></div>
          </div>
        ))}
      </div>

      {/* Neon Tron-style CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .neon-text-cyan {
            text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff;
          }
          
          .neon-text-cyan-bright {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff;
          }
          
          .neon-text-blue {
            text-shadow: 0 0 5px #0080ff, 0 0 10px #0080ff;
          }
          
          .neon-button-cyan {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
          }
          .neon-button-cyan:hover {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.1);
            text-shadow: 0 0 10px #00ffff;
          }
          
          .neon-button-purple {
            box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
          }
          .neon-button-purple:hover {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.5), inset 0 0 10px rgba(147, 51, 234, 0.1);
            text-shadow: 0 0 10px #9333ea;
          }
          
          .neon-glow-purple:hover {
            box-shadow: 0 0 15px rgba(147, 51, 234, 0.6);
          }
          
          .neon-line {
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
          }
          
          .neon-dot {
            box-shadow: 0 0 5px rgba(96, 165, 250, 0.4);
          }
          
          .neon-dot-active {
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
          }
          
          .neon-particle {
            box-shadow: 0 0 5px #00ffff;
          }
          
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px); opacity: 0.5; }
            50% { transform: translateY(-10px); opacity: 0.8; }
          }
          .animate-gentle-float {
            animation: gentleFloat 4s ease-in-out infinite;
          }
          
          /* Smooth transitions for all elements */
          * {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        `
      }} />
    </div>
  );
};

export default BBGlobalSolutionsLanding; 
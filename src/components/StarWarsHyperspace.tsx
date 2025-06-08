import React, { useEffect, useRef, useState } from 'react';

// PlayCanvas TypeScript declarations
declare global {
  interface Window {
    pc: any;
  }
}

// Star Wars Hyperspace Animation Component
const StarWarsHyperspaceAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Load PlayCanvas library and initialize
    const script = document.createElement('script');
    script.src = 'https://code.playcanvas.com/playcanvas-stable.min.js';
    script.onload = () => {
      console.log('PlayCanvas loaded for Star Wars Hyperspace');
      initializeHyperspace();
    };
    script.onerror = () => {
      console.error('Failed to load PlayCanvas');
    };
    document.head.appendChild(script);

    const initializeHyperspace = () => {
      try {
        console.log('Initializing Star Wars Hyperspace...');
        
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

        // Create camera
        const camera = new (window as any).pc.Entity('camera');
        camera.addComponent('camera', {
          clearColor: new (window as any).pc.Color(0.02, 0.02, 0.1),
          fov: 75,
        });
        camera.setPosition(0, 0, 0);
        app.root.addChild(camera);

        // Create ambient light
        const ambientLight = new (window as any).pc.Entity('ambient-light');
        ambientLight.addComponent('light', {
          type: 'directional',
          color: new (window as any).pc.Color(0.2, 0.3, 1.0),
          intensity: 0.3,
        });
        app.root.addChild(ambientLight);

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

        // Create star field
        const stars: any[] = [];
        const starCount = 800;
        
        for (let i = 0; i < starCount; i++) {
          // Create star entity
          const star = new (window as any).pc.Entity(`star-${i}`);
          
          // Random position in space
          const radius = 50 + Math.random() * 200;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          
          star.setPosition(x, y, z);
          
          // Create star as small sphere
          star.addComponent('render', {
            type: 'sphere',
            material: createMaterial({
              diffuse: new (window as any).pc.Color(1, 1, 1),
              emissive: new (window as any).pc.Color(0.8, 0.9, 1.0),
              metalness: 0,
              shininess: 100,
            })
          });
          
          const size = 0.1 + Math.random() * 0.2;
          star.setLocalScale(size, size, size);
          
          app.root.addChild(star);
          
          // Store initial position and properties
          stars.push({
            entity: star,
            initialPos: { x, y, z },
            speed: 0,
            trailLength: 0
          });
        }

        // Create hyperspace tunnel effect
        const tunnelRings: any[] = [];
        for (let i = 0; i < 20; i++) {
          const ring = new (window as any).pc.Entity(`tunnel-ring-${i}`);
          
          // Create ring of light particles
          for (let j = 0; j < 24; j++) {
            const particle = new (window as any).pc.Entity(`ring-${i}-particle-${j}`);
            const angle = (j / 24) * Math.PI * 2;
            const ringRadius = 8 + i * 2;
            
            particle.setPosition(
              Math.cos(angle) * ringRadius,
              Math.sin(angle) * ringRadius,
              -i * 15 - 50
            );
            
            particle.addComponent('render', {
              type: 'sphere',
              material: createMaterial({
                diffuse: new (window as any).pc.Color(0.3, 0.6, 1.0),
                emissive: new (window as any).pc.Color(0.2, 0.4, 0.8),
                metalness: 0,
                shininess: 80,
              })
            });
            
            particle.setLocalScale(0.3, 0.3, 0.3);
            ring.addChild(particle);
          }
          
          app.root.addChild(ring);
          tunnelRings.push(ring);
        }

        // Create central ship cockpit frame
        const cockpitFrame = new (window as any).pc.Entity('cockpit-frame');
        
        // Create frame edges
        for (let i = 0; i < 4; i++) {
          const edge = new (window as any).pc.Entity(`frame-edge-${i}`);
          edge.addComponent('render', {
            type: 'box',
            material: createMaterial({
              diffuse: new (window as any).pc.Color(0.1, 0.1, 0.1),
              emissive: new (window as any).pc.Color(0.05, 0.05, 0.2),
              metalness: 0.8,
              shininess: 90,
            })
          });
          
          const angle = (i / 4) * Math.PI * 2;
          const frameRadius = 12;
          edge.setPosition(
            Math.cos(angle) * frameRadius,
            Math.sin(angle) * frameRadius,
            2
          );
          edge.setLocalScale(0.2, 4, 0.2);
          cockpitFrame.addChild(edge);
        }
        
        app.root.addChild(cockpitFrame);

        console.log('Star Wars Hyperspace scene created successfully');

        // Animation system
        let time = 0;
        let hyperspaceSpeed = 0;
        let acceleration = 0.01;
        let maxSpeed = 15;

        app.on('update', (dt: number) => {
          time += dt;

          // Gradually increase hyperspace speed
          if (hyperspaceSpeed < maxSpeed) {
            hyperspaceSpeed += acceleration;
            acceleration *= 1.002; // Exponential acceleration like Star Wars
          }

          // Animate stars with hyperspace effect
          stars.forEach((starData, index) => {
            const star = starData.entity;
            const pos = star.getPosition();
            
            // Move stars towards camera
            pos.z += hyperspaceSpeed * dt * 10;
            
            // Create streaking effect by scaling stars
            if (hyperspaceSpeed > 2) {
              const streakLength = Math.min(hyperspaceSpeed * 2, 20);
              star.setLocalScale(0.1, 0.1, streakLength);
              
              // Change color to blue-white for hyperspace
              const intensity = Math.min(hyperspaceSpeed / maxSpeed, 1);
              star.render.material.emissive = new (window as any).pc.Color(
                0.5 + intensity * 0.5,
                0.7 + intensity * 0.3,
                1.0
              );
            }
            
            // Reset star if it passes camera
            if (pos.z > 10) {
              // Reset to far distance
              const radius = 50 + Math.random() * 200;
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.random() * Math.PI;
              
              pos.x = radius * Math.sin(phi) * Math.cos(theta);
              pos.y = radius * Math.sin(phi) * Math.sin(theta);
              pos.z = -radius;
              
              // Reset scale
              const size = 0.1 + Math.random() * 0.2;
              star.setLocalScale(size, size, size);
              
              // Reset color
              star.render.material.emissive = new (window as any).pc.Color(0.8, 0.9, 1.0);
            }
            
            star.setPosition(pos.x, pos.y, pos.z);
          });

          // Animate tunnel rings
          tunnelRings.forEach((ring, index) => {
            const pos = ring.getPosition();
            pos.z += hyperspaceSpeed * dt * 8;
            
            // Pulsing effect
            const pulse = 1 + Math.sin(time * 10 + index * 0.5) * 0.2;
            ring.setLocalScale(pulse, pulse, 1);
            
            // Reset ring position
            if (pos.z > 50) {
              pos.z = -300;
            }
            
            ring.setPosition(pos.x, pos.y, pos.z);
          });

          // Animate cockpit frame vibration (like Star Wars)
          const vibration = hyperspaceSpeed > 5 ? 0.1 * Math.sin(time * 50) : 0;
          cockpitFrame.setPosition(vibration, vibration * 0.5, 2);
          
          // Rotate frame slightly
          cockpitFrame.rotate(0, 0, dt * 2);

          // Camera shake at high speeds
          if (hyperspaceSpeed > 8) {
            const shake = 0.05 * Math.sin(time * 40);
            camera.setPosition(shake, shake * 0.7, shake * 0.3);
          }
        });

        console.log('Star Wars Hyperspace animation system started');
        
      } catch (error) {
        console.error('Error initializing Star Wars Hyperspace:', error);
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

const StarWarsHyperspace: React.FC = () => {
  useEffect(() => {
    // Start hyperspace animation immediately
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Star Wars Hyperspace Animation Background */}
      <StarWarsHyperspaceAnimation />
      
      {/* Minimal Star Wars UI */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-black/40 backdrop-blur-sm border border-blue-400/30 rounded-lg px-4 py-2 shadow-lg shadow-blue-500/20">
          <h1 className="text-lg font-light text-blue-300 starwars-text">
            SALTO AL HIPERESPACIO
          </h1>
          <p className="text-xs text-cyan-300/80 font-light starwars-text-small">
            Velocidad de la Luz Activada
          </p>
        </div>
      </div>

      {/* Speed indicator */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse starwars-glow"></div>
            <span className="text-sm text-cyan-300 font-mono starwars-text">HYPERSPACE</span>
          </div>
        </div>
      </div>

      {/* Center targeting computer */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-32 h-32 border border-cyan-400/40 rounded-full starwars-target">
          <div className="w-16 h-16 border border-cyan-400/60 rounded-full m-auto mt-8 starwars-target-inner"></div>
          <div className="w-1 h-16 bg-cyan-400/60 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="w-16 h-1 bg-cyan-400/60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/40 backdrop-blur-sm border border-blue-400/30 rounded-lg px-4 py-2">
          <p className="text-xs text-blue-300/80 font-mono starwars-text">
            SISTEMA DE NAVEGACIÓN ESTELAR ACTIVO
          </p>
        </div>
      </div>

      {/* Star Wars style CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .starwars-text {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
            font-family: 'Courier New', monospace;
            letter-spacing: 2px;
          }
          
          .starwars-text-small {
            text-shadow: 0 0 5px #00ffff;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
          }
          
          .starwars-glow {
            box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
          }
          
          .starwars-target {
            animation: rotate 10s linear infinite;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          }
          
          .starwars-target-inner {
            animation: rotate 5s linear infinite reverse;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes hyperspace-glow {
            0%, 100% { 
              box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
            }
            50% { 
              box-shadow: 0 0 25px rgba(0, 255, 255, 0.8), 0 0 50px rgba(0, 255, 255, 0.4);
            }
          }
        `
      }} />
    </div>
  );
};

export default StarWarsHyperspace; 
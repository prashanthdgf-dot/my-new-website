import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
}

interface Line3D {
  a: number; // index of point A
  b: number; // index of point B
  thickness?: number;
  opacityMultiplier?: number;
}

export default function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [showGalleryLink, setShowGalleryLink] = useState(true);

  // Constants
  const CLOUDINARY_COLLECTION_URL = "https://collection.cloudinary.com/dnnfzhrbd/52641006a673e0af42ec9820f5a148d8";

  useEffect(() => {
    // 1. Scroll tracking
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      if (totalScrollable > 0) {
        scrollProgressRef.current = window.scrollY / totalScrollable;
      }
    };

    // 2. Mouse tracking for camera drift/parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -0.5 to 0.5
      const mx = (e.clientX / innerWidth) - 0.5;
      const my = (e.clientY / innerHeight) - 0.5;
      mouseRef.current.targetX = mx;
      mouseRef.current.targetY = my;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate 3D Vertices for Object 1: Barbell Shaft and Plates
    const barbellPoints: Point3D[] = [];
    const barbellLines: Line3D[] = [];

    // --- Generate Barbell Shaft (Cylinder) ---
    // Cylinder is 2 rings of 8 points
    const shaftRings = 4;
    const shaftPointsPerRing = 8;
    const shaftLength = 120; // total length along X
    const shaftRadius = 6;

    for (let r = 0; r < shaftRings; r++) {
      const x = -shaftLength / 2 + (shaftLength / (shaftRings - 1)) * r;
      for (let p = 0; p < shaftPointsPerRing; p++) {
        const angle = (p / shaftPointsPerRing) * Math.PI * 2;
        const y = Math.sin(angle) * shaftRadius;
        const z = Math.cos(angle) * shaftRadius;
        barbellPoints.push({ x, y, z });
      }
    }

    // Connect shaft rings
    for (let r = 0; r < shaftRings; r++) {
      const ringOffset = r * shaftPointsPerRing;
      for (let p = 0; p < shaftPointsPerRing; p++) {
        const nextP = (p + 1) % shaftPointsPerRing;
        // Circular line
        barbellLines.push({ a: ringOffset + p, b: ringOffset + nextP, thickness: 1, opacityMultiplier: 0.5 });
        // Longitudinal line
        if (r < shaftRings - 1) {
          barbellLines.push({ a: ringOffset + p, b: ringOffset + shaftPointsPerRing + p, thickness: 1, opacityMultiplier: 0.4 });
        }
      }
    }

    const shaftVertexCount = barbellPoints.length;

    // --- Generate Heavy Weight Plates (Discs) ---
    // Left plate group and Right plate group
    const leftPlatesX = [-45, -55];
    const rightPlatesX = [45, 55];
    const plateRadius = 38;
    const plateWidth = 8;
    const platePointsPerRing = 10;

    const generatePlatePoints = (centerX: number) => {
      const startIndex = barbellPoints.length;
      // Front face
      for (let p = 0; p < platePointsPerRing; p++) {
        const angle = (p / platePointsPerRing) * Math.PI * 2;
        const y = Math.sin(angle) * plateRadius;
        const z = Math.cos(angle) * plateRadius;
        barbellPoints.push({ x: centerX - plateWidth / 2, y, z });
      }
      // Back face
      for (let p = 0; p < platePointsPerRing; p++) {
        const angle = (p / platePointsPerRing) * Math.PI * 2;
        const y = Math.sin(angle) * plateRadius;
        const z = Math.cos(angle) * plateRadius;
        barbellPoints.push({ x: centerX + plateWidth / 2, y, z });
      }

      // Connect plate faces
      for (let p = 0; p < platePointsPerRing; p++) {
        const nextP = (p + 1) % platePointsPerRing;
        // Front circle
        barbellLines.push({ a: startIndex + p, b: startIndex + nextP, thickness: 1.5, opacityMultiplier: 0.9 });
        // Back circle
        barbellLines.push({ a: startIndex + platePointsPerRing + p, b: startIndex + platePointsPerRing + nextP, thickness: 1.5, opacityMultiplier: 0.9 });
        // Connecting depth lines
        barbellLines.push({ a: startIndex + p, b: startIndex + platePointsPerRing + p, thickness: 1, opacityMultiplier: 0.6 });
        // Inner hub spokes (connect to shaft points)
        const correspondingShaftIndex = Math.floor((p / platePointsPerRing) * shaftPointsPerRing);
        const shaftIndex = (centerX < 0 ? 0 : shaftRings - 1) * shaftPointsPerRing + correspondingShaftIndex;
        barbellLines.push({ a: startIndex + p, b: shaftIndex, thickness: 0.8, opacityMultiplier: 0.3 });
      }
    };

    // Build left and right plates
    leftPlatesX.forEach(x => generatePlatePoints(x));
    const rightPlatesStartIdx = barbellPoints.length;
    rightPlatesX.forEach(x => generatePlatePoints(x));


    // Generate 3D Vertices for Object 2: Gyroscope / Biomechanical Sphere
    const gyroPoints: Point3D[] = [];
    const gyroLines: Line3D[] = [];

    // Outer spinning rings (3 orthogonal rings)
    const ringRadius = 80;
    const pointsPerGyroRing = 24;

    // Ring 1 (XY Plane)
    const ring1Start = gyroPoints.length;
    for (let i = 0; i < pointsPerGyroRing; i++) {
      const angle = (i / pointsPerGyroRing) * Math.PI * 2;
      gyroPoints.push({ x: Math.cos(angle) * ringRadius, y: Math.sin(angle) * ringRadius, z: 0 });
    }
    for (let i = 0; i < pointsPerGyroRing; i++) {
      gyroLines.push({ a: ring1Start + i, b: ring1Start + ((i + 1) % pointsPerGyroRing), thickness: 1.8, opacityMultiplier: 0.9 });
    }

    // Ring 2 (YZ Plane)
    const ring2Start = gyroPoints.length;
    for (let i = 0; i < pointsPerGyroRing; i++) {
      const angle = (i / pointsPerGyroRing) * Math.PI * 2;
      gyroPoints.push({ x: 0, y: Math.cos(angle) * (ringRadius * 0.9), z: Math.sin(angle) * (ringRadius * 0.9) });
    }
    for (let i = 0; i < pointsPerGyroRing; i++) {
      gyroLines.push({ a: ring2Start + i, b: ring2Start + ((i + 1) % pointsPerGyroRing), thickness: 1.5, opacityMultiplier: 0.8 });
    }

    // Ring 3 (XZ Plane)
    const ring3Start = gyroPoints.length;
    for (let i = 0; i < pointsPerGyroRing; i++) {
      const angle = (i / pointsPerGyroRing) * Math.PI * 2;
      gyroPoints.push({ x: Math.cos(angle) * (ringRadius * 0.8), y: 0, z: Math.sin(angle) * (ringRadius * 0.8) });
    }
    for (let i = 0; i < pointsPerGyroRing; i++) {
      gyroLines.push({ a: ring3Start + i, b: ring3Start + ((i + 1) % pointsPerGyroRing), thickness: 1.2, opacityMultiplier: 0.7 });
    }

    // Inner geodesic nucleus (Sphere)
    const nucleusStart = gyroPoints.length;
    const numLatitudes = 5;
    const numLongitudes = 10;
    const nucleusRadius = 32;

    for (let lat = 1; lat < numLatitudes; lat++) {
      const theta = (lat / numLatitudes) * Math.PI;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon < numLongitudes; lon++) {
        const phi = (lon / numLongitudes) * Math.PI * 2;
        const x = Math.cos(phi) * sinTheta * nucleusRadius;
        const y = cosTheta * nucleusRadius;
        const z = Math.sin(phi) * sinTheta * nucleusRadius;
        gyroPoints.push({ x, y, z });
      }
    }

    // Connect geodesic sphere lines
    const spherePointsCount = gyroPoints.length - nucleusStart;
    const pointsPerLat = numLongitudes;
    const actualLatitudes = numLatitudes - 1;

    for (let lat = 0; lat < actualLatitudes; lat++) {
      for (let lon = 0; lon < pointsPerLat; lon++) {
        const currentIdx = nucleusStart + lat * pointsPerLat + lon;
        const nextLonIdx = nucleusStart + lat * pointsPerLat + ((lon + 1) % pointsPerLat);
        // Connect longitudinal circle
        gyroLines.push({ a: currentIdx, b: nextLonIdx, thickness: 0.8, opacityMultiplier: 0.5 });

        // Connect latitude rings (upwards)
        if (lat < actualLatitudes - 1) {
          const nextLatIdx = nucleusStart + (lat + 1) * pointsPerLat + lon;
          gyroLines.push({ a: currentIdx, b: nextLatIdx, thickness: 0.8, opacityMultiplier: 0.4 });
        }
      }
    }


    // Generate Floating 3D Gold Dust Particles
    const particles: Particle3D[] = [];
    const particleCount = 120; // Increased count
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: (Math.random() - 0.5) * 1000,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    // 3D Rotations and Projections Helpers
    const rotateX3D = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    };

    const rotateY3D = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos
      };
    };

    const rotateZ3D = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    };

    // Global rotation angles
    let angleX = 0.12;
    let angleY = 0.25;
    let angleZ = 0.05;

    // Rendering loop
    const render = () => {
      // Check for theme
      const isLightMode = document.body.classList.contains('golden-light');
      
      // Ease mouse tracking coordinates
      const prevMouse = mouseRef.current;
      const dx = prevMouse.targetX - prevMouse.x;
      const dy = prevMouse.targetY - prevMouse.y;
      prevMouse.x += dx * 0.08;
      prevMouse.y += dy * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Deep, dark vignette background matching the premium Dhanus theme
      // Reactive to light mode
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.8);
      
      if (isLightMode) {
        bgGrad.addColorStop(0, '#FAF8F2');
        bgGrad.addColorStop(1, '#EAE3D2');
      } else {
        bgGrad.addColorStop(0, '#0c0c0e');
        bgGrad.addColorStop(1, '#020202');
      }
      
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Scroll interpolation values
      const scroll = scrollProgressRef.current; // 0.0 to 1.0

      // Compute camera positions and shifts based on scrolling section
      // Section 1: Hero (scroll 0.0 -> 0.25): Barbell starts exploded, assemblies together.
      // Section 2: Features / Facilities (scroll 0.25 -> 0.5): Assembled Barbell slides left, fades.
      //            Glowing Geodesic Gyroscope slides in from right, scales up, glows.
      // Section 3: Membership Plans / BMI (scroll 0.5 -> 0.75): Gyroscope dominates center stage, reacts dynamically.
      // Section 4: Trainers / Contact (scroll 0.75 -> 1.0): Gyroscope orbits down into the background as an abstract cosmic gold wave.

      const perspective = 500;
      const cx = width / 2;
      const cy = height / 2;

      // Update rotation angles continuously
      angleX += 0.003;
      angleY += 0.005;
      angleZ += 0.002;

      // Mouse interactive tilt offsets
      const mouseTiltX = prevMouse.y * 0.4;
      const mouseTiltY = prevMouse.x * 0.4;

      // --- Draw Floating 3D Gold Dust Particles ---
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx * (1 + scroll * 4); // scroll speedup
        p.y += p.vy * (1 + scroll * 4);
        p.z += p.vz * (1 + scroll * 4);

        // Boundary wrap
        if (p.x > 400) p.x = -400;
        if (p.x < -400) p.x = 400;
        if (p.y > 400) p.y = -400;
        if (p.y < -400) p.y = 400;
        if (p.z > 400) p.z = -400;
        if (p.z < -400) p.z = 400;

        // Apply mouse tilts to particles as well
        let pt = { x: p.x, y: p.y, z: p.z };
        pt = rotateY3D(pt, mouseTiltY * 0.5);
        pt = rotateX3D(pt, mouseTiltX * 0.5);

        // Project particle
        const fovScale = perspective / (perspective + pt.z + 300);
        const px = cx + pt.x * fovScale;
        const py = cy + pt.y * fovScale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.max(0.1, Math.min(1.0, (400 - pt.z) / 800));
          ctx.beginPath();
          ctx.arc(px, py, p.size * fovScale * 2, 0, Math.PI * 2);
          // Golden sparkle color with high intensity
          ctx.fillStyle = isLightMode ? `rgba(138, 100, 15, ${p.alpha * depthAlpha})` : `rgba(255, 196, 0, ${p.alpha * depthAlpha * 1.5})`;
          ctx.fill();

          // Sparkle halo for larger particles
          if (!isLightMode && p.size > 1.2) {
            ctx.shadowColor = '#FFC400';
            ctx.shadowBlur = 12;
            ctx.fillStyle = `rgba(255, 230, 100, ${p.alpha * 0.6 * depthAlpha})`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // --- RENDER OBJECT 1: THE BARBELL (Hero -> Facilities) ---
      const barbellOpacity = scroll < 0.22 
        ? 1.0 
        : scroll < 0.42 
          ? 1.0 - (scroll - 0.22) / 0.20 
          : 0.0;

      if (barbellOpacity > 0.01) {
        // Exploded assembly interpolation factor
        // 0.0 = exploded, 1.0 = fully assembled
        const assemblyProgress = Math.min(1.0, scroll / 0.22);
        const easeAssembly = 1.0 - Math.pow(1.0 - assemblyProgress, 3); // cubic ease-out

        // Scattered exploded offsets
        // As assemblyProgress goes to 1.0, these offsets shrink to 0
        const shaftExplodedY = (1.0 - easeAssembly) * -160;
        const leftPlatesExplodedX = (1.0 - easeAssembly) * -220;
        const leftPlatesExplodedY = (1.0 - easeAssembly) * 40;
        const rightPlatesExplodedX = (1.0 - easeAssembly) * 220;
        const rightPlatesExplodedY = (1.0 - easeAssembly) * -40;

        // Custom position mapping on screen
        // Barbell is centered in Hero, then slides left and down as we scroll
        const barbellCenterX = scroll < 0.2 
          ? 0 
          : -((scroll - 0.2) * 550); // slide left
        const barbellCenterY = scroll < 0.2
          ? -20
          : -20 + (scroll - 0.2) * 100; // slide down
        const barbellCenterZ = -50 + scroll * 150; // push deeper/closer

        // Project and Rotate points
        const projectedPoints: { x: number; y: number; z: number }[] = [];

        barbellPoints.forEach((origP, idx) => {
          let p = { ...origP };

          // Apply Exploded View Translations
          if (idx < shaftVertexCount) {
            // Shaft moves along Y
            p.y += shaftExplodedY;
          } else if (idx < rightPlatesStartIdx) {
            // Left plates move left and down
            p.x += leftPlatesExplodedX;
            p.y += leftPlatesExplodedY;
            // Add a fun rotational offset when exploded
            const rotAng = (1.0 - easeAssembly) * 0.6;
            const rot = rotateZ3D(p, rotAng);
            p.x = rot.x;
            p.y = rot.y;
          } else {
            // Right plates move right and up
            p.x += rightPlatesExplodedX;
            p.y += rightPlatesExplodedY;
            const rotAng = (1.0 - easeAssembly) * -0.6;
            const rot = rotateZ3D(p, rotAng);
            p.x = rot.x;
            p.y = rot.y;
          }

          // Apply Object self rotation
          p = rotateY3D(p, angleY * 0.8);
          p = rotateX3D(p, angleX * 0.5);

          // Apply Camera Tilt based on mouse
          p = rotateY3D(p, mouseTiltY);
          p = rotateX3D(p, mouseTiltX);

          // Apply Section translations
          p.x += barbellCenterX;
          p.y += barbellCenterY;
          p.z += barbellCenterZ;

          // Project
          const fovScale = perspective / (perspective + p.z + 200);
          const sx = cx + p.x * fovScale;
          const sy = cy + p.y * fovScale;

          projectedPoints.push({ x: sx, y: sy, z: p.z });
        });

        // Draw Lines
        barbellLines.forEach((line) => {
          const ptA = projectedPoints[line.a];
          const ptB = projectedPoints[line.b];

          if (!ptA || !ptB) return;

          // Out of screen clip
          if (
            ptA.x < -100 || ptA.x > width + 100 ||
            ptA.y < -100 || ptA.y > height + 100 ||
            ptB.x < -100 || ptB.x > width + 100 ||
            ptB.y < -100 || ptB.y > height + 100
          ) return;

          // Depth shading (farther points are darker)
          const avgZ = (ptA.z + ptB.z) / 2;
          const depthAlpha = Math.max(0.05, Math.min(1.0, (300 - avgZ) / 600));
          const opacity = barbellOpacity * (line.opacityMultiplier || 0.6) * depthAlpha;

          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);

          // Golden premium neon gradients
          ctx.lineWidth = (line.thickness || 1) * (perspective / (perspective + avgZ));
          
          if (isLightMode) {
            // Slightly darker gold/bronze for visibility on light bg
            ctx.strokeStyle = `rgba(138, 100, 15, ${opacity * 0.9})`;
          } else {
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
          }
          
          ctx.stroke();

          // Beautiful premium glow on the barbell when fully assembled
          if (!isLightMode && assemblyProgress > 0.95 && Math.random() > 0.992) {
            ctx.shadowColor = '#FFDF00';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = `rgba(255, 223, 0, ${opacity * 1.5})`;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      }

      // --- RENDER OBJECT 2: THE BIOMECHANICAL GYROSCOPE (Facilities -> Membership -> End) ---
      // Fade in as Barbell fades out
      const gyroOpacity = scroll < 0.22
        ? 0.0
        : scroll < 0.38
          ? (scroll - 0.22) / 0.16 // Fade in quickly
          : scroll < 0.80
            ? 1.0 // Keep fully visible in main sections
            : 1.0 - (scroll - 0.80) / 0.20; // Fade out slightly at footer

      if (gyroOpacity > 0.01) {
        // Position of Gyroscope: Slides in from right, stays prominent, then orbits
        let gyroCenterX = 0;
        let gyroCenterY = 0;
        let gyroCenterZ = -50;
        let currentScale = 1.0;

        if (scroll < 0.5) {
          // Slide in from right (from X=350 to X=0)
          const slideProgress = (scroll - 0.22) / 0.28;
          const easeSlide = Math.min(1.0, Math.max(0.0, slideProgress));
          gyroCenterX = 250 * (1.0 - easeSlide);
          gyroCenterY = 30;
          currentScale = 0.6 + easeSlide * 0.4;
        } else if (scroll < 0.8) {
          // Centered & scaling up in Plans/BMI sections to act as anatomical focus
          gyroCenterX = (width > 1024) ? 220 : 0; // Move to right side on desktops to avoid text overlapping
          gyroCenterY = -10;
          currentScale = 1.05 + Math.sin((angleY * 2)) * 0.05; // Gentle pulse
        } else {
          // Scroll > 0.8: Orbit down and drift left as background star
          const orbitProgress = (scroll - 0.8) / 0.2;
          gyroCenterX = ((width > 1024) ? 220 : 0) - orbitProgress * 280;
          gyroCenterY = -10 + orbitProgress * 150;
          gyroCenterZ = -50 - orbitProgress * 100;
          currentScale = 1.05 - orbitProgress * 0.4;
        }

        const projectedGyroPoints: { x: number; y: number; z: number }[] = [];

        gyroPoints.forEach((origP) => {
          let p = {
            x: origP.x * currentScale,
            y: origP.y * currentScale,
            z: origP.z * currentScale
          };

          // Outer rings rotate independently of core geodesic sphere
          // Self rotation
          p = rotateY3D(p, angleY * 1.2);
          p = rotateX3D(p, angleX * 0.9);
          p = rotateZ3D(p, angleZ * 0.4);

          // Apply Camera Tilt based on mouse
          p = rotateY3D(p, mouseTiltY * 1.2);
          p = rotateX3D(p, mouseTiltX * 1.2);

          // Apply positions
          p.x += gyroCenterX;
          p.y += gyroCenterY;
          p.z += gyroCenterZ;

          // Project
          const fovScale = perspective / (perspective + p.z + 200);
          const sx = cx + p.x * fovScale;
          const sy = cy + p.y * fovScale;

          projectedGyroPoints.push({ x: sx, y: sy, z: p.z });
        });

        // Draw Lines
        gyroLines.forEach((line) => {
          const ptA = projectedGyroPoints[line.a];
          const ptB = projectedGyroPoints[line.b];

          if (!ptA || !ptB) return;

          const avgZ = (ptA.z + ptB.z) / 2;
          const depthAlpha = Math.max(0.05, Math.min(1.0, (300 - avgZ) / 600));
          const opacity = gyroOpacity * (line.opacityMultiplier || 0.6) * depthAlpha;

          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);

          ctx.lineWidth = (line.thickness || 1) * (perspective / (perspective + avgZ));

          // Customize colors for bio-mechanical grid: Premium Rich Gold & Bronze Highlights
          if (isLightMode) {
            ctx.strokeStyle = `rgba(138, 100, 15, ${opacity * 0.8})`;
          } else {
            if (line.a >= nucleusStart) {
              // Geodesic Inner Nucleus: Soft warm gold/bronze
              ctx.strokeStyle = `rgba(180, 140, 45, ${opacity * 0.75})`;
            } else {
              // Outer Gyro rings: High-intensity pristine gold
              ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
            }
          }
          ctx.stroke();

          // Emissive Highlight on Gyroscope core
          if (!isLightMode && scroll > 0.4 && scroll < 0.8 && Math.random() > 0.994) {
            ctx.shadowColor = '#D4AF37';
            ctx.shadowBlur = 20;
            ctx.strokeStyle = `rgba(255, 230, 100, ${opacity * 1.8})`;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />

      {/* Floating Interactive 3D Showroom Portfolio Showcase Card */}
      <AnimatePresence>
        {showGalleryLink && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ delay: 3.5, duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-6 left-6 pointer-events-auto max-w-xs bg-zinc-950/80 backdrop-blur-md border border-gold-premium/20 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-3 z-30"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-black animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs text-gold-premium tracking-wide">
                  DHANUS 3D GALLERY
                </h4>
                <p className="font-sans text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                  View our official high-fidelity interactive 3D mechanics & renders directly in Cloudinary.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <a
                href={CLOUDINARY_COLLECTION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-[11px] font-sans font-extrabold bg-gradient-gold text-black px-3 py-1.5 rounded-lg w-full hover:shadow-[0_0_10px_rgba(212,175,55,0.4)] transition-all duration-200"
              >
                <span>Open 3D Showroom</span>
                <ExternalLink className="w-3 h-3 text-black" />
              </a>
              <button
                onClick={() => setShowGalleryLink(false)}
                className="text-[10px] font-sans text-gray-500 hover:text-white px-2 py-1.5 rounded hover:bg-white/5 transition"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

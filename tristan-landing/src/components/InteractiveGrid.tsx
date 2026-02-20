"use client";

import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Retina/high-DPI display sharpness fix
        const dpr = window.devicePixelRatio || 1;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        setCanvasSize();

        const spacing = 45; // Grid spacing density
        let rows = Math.ceil(height / spacing) + 1;
        let cols = Math.ceil(width / spacing) + 1;

        type Node = {
            ox: number; oy: number;
            x: number; y: number;
            vx: number; vy: number;
        };

        let nodes: Node[][] = [];

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < cols; i++) {
                const col: Node[] = [];
                for (let j = 0; j < rows; j++) {
                    col.push({
                        ox: i * spacing,
                        oy: j * spacing,
                        x: i * spacing,
                        y: j * spacing,
                        vx: 0,
                        vy: 0
                    });
                }
                nodes.push(col);
            }
        };

        initNodes();

        let mouse = { x: -1000, y: -1000, radius: 250 }; // Larger radius for lateral CRT wave

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if ('touches' in e && e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            } else if ('clientX' in e) {
                mouse.x = (e as MouseEvent).clientX;
                mouse.y = (e as MouseEvent).clientY;
            }
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('touchend', handleMouseLeave);

        // Resize with debounce-like behavior
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setCanvasSize();
                rows = Math.ceil(height / spacing) + 1;
                cols = Math.ceil(width / spacing) + 1;
                initNodes();
            }, 100);
        }
        window.addEventListener('resize', handleResize);

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update nodes with Topographic Ripple math
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const node = nodes[i][j];

                    const dx = mouse.x - node.ox;
                    const dy = mouse.y - node.oy;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        // Gravity (Black Hole) effect: Pull points TOWARDS the mouse
                        const falloff = 1 - (dist / mouse.radius);

                        // We use an exponential falloff so it pulls much harder right at the center
                        const force = Math.pow(falloff, 2) * 55; // 55 is how far it can drag them maximum
                        const angle = Math.atan2(dy, dx);

                        // ADD the force instead of subtracting it to pull inward
                        const targetX = node.ox + Math.cos(angle) * force;
                        const targetY = node.oy + Math.sin(angle) * force;

                        node.x += (targetX - node.x) * 0.2; // Smooth flowing elasticity
                        node.y += (targetY - node.y) * 0.2;
                    } else {
                        // Return to origin smoothly
                        node.x += (node.ox - node.x) * 0.1;
                        node.y += (node.oy - node.y) * 0.1;
                    }
                }
            }

            // Draw lines with dynamic color highlighting
            ctx.lineWidth = 1;

            // Helper to determine line segment color
            // Normal color: rgba(0, 0, 0, 0.04)
            // Hotspot color: rgba(255, 90, 0, 0.25) (Lighter / more translucent orange)
            const getLineColor = (x1: number, y1: number, x2: number, y2: number) => {
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const dx = mouse.x - midX;
                const dy = mouse.y - midY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > mouse.radius) {
                    return 'rgba(0, 0, 0, 0.06)';
                }

                // Tighten the glow up around the cursor specifically
                const intensity = Math.pow(1 - (dist / mouse.radius), 1.5);

                const r = Math.round(0 + (255 - 0) * intensity);
                const g = Math.round(0 + (90 - 0) * intensity);
                // Reduce the max alpha so the orange looks much lighter / softer
                // (It was maxing out around 0.54, now it will max out around 0.25)
                const a = 0.03 + (0.22 * intensity);

                return `rgba(${r}, ${g}, 0, ${a})`;
            };

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const node = nodes[i][j];
                    if (i > 0) {
                        const leftNode = nodes[i - 1][j];
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        // Using precise rendering to prevent anti-aliasing blur
                        ctx.lineTo(leftNode.x, leftNode.y);
                        ctx.strokeStyle = getLineColor(node.x, node.y, leftNode.x, leftNode.y);
                        ctx.stroke();
                    }
                    if (j > 0) {
                        const topNode = nodes[i][j - 1];
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(topNode.x, topNode.y);
                        ctx.strokeStyle = getLineColor(node.x, node.y, topNode.x, topNode.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('touchend', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ width: '100vw', height: '100dvh' }}
            aria-hidden="true"
        />
    );
}

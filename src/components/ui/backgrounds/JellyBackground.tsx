import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    delay: number;
}

const JellyBackground: FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Generate particles on mount
    useEffect(() => {
        const colors = [
            'rgba(59, 130, 246, 0.3)',   // blue
            'rgba(168, 85, 247, 0.3)',   // purple
            'rgba(236, 72, 153, 0.3)',   // pink
            'rgba(59, 130, 246, 0.2)',   // lighter blue
            'rgba(168, 85, 247, 0.2)',   // lighter purple
        ];

        const newParticles: Particle[] = [];
        const particleCount = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 2,
            });
        }

        setParticles(newParticles);
    }, []);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <Particle
                    key={particle.id}
                    particle={particle}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}
        </div>
    );
};

interface ParticleProps {
    particle: Particle;
    mouseX: any;
    mouseY: any;
}

const Particle: FC<ParticleProps> = ({ particle, mouseX, mouseY }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        setContainerWidth(window.innerWidth);
        setContainerHeight(window.innerHeight);

        const handleResize = () => {
            setContainerWidth(window.innerWidth);
            setContainerHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate particle position in pixels
    const baseX = (particle.x / 100) * containerWidth;
    const baseY = (particle.y / 100) * containerHeight;

    // Spring configuration for smooth jelly effect
    const springConfig = { damping: 20, stiffness: 150 };

    const x = useSpring(baseX, springConfig);
    const y = useSpring(baseY, springConfig);

    useEffect(() => {
        const unsubscribeX = mouseX.on('change', (latest: number) => {
            const dx = latest - baseX;
            const dy = mouseY.get() - baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Repel particles within 150px radius
            if (distance < 150 && distance > 0) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(dy, dx);

                // Push away from cursor
                const pushX = baseX - Math.cos(angle) * force * 80;
                const pushY = baseY - Math.sin(angle) * force * 80;

                x.set(pushX);
                y.set(pushY);
            } else {
                // Return to original position
                x.set(baseX);
                y.set(baseY);
            }
        });

        const unsubscribeY = mouseY.on('change', (latest: number) => {
            const dx = mouseX.get() - baseX;
            const dy = latest - baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150 && distance > 0) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(dy, dx);

                const pushX = baseX - Math.cos(angle) * force * 80;
                const pushY = baseY - Math.sin(angle) * force * 80;

                x.set(pushX);
                y.set(pushY);
            } else {
                x.set(baseX);
                y.set(baseY);
            }
        });

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [mouseX, mouseY, baseX, baseY, x, y]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                x,
                y,
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
                backgroundColor: particle.color,
                filter: 'blur(1px)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
            }}
        />
    );
};

export default JellyBackground;

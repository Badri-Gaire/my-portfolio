import { motion } from 'framer-motion';
import type { FC, ReactNode } from 'react';

interface JellyButtonProps {
    href?: string;
    children: ReactNode;
    variant?: 'primary' | 'outline';
    onClick?: () => void;
}

const JellyButton: FC<JellyButtonProps> = ({ href, children, variant = 'primary', onClick }) => {
    const isPrimary = variant === 'primary';

    const buttonClasses = isPrimary
        ? "px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
        :  " px-8 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors";

    const MotionComponent = href ? motion.a : motion.button;

    return (
        <MotionComponent
            href={href}
            onClick={onClick}
            className={buttonClasses}
            whileHover={{
                scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
            }}
            style={{
                display: 'inline-block'
            }}
        >
            <motion.span
                style={{ display: 'inline-block' }}
                whileHover={{
                    scale: [1, 1.2, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.4, 0.6, 1]
                }}
            >
                {children}
            </motion.span>
        </MotionComponent>
    );
};

export default JellyButton;

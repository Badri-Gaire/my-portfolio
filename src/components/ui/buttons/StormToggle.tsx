import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { FC } from 'react';

const StormToggle: FC = () => {
    const handleClick = () => {
        const event = new CustomEvent('storm-toggle');
        window.dispatchEvent(event);
    };

    return (
        <motion.button
            onClick={handleClick}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-500 transition-colors"
            whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
            }}
            whileTap={{ scale: 0.9 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
            }}
            aria-label="Trigger Lightning"
            title="Activate Storm Mode"
        >
            <motion.div
                whileHover={{
                    scale: [1, 1.3, 0.8, 1.2, 1],
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}
            >
                <Zap className="size-5" />
            </motion.div>
        </motion.button>
    );
};

export default StormToggle;

import { motion } from "framer-motion";
import type { ExperienceContentProps } from "../../../types/ExperienceContentTypes";

export default function ExperienceContent({
  experiences,
}: ExperienceContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const roleVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
      },
    },
  };

  // Filter out intern roles
  const filteredExperiences = experiences.map((exp) => ({
    ...exp,
    roles: exp.roles.filter(
      (role) => !role.title.toLowerCase().includes("intern")
    ),
  }));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
      className="space-y-12 "
    >
      {filteredExperiences.map((exp) =>
        exp.roles.length === 0 ? null : (
          <div key={exp.company} className="space-y-8">
            {exp.roles.map((role, idx) => (
              <motion.div
                key={`${exp.company}-${role.title}-${idx}`}
                variants={roleVariants}
                custom={idx}
                className="relative group"
              >
                {/* Vertical line connector */}
                {idx < exp.roles.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-16 bg-linear-to-b from-indigo-500 via-purple-500 to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />
                )}

                <div className="flex gap-6 md:gap-8">
                  {/* Timeline dot */}
                  <motion.div
                    className="shrink-0 mt-2"
                    whileHover={{ scale: 1.4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 ring-4 ring-white dark:ring-gray-900 shadow-lg" />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    variants={contentVariants}
                    className="flex flex-col lg:flex-row lg:pb-8 "
                  >
                    <div>
                      {/* Role Title */}
                      <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {role.title}
                      </h4>

                      {/* Company & Location */}
                      <div className="mb-4 space-y-1">
                        <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                          @ {exp.company}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exp.location}
                        </p>
                      </div>

                      {/* Duration Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                        >
                          {role.type}
                        </motion.span>
                        <span className="inline-block px-4 py-1.5 text-xs font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800">
                          {role.duration}
                        </span>
                      </div>
                    </div>

                    {/* Achievements */}
                    {role.achievements && role.achievements.length > 0 && (
                      <motion.ul
                        className="space-y-3 mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        // viewport={{once:true}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        {role.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.3 + i * 0.1,
                              duration: 0.5,
                            }}
                            className="flex gap-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                          >
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 opacity-70" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      )}
    </motion.div>
  );
}

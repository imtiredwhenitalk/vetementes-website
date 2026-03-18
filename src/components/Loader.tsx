import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.h1
            className="font-[Outfit] text-5xl md:text-7xl font-bold tracking-[0.3em] text-white"
            initial={{ letterSpacing: '0.8em', opacity: 0 }}
            animate={{ letterSpacing: '0.3em', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            VETEMENTES
          </motion.h1>
          
          {/* Underline */}
          <motion.div
            className="h-[1px] bg-[var(--color-brand)] mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.8 }}
          />
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-[2px] bg-[var(--color-border)] rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-[var(--color-brand)] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 1, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>

        <motion.p
          className="text-[var(--color-text-muted)] text-xs tracking-[0.4em] uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Luxury Streetwear
        </motion.p>
      </div>
    </motion.div>
  )
}

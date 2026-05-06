import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, title, description, accent = "#7C3AED" }) {
  return (
    <motion.article
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="premium-surface rounded-lg p-5"
    >
      <div
        className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-soft"
        style={{ background: accent }}
      >
        {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
      </div>
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </motion.article>
  );
}

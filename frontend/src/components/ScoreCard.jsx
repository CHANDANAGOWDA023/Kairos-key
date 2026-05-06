import { motion } from "framer-motion";

import ProgressBar from "./ProgressBar";
import { scoreTone } from "../utils/format";

export default function ScoreCard({
  title,
  value,
  icon: Icon,
  description,
  inverse = false,
  color = "from-kairos-purple to-kairos-pink",
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="premium-surface rounded-lg p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}%</p>
        </div>
        {Icon ? (
          <div className={`rounded-lg border p-3 ${scoreTone(value, inverse)}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
      </div>
      {description ? (
        <p className="mt-3 min-h-10 text-sm leading-6 text-slate-600">{description}</p>
      ) : null}
      <div className="mt-4">
        <ProgressBar value={value} color={color} compact />
      </div>
    </motion.article>
  );
}

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const card = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  exit: { y: -10, opacity: 0, transition: { duration: 0.25 } },
};

function Welcome({ nome = "usuário", duration = 2600, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="bv__backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="bv__card" variants={card}>
          <div className="bv__icon">🎉</div>
          <div className="bv__title">Oi, {nome}!</div>
          <p className="bv__text">Bom te ver por aqui!</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Welcome;

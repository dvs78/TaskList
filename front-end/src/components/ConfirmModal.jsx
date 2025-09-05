import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  open,
  title = "Confirmar ação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
}) => {
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (open) confirmBtnRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel} // clique fora = cancelar
        >
          <motion.div
            className="modal__card"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            onClick={(e) => e.stopPropagation()} // não fechar ao clicar dentro
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h3 id="modal-title" className="modal__title">
              {title}
            </h3>
            <p className="modal__desc">{message}</p>

            <div className="modal__actions">
              <button
                className="btn btn--ghost"
                onClick={onCancel}
                disabled={loading}
              >
                {cancelText}
              </button>
              <button
                ref={confirmBtnRef}
                className={`btn ${danger ? "btn--danger" : "btn--primary"}`}
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Aguarde..." : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;

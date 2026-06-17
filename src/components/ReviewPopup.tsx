import { useState } from "react";
import { Star, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
}

export default function ReviewPopup({ isOpen, onClose, onSubmit }: ReviewPopupProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const starLabels = ["", "Poor", "Fair", "Good", "Great", "Amazing!"];

  const handleSubmit = () => {
    if (selectedRating === 0) return;
    setSubmitted(true);
    onSubmit(selectedRating, feedback);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRating(0);
      setHoveredStar(0);
      setFeedback("");
      onClose();
    }, 2000);
  };

  const handleMaybeLater = () => {
    setSelectedRating(0);
    setHoveredStar(0);
    setFeedback("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={handleMaybeLater}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-md"
          >
            <div className="bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-2xl shadow-black/10 overflow-hidden transition-colors duration-300">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center"
                >
                  <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 fill-emerald text-emerald" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-surface-900 dark:text-white mb-2">
                    Thank you! 🎉
                  </h3>
                  <p className="text-sm text-surface-400">
                    Your feedback helps us improve ClearCut for everyone.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="relative px-6 pt-6 pb-4 text-center">
                    <button
                      onClick={handleMaybeLater}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-surface-500 dark:text-surface-400" />
                    </button>

                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-violet rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-display font-extrabold text-surface-900 dark:text-white mb-1">
                      How was your experience?
                    </h3>
                    <p className="text-sm text-surface-400">
                      Your background was removed successfully! Rate us below.
                    </p>
                  </div>

                  <div className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          onClick={() => setSelectedRating(star)}
                          className="p-1 transition-transform duration-150 hover:scale-125 cursor-pointer"
                        >
                          <Star
                            className={`w-9 h-9 transition-colors duration-150 ${
                              star <= (hoveredStar || selectedRating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-surface-200 dark:text-surface-600 hover:text-surface-300 dark:hover:text-surface-500"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-xs font-semibold text-surface-400 h-4">
                      {starLabels[hoveredStar || selectedRating] || "Tap a star to rate"}
                    </p>
                  </div>

                  <AnimatePresence>
                    {selectedRating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 overflow-hidden"
                      >
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Tell us more (optional)..."
                          rows={3}
                          className="w-full bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl px-4 py-3 text-sm text-surface-700 dark:text-surface-200 placeholder:text-surface-300 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 resize-none transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-6 space-y-2.5">
                    <button
                      onClick={handleSubmit}
                      disabled={selectedRating === 0}
                      className="w-full bg-primary hover:bg-primary-dark disabled:bg-surface-100 dark:disabled:bg-surface-800 disabled:text-surface-300 dark:disabled:text-surface-600 disabled:cursor-not-allowed text-white py-3.5 rounded-2xl font-display font-bold text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md shadow-primary/20"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={handleMaybeLater}
                      className="w-full text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 py-2.5 rounded-2xl font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Maybe Later
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

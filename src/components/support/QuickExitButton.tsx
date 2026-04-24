import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { translate } from "@/i18n";

const QuickExitButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleExit = () => {
    sessionStorage.clear();
    window.location.href = "https://www.google.com";
  };

  const handleClick = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      if (!muted) {
        toast(translate("quickExit.toast"), {
          duration: 3000,
        });
      }
      const timer = setTimeout(() => setShowConfirm(false), 5000);
      return () => clearTimeout(timer);
    }

    handleExit();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && showConfirm) {
      setShowConfirm(false);
    }
  };

  React.useEffect(() => {
    if (showConfirm) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showConfirm]);

  return (
    <>
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end"
      >
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 text-foreground p-4 rounded-xl shadow-xl border border-border"
            >
              <div className="space-y-3 max-w-xs">
                <div className="flex items-start gap-2">
                  <LogOut className="w-5 h-5 text-rose-deep flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{translate("quickExit.title")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{translate("quickExit.description")}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                  >
                    {translate("quickExit.stay")}
                  </button>
                  <button
                    onClick={handleExit}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-rose-deep text-white hover:opacity-90 transition-opacity font-medium"
                  >
                    {translate("quickExit.exit")}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleClick}
          className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-muted transition-all transform active:scale-95 shadow-lg group relative"
          title={translate("quickExit.buttonTitle")}
        >
          <motion.div
            animate={showConfirm ? { scale: 1.1 } : { scale: 1 }}
            className="opacity-60 group-hover:opacity-100 transition-opacity"
          >
            <LogOut className="w-5 h-5" />
          </motion.div>
        </button>

        <button
          onClick={() => setMuted(!muted)}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-muted transition-all text-sm"
          title={muted ? translate("quickExit.enableSound") : translate("quickExit.disableSound")}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </motion.div>
    </>
  );
};

export default QuickExitButton;

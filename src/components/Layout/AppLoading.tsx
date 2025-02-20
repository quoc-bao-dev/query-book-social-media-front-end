"use client";

import { AnimatePresence, motion } from "framer-motion";
import { signify } from "react-signify";
import LoadingEffect from "../common/Loading";

export const sAppLoading = signify({
  isLoading: false,
});

export const useAppLoading = () => {
  return {
    setLoading: (isLoading: boolean) =>
      sAppLoading.set((n) => (n.value.isLoading = isLoading)),
    loading: () => sAppLoading.set((n) => (n.value.isLoading = true)),
    done: () => sAppLoading.set((n) => (n.value.isLoading = false)),
  };
};
const AppLoading = () => {
  return (
    <AnimatePresence>
      <sAppLoading.Wrap>
        {({ isLoading }) =>
          isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-950/40 fixed inset-0 z-50 flex items-center justify-center"
            >
              <LoadingEffect />
            </motion.div>
          ) : (
            <></>
          )
        }
      </sAppLoading.Wrap>
    </AnimatePresence>
  );
};

export default AppLoading;

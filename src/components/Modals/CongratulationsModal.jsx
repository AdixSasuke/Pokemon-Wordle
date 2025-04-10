import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { capitalize } from "../../utils/stringUtils";

const CongratulationsModal = ({ targetPokemon, onNewGame, onClose, theme }) => {
    if (!targetPokemon) return null;
    const isDark = theme === "dark";

    // Log when the component mounts to check props
    useEffect(() => {
        console.log("CongratulationsModal mounted");
        console.log("onClose is:", typeof onClose);
        console.log("onNewGame is:", typeof onNewGame);
    }, [onClose, onNewGame]);

    // Try a direct function that doesn't use useCallback
    function closeModal() {
        console.log("Direct close function called");
        // Try forcing window refresh as a last resort
        if (typeof onClose === "function") {
            onClose();
        } else {
            console.error("onClose is not a function");
            // As a fallback, try to hide the modal directly
            const modal = document.querySelector(
                ".congratulations-modal-container"
            );
            if (modal) {
                modal.style.display = "none";
            }
        }
    }

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 22,
            },
        },
    };

    return (
        <div className="fixed inset-0 border bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 px-4 py-5 congratulations-modal-container">
            <motion.div
                className={`${
                    isDark ? "bg-gray-900" : "bg-white"
                } rounded-xl p-4 sm:p-6 max-w-md w-full mx-auto shadow-2xl border ${
                    isDark
                        ? "border-2 border-green-600"
                        : "border-2 border-green-500"
                }`}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <div className="text-center">
                    <h3
                        className={`text-lg sm:text-xl font-bold mb-3 ${
                            isDark ? "text-gray-100" : "text-gray-800"
                        }`}
                    >
                        You caught the Pokémon!
                    </h3>
                    <div className="relative">
                        <motion.div
                            className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4 sm:mb-5 relative z-10"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                        >
                            <img
                                src={targetPokemon.image}
                                alt={targetPokemon.name}
                                className="w-full h-full object-contain drop-shadow-lg"
                            />
                        </motion.div>
                        <motion.div
                            className={`absolute inset-0 rounded-full ${
                                isDark ? "bg-green-700/30" : "bg-green-100/50"
                            } blur-xl -z-0`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.7 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        />
                    </div>
                    <motion.p
                        className={`text-xl sm:text-2xl font-bold ${
                            isDark ? "text-green-400" : "text-green-600"
                        } mb-4 sm:mb-5`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {capitalize(targetPokemon.name)}
                    </motion.p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6 text-xs sm:text-sm">
                        <motion.div
                            className={`${
                                isDark ? "bg-gray-700" : "bg-gray-100"
                            } rounded-full p-3 text-center shadow-sm ${
                                isDark ? "shadow-black/20" : "shadow-gray-200"
                            }`}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span
                                className={`font-medium ${
                                    isDark ? "text-green-300" : "text-green-600"
                                }`}
                            >
                                Type:
                            </span>{" "}
                            <span
                                className={
                                    isDark ? "text-gray-300" : "text-gray-700"
                                }
                            >
                                {capitalize(targetPokemon.type1)}
                                {targetPokemon.type2 !== "—"
                                    ? `/${capitalize(targetPokemon.type2)}`
                                    : ""}
                            </span>
                        </motion.div>
                        <motion.div
                            className={`${
                                isDark ? "bg-gray-700" : "bg-gray-100"
                            } rounded-full p-3 text-center shadow-sm ${
                                isDark ? "shadow-black/20" : "shadow-gray-200"
                            }`}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span
                                className={`font-medium ${
                                    isDark ? "text-green-300" : "text-green-600"
                                }`}
                            >
                                Gen:
                            </span>{" "}
                            <span
                                className={
                                    isDark ? "text-gray-300" : "text-gray-700"
                                }
                            >
                                {targetPokemon.generation}
                            </span>
                        </motion.div>
                        <motion.div
                            className={`${
                                isDark ? "bg-gray-700" : "bg-gray-100"
                            } rounded-full p-3 text-center shadow-sm ${
                                isDark ? "shadow-black/20" : "shadow-gray-200"
                            }`}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span
                                className={`font-medium ${
                                    isDark ? "text-green-300" : "text-green-600"
                                }`}
                            >
                                Color:
                            </span>{" "}
                            <span
                                className={
                                    isDark ? "text-gray-300" : "text-gray-700"
                                }
                            >
                                {capitalize(targetPokemon.color)}
                            </span>
                        </motion.div>
                        <motion.div
                            className={`${
                                isDark ? "bg-gray-700" : "bg-gray-100"
                            } rounded-full p-3 text-center shadow-sm ${
                                isDark ? "shadow-black/20" : "shadow-gray-200"
                            }`}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span
                                className={`font-medium ${
                                    isDark ? "text-green-300" : "text-green-600"
                                }`}
                            >
                                Habitat:
                            </span>{" "}
                            <span
                                className={
                                    isDark ? "text-gray-300" : "text-gray-700"
                                }
                            >
                                {capitalize(targetPokemon.habitat)}
                            </span>
                        </motion.div>
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                        <motion.button
                            onClick={onClose}
                            className={`flex-1 ${
                                isDark
                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300"
                            } py-2.5 sm:py-3 px-4 sm:px-5 rounded-full transition-colors text-sm sm:text-base border font-medium shadow-sm`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Close
                        </motion.button>
                        <motion.button
                            onClick={onNewGame}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-3 px-4 sm:px-5 rounded-full transition-colors text-sm sm:text-base font-medium shadow-md"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            New Game
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Add a direct close modal button for testing */}
            <button
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                onClick={closeModal}
                style={{ zIndex: 1000 }}
            >
                X
            </button>

            {/* We'll also try a different approach for the overlay */}
            <div
                className="fixed inset-0"
                style={{ zIndex: -1 }}
                onClick={closeModal}
                aria-hidden="true"
            />
        </div>
    );
};

export default CongratulationsModal;

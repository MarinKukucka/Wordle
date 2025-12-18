import styles from "./Hints.module.css";

interface Props {
    isExposeUsed: boolean;
    exposedHint?: [number, string];
    removeUsed: number;
    handleExposeCorrectLetter: () => void;
    handleRemoveWrongLetterFromKeyboard: () => void;
}

function Hints({
    isExposeUsed,
    exposedHint,
    removeUsed,
    handleExposeCorrectLetter,
    handleRemoveWrongLetterFromKeyboard,
}: Props) {
    return (
        <div className={styles.hintButtonContainer}>
            <button
                className={styles.button}
                onClick={handleRemoveWrongLetterFromKeyboard}
                hidden={removeUsed >= 2}
            >
                Remove {removeUsed === 0 ? "first" : "second"} wrong letter
            </button>

            {isExposeUsed && exposedHint ? (
                <div className={styles.hintBox}>
                    Letter {exposedHint[1]} is at position {exposedHint[0] + 1}
                </div>
            ) : (
                <button
                    className={styles.button}
                    onClick={handleExposeCorrectLetter}
                    hidden={isExposeUsed}
                >
                    Expose one correct letter
                </button>
            )}
        </div>
    );
}

export default Hints;

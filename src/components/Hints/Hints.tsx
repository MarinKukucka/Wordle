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
            {isExposeUsed && exposedHint ? (
                `Letter ${exposedHint[1]} is at position ${exposedHint[0] + 1}`
            ) : (
                <button
                    className={styles.button}
                    onClick={handleExposeCorrectLetter}
                    hidden={isExposeUsed}
                >
                    Expose 1 correct letter
                </button>
            )}
            <button
                className={styles.button}
                onClick={handleRemoveWrongLetterFromKeyboard}
                hidden={removeUsed >= 2}
            >
                Remove 1 wrong letter
            </button>
        </div>
    );
}

export default Hints;

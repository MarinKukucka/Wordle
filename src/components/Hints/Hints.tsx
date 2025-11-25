import styles from "./Hints.module.css";

interface Props {
    isExposeUsed: boolean;
    exposedHint?: [number, string];
    isRemoveUsed: boolean;
    handleExposeCorrectLetter: () => void;
    handleRemoveWrongLetterFromKeyboard: () => void;
}

function Hints({
    isExposeUsed,
    exposedHint,
    isRemoveUsed,
    handleExposeCorrectLetter,
    handleRemoveWrongLetterFromKeyboard,
}: Props) {
    return (
        <div className={styles.hintButtonContainer}>
            {isExposeUsed && exposedHint ? (
                `Letter ${exposedHint[1]} is at position ${exposedHint[0] + 1}`
            ) : (
                <button
                    onClick={handleExposeCorrectLetter}
                    hidden={isExposeUsed}
                >
                    Expose 1 correct letter
                </button>
            )}
            <button
                onClick={handleRemoveWrongLetterFromKeyboard}
                hidden={isRemoveUsed}
            >
                Remove 1 wrong letter
            </button>
        </div>
    );
}

export default Hints;

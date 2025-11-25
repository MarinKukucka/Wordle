import styles from "./Hints.module.css";

interface Props {
    isExposeUsed: boolean;
    isRemoveUsed: boolean;
    handleRemoveWrongLetterFromKeyboard: () => void;
}

function Hints({
    isExposeUsed,
    isRemoveUsed,
    handleRemoveWrongLetterFromKeyboard,
}: Props) {
    return (
        <div className={styles.hintButtonContainer}>
            <button hidden={isExposeUsed}>Expose 1 correct letter</button>
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

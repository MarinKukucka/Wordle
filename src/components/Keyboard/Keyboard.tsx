import { keyboard } from "../../config/constants";
import styles from "./Keyboard.module.css";

interface Props {
    wrongLetters: Set<string>;
}

function Keyboard({ wrongLetters }: Props) {
    return (
        <div>
            {keyboard.map((row) => {
                const keyboardRow = row.map((key) => {
                    const isUsedAndWorng = wrongLetters.has(key);

                    const className = isUsedAndWorng
                        ? ` ${styles.wrongKey}`
                        : "";

                    return (
                        <button
                            className={styles.key + className}
                            disabled={isUsedAndWorng}
                        >
                            {key}
                        </button>
                    );
                });

                return <div className={styles.keyboardRow}>{keyboardRow}</div>;
            })}
        </div>
    );
}

export default Keyboard;

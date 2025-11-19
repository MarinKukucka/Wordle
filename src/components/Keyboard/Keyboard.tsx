import { keyboard } from "../../config/constants";
import styles from "./Keyboard.module.css";

interface Props {
    wrongLetters: Set<string>;
    handleUserKeyPress: (event: KeyboardEvent) => void;
}

function Keyboard({ wrongLetters, handleUserKeyPress }: Props) {
    return (
        <div>
            {keyboard.map((row, rowIndex) => {
                const keyboardRow = row.map((key, keyIndex) => {
                    const isUsedAndWorng = wrongLetters.has(key);

                    const className = isUsedAndWorng
                        ? ` ${styles.wrongKey}`
                        : "";

                    return (
                        <button
                            key={keyIndex}
                            className={styles.key + className}
                            onClick={() =>
                                handleUserKeyPress({ key } as KeyboardEvent)
                            }
                        >
                            {key}
                        </button>
                    );
                });

                return (
                    <div key={rowIndex} className={styles.keyboardRow}>
                        {keyboardRow}
                    </div>
                );
            })}
        </div>
    );
}

export default Keyboard;

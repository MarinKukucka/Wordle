import { useMemo } from "react";
import styles from "./Row.module.css";
import { WORD_LENGTH } from "../../config/constants";

interface Props {
    word?: string;
    solution: string;
    isEntered: boolean;
    addWrongLetter: (letter: string) => void;
}

function Row({ word, solution, isEntered, addWrongLetter }: Props) {
    const boxes = useMemo(() => {
        return Array.from({ length: WORD_LENGTH }, (_, i) => {
            let className = "";

            if (isEntered) {
                if (word && word[i].toUpperCase() === solution[i]) {
                    className += " " + styles.correct;
                } else if (word && solution.includes(word[i].toUpperCase())) {
                    className += " " + styles.wrongPosition;
                } else if (word) {
                    className += " " + styles.wrong;

                    addWrongLetter(word[i].toUpperCase());
                }
            }

            return (
                <div key={i} className={styles.box + className}>
                    {word?.[i]}
                </div>
            );
        });
    }, [addWrongLetter, isEntered, solution, word]);

    return <div className={styles.row}>{boxes}</div>;
}

export default Row;

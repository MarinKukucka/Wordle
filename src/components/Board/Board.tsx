import Row from "../Row/Row";
import styles from "./Board.module.css";

interface Props {
    guesses: (string | undefined)[];
    currentGuess: string;
    solution: string;
    addWrongLetter: (letter: string) => void;
}

function Board({ guesses, currentGuess, solution, addWrongLetter }: Props) {
    return (
        <div className={styles.board}>
            {guesses?.map((guess, index) => {
                return (
                    <Row
                        key={index}
                        word={
                            guess
                                ? guess
                                : guesses[index - 1] || index === 0
                                ? currentGuess
                                : undefined
                        }
                        solution={solution}
                        isEntered={!!guess}
                        addWrongLetter={addWrongLetter}
                    />
                );
            })}
        </div>
    );
}

export default Board;

import lokiLokac from "../../assets/LokiLokac.gif";
import styles from "./GameOver.module.css";

interface Props {
    solution: string;
    isGameWin: boolean;
    handleStartNewGame: () => void;
}

function GameOver({ solution, isGameWin, handleStartNewGame }: Props) {
    return (
        <div className={styles.container}>
            <p>
                {`${
                    isGameWin ? "Congratulations :-)" : "You lost :-("
                } The word you were looking for is: ${solution}`}
            </p>
            <button onClick={handleStartNewGame}>NEW GAME</button>
            {isGameWin && (
                <img className={styles.gif} src={lokiLokac} alt="Loki Lokac" />
            )}
        </div>
    );
}

export default GameOver;

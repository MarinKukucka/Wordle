import lokiLokac from "../../config/LokiLokac.gif";
import styles from "./GameOver.module.css";

interface Props {
    solution: string;
    handleStartNewGame: () => void;
}

function GameOver({ solution, handleStartNewGame }: Props) {
    return (
        <div className={styles.container}>
            <p>CONGRATULATIONS, THE WORD YOU WERE LOOKING FOR IS: {solution}</p>
            <button onClick={handleStartNewGame}>NEW GAME</button>
            <img className={styles.gif} src={lokiLokac} alt="Loki Lokac" />
        </div>
    );
}

export default GameOver;

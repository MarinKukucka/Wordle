import { useEffect, useState } from "react";
import lokiLokac from "../../assets/LokiLokac.gif";
import { fetchWordDefinition } from "../../services/wordDefinitionService";
import styles from "./GameOver.module.css";

interface Props {
    solution: string;
    isGameWin: boolean;
    handleStartNewGame: () => void;
}

function GameOver({ solution, isGameWin, handleStartNewGame }: Props) {
    const [definition, setDefinition] = useState<string | null>(null);

    useEffect(() => {
        async function loadDefinition() {
            const result = await fetchWordDefinition(solution);

            setDefinition(result);
        }

        loadDefinition();
    }, [solution]);

    return (
        <div className={styles.container}>
            <h2>{isGameWin ? "🎉 Congratulations!" : "😢 Game Over"}</h2>

            <p>The word you were looking for is: {solution}</p>

            <div className={styles.definitionBox}>
                <p>{definition}</p>
            </div>

            {isGameWin && (
                <img className={styles.gif} src={lokiLokac} alt="Loki Lokac" />
            )}

            <button className={styles.button} onClick={handleStartNewGame}>
                NEW GAME
            </button>
        </div>
    );
}

export default GameOver;

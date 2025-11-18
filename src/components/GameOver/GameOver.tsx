interface Props {
    solution: string;
    handleStartNewGame: () => void;
}

function GameOver({ solution, handleStartNewGame }: Props) {
    return (
        <>
            <p>CONGRATULATIONS, THE WORD YOU WERE LOOKING FOR IS: {solution}</p>
            <button onClick={handleStartNewGame}>NEW GAME</button>
        </>
    );
}

export default GameOver;

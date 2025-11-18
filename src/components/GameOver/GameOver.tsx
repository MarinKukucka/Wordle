interface Props {
    handleStartNewGame: () => void;
}

function GameOver({ handleStartNewGame }: Props) {
    return (
        <>
            <p>CONGRATULATIONS</p>
            <button onClick={handleStartNewGame}>NEW GAME</button>
        </>
    );
}

export default GameOver;

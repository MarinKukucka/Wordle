import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { WORDS as EnglishWords } from "./config/wordList/english/words";
import { WORDS as CroatianWords } from "./config/wordList/croatian/words";
import {
    BACKSPACE_KEYS,
    ENTER_KEYS,
    NUMBER_OF_GUESSES,
} from "./config/constants";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import GameOver from "./components/GameOver/GameOver";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
    const [words, setWords] = useState<string[]>([]);
    const [solution, setSolution] = useState<string>("");
    const [guesses, setGuesses] = useState<(string | undefined)[]>(
        Array(NUMBER_OF_GUESSES).fill(undefined)
    );
    const [currentGuess, setCurrentGuess] = useState<string>("");
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isGameWin, setIsGameWin] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>("English");
    const [wrongLetters, setWrongLetters] = useState<Set<string>>(
        new Set<string>()
    );

    useEffect(() => {
        setWords(language === "English" ? EnglishWords : CroatianWords);

        setSolution(words[Math.floor(Math.random() * words.length)]);
    }, [language, words]);

    const handleUserKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (BACKSPACE_KEYS.includes(event.key)) {
                setCurrentGuess((prev) => prev.slice(0, -1));

                return;
            }

            if (ENTER_KEYS.includes(event.key)) {
                if (currentGuess.toUpperCase() === solution) {
                    setIsGameOver(true);

                    setIsGameWin(true);

                    return;
                }

                if (currentGuess.length < 5) return;

                if (!words.includes(currentGuess.toUpperCase())) return;

                const nextEmptyIndex = guesses.findIndex(
                    (guess) => guess === undefined
                );

                setGuesses((prev) =>
                    prev.map((guess, index) =>
                        index === nextEmptyIndex ? currentGuess : guess
                    )
                );

                if (nextEmptyIndex === NUMBER_OF_GUESSES - 1) {
                    setIsGameOver(true);

                    setIsGameWin(false);
                }

                setCurrentGuess("");
            }

            if (!/^[a-zA-Z]$/.test(event.key)) return;

            if (currentGuess.length >= 5) return;

            setCurrentGuess((prev) => prev + event.key);
        },
        [currentGuess, guesses, solution, words]
    );

    useEffect(() => {
        if (!isGameOver) {
            window.addEventListener("keydown", handleUserKeyPress);

            return () => {
                window.removeEventListener("keydown", handleUserKeyPress);
            };
        }
    }, [
        currentGuess,
        currentGuess.length,
        guesses,
        handleUserKeyPress,
        isGameOver,
        solution,
        words,
    ]);

    const handleChangeLanguage = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            setLanguage(event.target.value);
        },
        []
    );

    const handleStartNewGame = useCallback(() => {
        setIsGameOver(false);

        setSolution(words[Math.floor(Math.random() * words.length)]);

        setGuesses(Array(NUMBER_OF_GUESSES).fill(undefined));

        setCurrentGuess("");

        setWrongLetters(new Set<string>());
    }, [words]);

    const handleAddWrongLetter = useCallback((letter: string) => {
        setWrongLetters((prev) => new Set<string>([...prev, letter]));
    }, []);

    return (
        <div className="container">
            {isGameOver ? (
                <GameOver
                    solution={solution}
                    isGameWin={isGameWin}
                    handleStartNewGame={handleStartNewGame}
                />
            ) : (
                <>
                    <Header handleChangeLanguage={handleChangeLanguage} />
                    <Board
                        guesses={guesses}
                        currentGuess={currentGuess}
                        solution={solution}
                        addWrongLetter={handleAddWrongLetter}
                    />
                    <Keyboard
                        wrongLetters={wrongLetters}
                        handleUserKeyPress={handleUserKeyPress}
                    />
                </>
            )}
        </div>
    );
}

export default App;

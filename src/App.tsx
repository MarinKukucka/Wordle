import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { WORDS as EnglishWords } from "./config/wordList/english/words";
import { WORDS as CroatianWords } from "./config/wordList/croatian/words";
import {
    BACKSPACE_KEYS,
    ENTER_KEYS,
    keyboard,
    NUMBER_OF_GUESSES,
    WORD_LENGTH,
} from "./config/constants";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import GameOver from "./components/GameOver/GameOver";
import Keyboard from "./components/Keyboard/Keyboard";
import Hints from "./components/Hints/Hints";

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
    const [isExposeUsed, setIsExposeUsed] = useState<boolean>(false);
    const [exposedHint, setExposedHint] = useState<[number, string]>();
    const [removeUsed, setRemoveUsed] = useState<number>(0);

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

        setIsExposeUsed(false);

        setExposedHint(undefined);

        setRemoveUsed(0);
    }, [words]);

    const handleAddWrongLetter = useCallback((letter: string) => {
        setWrongLetters((prev) => new Set<string>([...prev, letter]));
    }, []);

    const handleRemoveWrongLetterFromKeyboard = useCallback(() => {
        const availaibleLetters = keyboard
            .flat()
            .filter(
                (key) =>
                    key !== "←" &&
                    key !== "⏎" &&
                    !wrongLetters.has(key) &&
                    !solution.includes(key)
            );

        const letterToRemove =
            availaibleLetters[
                Math.floor(Math.random() * availaibleLetters.length)
            ];

        setWrongLetters((prev) => new Set<string>([...prev, letterToRemove]));

        setRemoveUsed((prev) => prev + 1);
    }, [solution, wrongLetters]);

    const handleExposeCorrectLetter = useCallback(() => {
        const unexposedLetterIndexes = [];

        for (let i = 0; i < WORD_LENGTH; i++) {
            let hasCorrectLetter = false;

            for (let j = 0; j < guesses.length; j++) {
                if (guesses[j]?.[i] === solution[i]) {
                    hasCorrectLetter = true;
                    break;
                }
            }

            if (!hasCorrectLetter) {
                unexposedLetterIndexes.push(i);
            }
        }

        const randomIndex =
            unexposedLetterIndexes[
                Math.floor(Math.random() * unexposedLetterIndexes.length)
            ];

        const letterToExpose = solution[randomIndex];

        setExposedHint([randomIndex, letterToExpose]);

        setIsExposeUsed(true);
    }, [guesses, solution]);

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
                    <div className="board-container">
                        <div className="spacer" />
                        <Board
                            guesses={guesses}
                            currentGuess={currentGuess}
                            solution={solution}
                            addWrongLetter={handleAddWrongLetter}
                        />
                        <div className="spacer">
                            <Hints
                                isExposeUsed={isExposeUsed}
                                exposedHint={exposedHint}
                                removeUsed={removeUsed}
                                handleExposeCorrectLetter={
                                    handleExposeCorrectLetter
                                }
                                handleRemoveWrongLetterFromKeyboard={
                                    handleRemoveWrongLetterFromKeyboard
                                }
                            />
                        </div>
                    </div>
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

import { ChangeEvent } from "react";
// import { languages } from "../../config/constants";
import styles from "./Header.module.css";

interface Props {
    handleChangeLanguage: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Header({ handleChangeLanguage }: Props) {
    return (
        <>
            <h1 className={styles.header}>WORDLE</h1>
            {/* <div className={styles.languageSelectContainer}>
                <select
                    className={styles.languageSelect}
                    onChange={handleChangeLanguage}
                >
                    <option disabled>Select...</option>
                    {languages.map((language, index) => (
                        <option key={index} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div> */}
        </>
    );
}

export default Header;

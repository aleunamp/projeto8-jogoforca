import React from "react"
import words from "./words";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";


export default function App() {
    const [counter, setCounter] = React.useState(0);
    const [underline, setUnderline] = React.useState("");
    const [chosenWord, setChosenWord] = React.useState("");
    const [correctLetters, setCorrectLetters] = React.useState("letrasCorretas");
    const [disable, setDisable] = React.useState(true);
    const [input, setInput] = React.useState("");
    const [wordWArray, setWordWArray] = React.useState([]);
    const [wordArray, setWordArray] = React.useState([]);
    const [underlineArray, setUnderlineArray] = React.useState([]);
    const [clicks, setClicks] = React.useState([]);

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


    const images = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

    function chooseWord() {
        const index = Math.floor(Math.random() * words.length);
        const chosenWord = words[index];
        setChosenWord(chosenWord);

        const chosenWordWA = chosenWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const wordWArray = chosenWordWA.split("");
        const wordArray = chosenWord.split("");
        const amountOfLetters = wordWArray.length;
        const underFuture = "_ ".repeat(amountOfLetters);
        setUnderline(underFuture);
        setWordWArray(wordWArray);
        setWordArray(wordArray);
        setDisable(false);
        setCorrectLetters("letrasCorretas");
        setCounter(0);
        setClicks([]);

        makeUnderlineArray(underFuture);
    }


    function makeUnderlineArray(underFuture) {
        setUnderlineArray(underFuture.split(" ").filter((item) => item !== ""));
    }

    function win() {
        const wordArray = chosenWord.split("");
        setUnderline(wordArray.join(" "));
        setCorrectLetters("letrasCorretas verde");
        setCounter(counter);
        setClicks([]);
        setDisable(true);
    }

    function lose() {
        const wordArray = chosenWord.split("");
        setUnderline(wordArray.join(" "));
        setCorrectLetters("letrasCorretas vermelho");
        setCounter(6);
        setClicks([]);
        setDisable(true);
    }

    function selectLetter(letter) {
        const newClicks = [...clicks, letter];
        setClicks(newClicks);

        for (let i = 0; i < wordWArray.length; i++) {
            if (wordWArray.includes(letter)) {
                for (let j = 0; j < wordWArray.length; j++) {
                    if (wordWArray[j] === letter) {
                        underlineArray[j] = wordArray[j];
                        setUnderlineArray(underlineArray);
                        setUnderline(underlineArray.join(" "));

                        if (underlineArray.join("") === wordWArray.join("") || underlineArray.join("") === wordArray.join("")) {
                            win();
                        }
                    }
                }
            }

            else {
                setCounter(counter + 1);
                if (counter === (images.length - 2)) {
                    lose();
                }
            }
        }
    }

    function changeInput(event) {
        setInput(event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    }

    function guessWord() {
        const chosenWord = (wordArray.join("").normalize('NFD').replace(/[\u0300-\u036f]/g, ""));

        if (input === chosenWord) {
            win();
        } else {
            setUnderline(wordArray.join(" "));
            lose();
        }

        setInput("");
    }

    return (<div>
        <div className="jogo">
            <div className="forca-aposta">
                <div className="forca">
                    <img data-identifier="game-image"
                        src={images[counter]} alt={images[counter]}
                    />
                </div>
                <div className="aposta">
                    <button data-identifier="choose-word"
                        onClick={chooseWord} className="escolhaDePalavra">
                        Escolher Palavra
                    </button>
                    <div data-identifier="word" className={correctLetters}>{underline}</div>
                </div>
            </div>

            <div className="botoes-chute">
                <div className="botoes">
                    {alphabet.map((letter, index) => (
                        <button
                            key={index}
                            disabled={disable || clicks.includes(letter) ? true : false}
                            data-identifier="letter"
                            onClick={() => selectLetter(letter)}
                            className="botao">{letter.toUpperCase()}
                        </button>))
                    }
                </div>
                <div className="chute">
                    <p>Já sei a palavra!</p>
                    <input data-identifier="type-guess"
                        disabled={disable}
                        onChange={changeInput}
                        value={input}
                        placeholder="Digite a palavra aqui..."
                    />
                    <button
                        disabled={disable}
                        data-identifier="guess-button"
                        onClick={guessWord}
                        className="confirmarChute">
                        Chutar
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
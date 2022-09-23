import React from "react"
import palavras from "./Palavras";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";


export default function App() {
    const [desabilitar, setDesabilitar] = React.useState(true);
    const [contagemDeErros, setContagem] = React.useState(0);
    const [sublinhados, setSublinhado] = React.useState("");
    const [arrayPalavra, setArrayPalavra] = React.useState([]);
    const [letrasCorretas, setLetrasCorretas] = React.useState("letrasCorretas");

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


    const imagensDaForca = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

    function sortearPalavra() {
        const indiceSorteado = Math.floor(Math.random() * palavras.length);
        const palavraSorteada = palavras[indiceSorteado];
        const palavraSorteadaSA = palavraSorteada.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        console.log(palavraSorteada);

        const arrayDaPalavra = palavraSorteadaSA.split("");
        const qtdDeLetras = arrayDaPalavra.length;
        console.log(qtdDeLetras);

        setSublinhado("_ ".repeat(qtdDeLetras));

        setArrayPalavra(arrayDaPalavra);

        setDesabilitar(false);
    }

    function selecionarLetra(letra) {
        const arraySublinhados = sublinhados.split(" ").filter((item) => item !== "");

        for (let i = 0; i < arrayPalavra.length; i++) {
            if (arrayPalavra.includes(letra)) {
                console.log("Tá funcionando");
            }


            else {
                setContagem(contagemDeErros + 1);
                console.log("não tem essa letra aí");

                if (contagemDeErros === (arrayPalavra.length - 1)) {
                    setSublinhado(arrayPalavra.join(" "));
                    setLetrasCorretas("letrasCorretas vermelho");
                    setContagem(6);
                    setDesabilitar(true);
                }
            }
        }
    }

    console.log(contagemDeErros);

    function chutarPalavra() {
        const palavraSorteada = (arrayPalavra.join("").normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        console.log(palavraSorteada);
    }

    return (<div>
        <div className="jogo">
            <div className="forca-aposta">
                <div className="forca">
                    <img data-identifier="game-image"
                        src={imagensDaForca[contagemDeErros]} alt={imagensDaForca[contagemDeErros]}
                    />
                </div>
                <div className="aposta">
                    <button data-identifier="choose-word"
                        onClick={sortearPalavra} className="escolhaDePalavra">
                        Escolher Palavra
                    </button>
                    <div data-identifier="word" className={letrasCorretas}>{sublinhados}</div>
                </div>
            </div>

            <div className="botoes-chute">
                <div className="botoes">
                    {alfabeto.map((letra, indice) => (
                        <button
                            key={indice}
                            disabled={desabilitar}
                            data-identifier="letter"
                            onClick={() => selecionarLetra(letra)}
                            className="botao">{letra.toUpperCase()}
                        </button>))
                    }
                </div>
                <div className="chute">
                    <p>Já sei a palavra!</p>
                    <input data-identifier="type-guess"
                        placeholder="Digite a palavra aqui..."
                    />
                    <button
                        disabled={desabilitar}
                        data-identifier="guess-button"
                        onClick={chutarPalavra}
                        className="confirmarChute">
                        Chutar
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}
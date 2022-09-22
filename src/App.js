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

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    console.log(palavras);

    const imagensDaForca = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

    function Botao(props) {
        return (
            <button 
                disabled={desabilitar}
                data-identifier="letter"
                onClick={selecionarLetra} className="botao">{props.letra}
            </button>
        )
    }

    function sortearPalavra() {
        const indiceSorteado = Math.floor(Math.random() * palavras.length);
        const palavraSorteada = palavras[indiceSorteado];
        console.log(palavraSorteada);

        const arrayPalavra = palavraSorteada.split("");
        const qtdDeLetras = arrayPalavra.length;
        console.log(qtdDeLetras);

        setSublinhado("__ ".repeat(qtdDeLetras));
        setDesabilitar(false);
    }

    function selecionarLetra() {
        console.log("Tá funcionando");
    }

    function chutarPalavra() {
        console.log("Tá funcionando");
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
                    <div data-identifier="word" className="letrasCorretas">{sublinhados}</div>
                </div>
            </div>

            <div className="botoes-chute">
                <div className="botoes">
                    {alfabeto.map((l, index) => <Botao key={index} letra={l.toUpperCase()} />)}
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
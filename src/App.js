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

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


    const imagensDaForca = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

    function sortearPalavra() {
        const indiceSorteado = Math.floor(Math.random() * palavras.length);
        const palavraSorteada = palavras[indiceSorteado];
        console.log(palavraSorteada);

        const arrayDaPalavra = palavraSorteada.split("");
        const qtdDeLetras = arrayDaPalavra.length;
        console.log(qtdDeLetras);

        setSublinhado("__ ".repeat(qtdDeLetras));

        setArrayPalavra(palavraSorteada.split(""));
        console.log(arrayPalavra);

        setDesabilitar(false);
    }

    function selecionarLetra(letra) {
        console.log(arrayPalavra);

        //testa se a letra está na palavra sorteada
        if (arrayPalavra.includes(letra)) {
            console.log("Tá funcionando");
        } else {
            setContagem(contagemDeErros + 1);
            console.log("não tem essa letra aí");
        }
    }

    function chutarPalavra() {
        const palavraS = (arrayPalavra.join("")); //junta a array da palavra sorteada
        console.log(palavraS);
        console.log(palavraS.normalize('NFD').replace(/[\u0300-\u036f]/g, "")); //retira os acentos e ç
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
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
    const [contagemDeErros, setContagem] = React.useState(0);
    const [sublinhados, setSublinhado] = React.useState("");
    const [letrasCorretas, setLetrasCorretas] = React.useState("letrasCorretas");
    const [desabilitar, setDesabilitar] = React.useState(true);
    const [chuteDoInput, setChute] = React.useState("");
    const [arrayPalavra, setArrayPalavra] = React.useState([]);
    const [arraySublinhados, setArraySublinhados] = React.useState([]);
    const [letrasClicadas, setLetrasClicadas] = React.useState([]);

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

        const subFuturo = "_ ".repeat(qtdDeLetras);
        setSublinhado(subFuturo);

        setArrayPalavra(arrayDaPalavra);

        setDesabilitar(false);

        setLetrasCorretas("letrasCorretas");
        setContagem(0);

        setaArraySublinhados(subFuturo);
    }



    function setaArraySublinhados(subFuturo) {
        setArraySublinhados(subFuturo.split(" ").filter((item) => item !== ""));
    }

    function selecionarLetra(letra) {
        const novoletrasClicadas = [...letrasClicadas, letra];
        setLetrasClicadas(novoletrasClicadas);

        for (let i = 0; i < arrayPalavra.length; i++) {
            if (arrayPalavra.includes(letra)) {
                for (let j = 0; j < arrayPalavra.length; j++) {
                    if (arrayPalavra[j] === letra) {
                        arraySublinhados[j] = letra;
                        setArraySublinhados(arraySublinhados);
                        setSublinhado(arraySublinhados.join(" "));

                        if (arraySublinhados.join("") === arrayPalavra.join("")) {
                            setSublinhado(arrayPalavra.join(" "));
                            setLetrasCorretas("letrasCorretas verde");
                            setContagem(contagemDeErros);
                            setLetrasClicadas([]);
                        }
                    }
                }

                console.log("Tem a letra");
            }

            else {
                setContagem(contagemDeErros + 1);
                console.log("Não tem essa letra aí");

                if (contagemDeErros === (arrayPalavra.length - 1)) {
                    setSublinhado(arrayPalavra.join(" "));
                    setLetrasCorretas("letrasCorretas vermelho");
                    setContagem(6);
                    setLetrasClicadas([]);
                    setDesabilitar(true);
                }
            }
        }
    }

    console.log(contagemDeErros);
    console.log(letrasClicadas);
    console.log(arraySublinhados);

    function mudouInput(event) {
        setChute(event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
    }

    function chutarPalavra() {
        const palavraSorteada = (arrayPalavra.join("").normalize('NFD').replace(/[\u0300-\u036f]/g, ""));

        if (chuteDoInput === palavraSorteada) {
            setSublinhado(arrayPalavra.join(" "));
            setLetrasCorretas("letrasCorretas verde");
            setContagem(contagemDeErros);
            setLetrasClicadas([]);
            setDesabilitar(true);
        }

        else {
            setSublinhado(arrayPalavra.join(" "));
            setLetrasCorretas("letrasCorretas vermelho");
            setContagem(6);
            setLetrasClicadas([]);
            setDesabilitar(true);
        }

        setChute("");
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
                        disabled={desabilitar}
                        onChange={mudouInput}
                        value={chuteDoInput}
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
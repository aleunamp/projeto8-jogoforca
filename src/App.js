import palavras from "./Palavras";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";


export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    console.log(alfabeto);

    console.log(palavras);

    const imagensDaForca = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
    console.log(imagensDaForca);

    return (<div>
        <div className="jogo">
            <div className="forca-aposta">
                <div className="forca">
                    <img src={imagensDaForca[0]} />
                </div>
                <div className="aposta">
                    <button className="escolhaDePalavra">Escolher Palavra</button>
                    <div className="letrasCorretas">letras</div>
                </div>
            </div>

            <div className="botoes-chute">
                <div className="botoes">
                    <button className="botao">A</button>
                </div>
                <div className="chute">
                    <p>Já sei a palavra!</p>
                    <input placeholder="Digite a palavra aqui..." />
                    <button className="confirmarChute">Chutar</button>
                </div>
            </div>
        </div>
    </div>
    )
}
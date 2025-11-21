import { useState } from "react";
import type { Categoria } from "../data/estoqueData";
import { ChevronDown, ChevronUp } from "lucide-react"; // Minus e Plus removidos

interface CategoriaCardProps {
  categoria: Categoria;
  onQuantidadeChange: (
    categoriaNome: string,
    bebidaNome: string,
    novaQtd: number
  ) => void;
  forceAberto?: boolean; // Usado para forçar a abertura na tela de detalhes
}

export const CategoriaCard: React.FC<CategoriaCardProps> = ({
  categoria,
  onQuantidadeChange,
  forceAberto = false,
}) => {
  // O estado 'aberto' local só é usado se não for forçado a abrir
  const [aberto, setAberto] = useState(false);
  const estaAberto = forceAberto || aberto;

  return (
    <div className="bg-white rounded-2xl shadow-md mb-3 overflow-hidden">
      {/* Cabeçalho do Card */}
      <div
        className={`w-full flex justify-between items-center px-4 py-3 ${
          !forceAberto ? "active:scale-95 transition cursor-pointer" : ""
        }`}
        // Só permite o clique de toggle se não estiver forçado a abrir (tela de detalhes)
        onClick={() => !forceAberto && setAberto((prev) => !prev)}
      >
        <h3 className="text-[--color-primary] font-semibold text-base text-left cursor-default">
          {categoria.categoria}
        </h3>
        {/* Ícone de Chevron só aparece se não estiver forçado a abrir (visão de accordion) */}
        {!forceAberto &&
          (estaAberto ? (
            <ChevronUp size={20} className="text-[--color-primary]" />
          ) : (
            <ChevronDown size={20} className="text-[--color-primary]" />
          ))}
      </div>

      <div
        className={`transition-all duration-300 ${
          estaAberto
            ? "max-h-[1000px] sm:max-h-[1200px] opacity-100 p-3"
            : "max-h-0 opacity-0 p-0"
        } overflow-hidden`}
      >
        {/* Renderização condicional do conteúdo (opcional, mas ajuda na performance em listas grandes) */}
        {estaAberto && (
          <ul className="flex flex-col gap-3">
            {categoria.bebidas.map((bebida) => (
              <li
                key={bebida.nome}
                className="flex justify-between items-center bg-[--color-bg] p-3 rounded-xl"
              >
                <span className="font-medium text-[--color-text] text-sm cursor-default">
                  {bebida.nome}
                </span>

                <input
                  type="number"
                  min={0}
                  value={bebida.quantidade}
                  onChange={(e) =>
                    onQuantidadeChange(
                      categoria.categoria,
                      bebida.nome,
                      Number(e.target.value)
                    )
                  }
                  className="w-16 text-center border border-gray-300 rounded-lg py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

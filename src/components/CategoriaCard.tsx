import { useState } from "react";
import type { Categoria } from "../data/estoqueData";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CategoriaCardProps {
  categoria: Categoria;
  onQuantidadeChange: (
    categoriaNome: string,
    bebidaNome: string,
    novaQtd: number
  ) => void;
}

export const CategoriaCard: React.FC<CategoriaCardProps> = ({
  categoria,
  onQuantidadeChange,
}) => {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md mb-3 overflow-hidden">
      {/* Cabeçalho do Card */}
      <button
        className="w-full flex justify-between items-center px-4 py-3 active:scale-95 transition cursor-pointer"
        onClick={() => setAberto((prev) => !prev)}
      >
        <h3 className="text-[--color-primary] font-semibold text-base text-left">
          {categoria.categoria}
        </h3>
        {aberto ? (
          <ChevronUp size={20} className="text-[--color-primary]" />
        ) : (
          <ChevronDown size={20} className="text-[--color-primary]" />
        )}
      </button>

      {/* Lista de bebidas */}
      <div
        className={`transition-all duration-300 ${
          aberto ? "max-h-[1000px] sm:max-h-[1200px] opacity-100 p-3" : "max-h-0 opacity-0 p-0"
        } overflow-hidden`}
      >
        <ul className="flex flex-col gap-3">
          {categoria.bebidas.map((bebida) => (
            <li
              key={bebida.nome}
              className="flex justify-between items-center bg-[--color-bg] p-3 rounded-xl"
            >
              <span className="font-medium text-[--color-text] text-sm">
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
      </div>
    </div>
  );
};

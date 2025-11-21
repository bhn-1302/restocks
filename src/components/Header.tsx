import React from "react";
import { Save, Download, RotateCcw } from "lucide-react";

interface HeaderProps {
  onSalvar: () => void;
  onExportarPDF: () => void;
  onResetar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSalvar,
  onExportarPDF,
  onResetar,
}) => {
  return (
    <header className="bg-[--color-primary] py-3 px-4 shadow-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <h1 className="text-lg sm:text-2xl font-bold tracking-wide text-center sm:text-left cursor-default text-white">
        Estoque de Bebidas
      </h1>

      <nav className="flex flex-wrap justify-center sm:justify-end gap-2">
        {/* Botão SALVAR (Ação Primária - Destaque Verde) */}
        <button
          onClick={onSalvar}
          className="
            flex items-center gap-2
            bg-[--color-secondary] text-white font-semibold 
            px-4 py-2 rounded-xl text-sm 
            hover:bg-opacity-80 transition active:scale-[0.98] shadow-md cursor-pointer
          "
          aria-label="Salvar Estoque"
        >
          <Save size={18} />
          Salvar
        </button>

        {/* Botão EXPORTAR PDF (Ação Secundária - Estilo de Contraste) */}
        <button
          onClick={onExportarPDF}
          className="
            flex items-center gap-2
            bg-white text-[--color-primary] font-semibold 
            px-4 py-2 rounded-xl text-sm 
            hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-[--color-primary] transition active:scale-[0.98] shadow-md cursor-pointer
          "
          aria-label="Exportar para PDF"
        >
          <Download size={18} />
          PDF
        </button>

        {/* Botão RESETAR (Ação Cautelosa - Vermelho) */}
        <button
          onClick={onResetar}
          className="
            flex items-center gap-2
            bg-red-600 text-white font-semibold 
            px-4 py-2 rounded-xl text-sm 
            hover:bg-red-700 transition active:scale-[0.98] shadow-md cursor-pointer
          "
          aria-label="Resetar Estoque"
        >
          <RotateCcw size={18} />
          Resetar
        </button>
      </nav>
    </header>
  );
};

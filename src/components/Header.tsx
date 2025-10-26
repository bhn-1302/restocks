// src/components/Header.tsx
import React from "react";

interface HeaderProps {
  onSalvar: () => void;
  onExportarPDF: () => void;
  onResetar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSalvar, onExportarPDF, onResetar }) => {
  return (
    <header className="bg-primary  py-3 px-4 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <h1 className="text-lg sm:text-2xl font-bold tracking-wide text-center sm:text-left cursor-default text-white">
        Estoque de Bebidas
      </h1>

      <nav className="flex flex-wrap justify-center sm:justify-end gap-2">
        <button
          onClick={onSalvar}
          className="bg-secondary text-[--color-primary] font-semibold px-3 py-2 rounded-lg text-sm active:scale-95 transition cursor-pointer"
        >
          Salvar
        </button>

        <button
          onClick={onExportarPDF}
          className="bg-[red] text-[--color-primary] font-semibold px-3 py-2 rounded-lg text-sm active:scale-95 transition cursor-pointer"
        >
          PDF
        </button>

        <button
          onClick={onResetar}
          className="bg-text text-white font-semibold px-3 py-2 rounded-lg text-sm active:scale-95 transition cursor-pointer"
        >
          Resetar
        </button>
      </nav>
    </header>
  );
};

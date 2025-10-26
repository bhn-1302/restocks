import { useEffect, useState, useCallback } from "react";
import { estoqueData } from "../data/estoqueData";
import type { Categoria } from "../data/estoqueData";
import { CategoriaCard } from "../components/CategoriaCard";
import { Header } from "../components/Header";
import jsPDF from "jspdf";
import { Mensagem } from "../components/Mensagem";

export const Home: React.FC = () => {
  const [estoque, setEstoque] = useState<Categoria[]>(estoqueData);
  const [mensagem, setMensagem] = useState({texto: "", visivel: false})

  // carrega o estoque salvo ao iniciar
  useEffect(() => {
    const salvo = localStorage.getItem("estoque");
    if (salvo) {
      setEstoque(JSON.parse(salvo));
    }
  }, []);

  // salva automaticamente sempre que o estoque muda
  useEffect(() => {
    localStorage.setItem("estoque", JSON.stringify(estoque));
  }, [estoque]);

  // atualiza quantidades
  function handleQuantidadeChange(
    categoriaNome: string,
    bebidaNome: string,
    novaQtd: number
  ) {
    setEstoque((prev) =>
      prev.map((cat) =>
        cat.categoria === categoriaNome
          ? {
              ...cat,
              bebidas: cat.bebidas.map((b) =>
                b.nome === bebidaNome ? { ...b, quantidade: novaQtd } : b
              ),
            }
          : cat
      )
    );
  }

  function mostrarMensagem(texto: string) {
    setMensagem({texto, visivel: true});
    setTimeout(() => {
        setMensagem({texto: "", visivel: false});
    }, 2000)
  }

  // Handler manual: Salvar
  const handleSalvar = useCallback(() => {
    localStorage.setItem("estoque", JSON.stringify(estoque));
    mostrarMensagem("Estoque salvo!");
  }, [estoque]);

  // Resetar estoque
  const handleResetar = useCallback(() => {
    setEstoque(estoqueData);
    localStorage.removeItem("estoque");
    mostrarMensagem("Estoque resetado!");
  }, []);

  // Exportar PDF
  const handleExportarPDF = useCallback(() => {
    const doc = new jsPDF({ unit: "pt" });
    const margin = 40;
    const lineHeight = 16;
    let y = margin + 20;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Controle de Estoque - Bebidas", margin, y);
    y += 24;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    estoque.forEach((categoria) => {
      doc.setFont("helvetica", "bold");
      doc.text(categoria.categoria, margin, y);
      y += lineHeight;

      doc.setFont("helvetica", "normal");
      categoria.bebidas.forEach((bebida) => {
        const linha = `• ${bebida.nome}: ${bebida.quantidade}`;
        if (y > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(linha, margin + 10, y);
        y += lineHeight;
      });

      y += lineHeight; // espaço entre categorias
    });

    doc.save("estoque-bebidas.pdf");

    mostrarMensagem("PDF gerado com sucesso!")
  }, [estoque]);

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header com os handlers */}
      <Header
        onSalvar={handleSalvar}
        onExportarPDF={handleExportarPDF}
        onResetar={handleResetar}
      />

      <main className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-primary cursor-default">
          Controle de Estoque
        </h2>

        {estoque.map((cat) => (
          <CategoriaCard
            key={cat.categoria}
            categoria={cat}
            onQuantidadeChange={handleQuantidadeChange}
          />
        ))}

        <Mensagem texto={mensagem.texto} visivel={mensagem.visivel} />
      </main>
    </div>
  );
};

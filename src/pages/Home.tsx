import { useEffect, useState, useCallback } from "react";
import { estoqueData } from "../data/estoqueData";
import type { Categoria } from "../data/estoqueData";
import { CategoriaCard } from "../components/EstoqueAccordion";
import { Header } from "../components/Header";
import jsPDF from "jspdf";
import { Mensagem } from "../components/Mensagem";
import { useThemeStore } from "../store/themeStore";
import { Sun, Moon } from "lucide-react";

export const Home: React.FC = () => {
  const [estoque, setEstoque] = useState<Categoria[]>(estoqueData);
  const [mensagem, setMensagem] = useState({ texto: "", visivel: false });
  // Armazena o nome da categoria que o usuário clicou para detalhar
  const [categoriaEmDetalhe, setCategoriaEmDetalhe] = useState<string | null>(
    null
  );
  const { theme, toggleTheme } = useThemeStore();

  // 1. Carrega o estoque salvo ao iniciar
  useEffect(() => {
    const salvo = localStorage.getItem("estoque");
    if (salvo) {
      setEstoque(JSON.parse(salvo));
    }
  }, []);

  // 2. SALVAMENTO AUTOMÁTICO: Salva no localStorage sempre que o estado 'estoque' muda.
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
    setMensagem({ texto, visivel: true });
    setTimeout(() => {
      setMensagem({ texto: "", visivel: false });
    }, 2000);
  }

  // Handler manual: Salvar (Mantido, mas agora apenas dispara a mensagem visual de "salvo")
  const handleSalvar = useCallback(() => {
    // O salvamento real ocorre no useEffect acima. Aqui, só confirmamos a ação.
    mostrarMensagem("Estoque salvo automaticamente!");
  }, []);

  // Resetar estoque
  const handleResetar = useCallback(() => {
    setEstoque(estoqueData);
    localStorage.removeItem("estoque");
    mostrarMensagem("Estoque resetado!");
  }, []);

  // Abrir a visualização de detalhes
  const handleAbrirDetalhe = (categoriaNome: string) => {
    setCategoriaEmDetalhe(categoriaNome);
  };

  // Fechar a visualização de detalhes
  const handleFecharDetalhes = () => {
    setCategoriaEmDetalhe(null);
  };

  // Variável para a categoria selecionada (necessário para renderizar o EstoqueAccordion)
  const categoriaSelecionada = estoque.find(
    (cat) => cat.categoria === categoriaEmDetalhe
  );

  // Exportar PDF
  const handleExportarPDF = useCallback(() => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4",
    });

    // Configurações de estilo
    const margin = 40;
    let y = margin + 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const sectionHeight = 25;
    const cellHeight = 18;
    const headerColor = "#5b21b6"; // Cor primária (Violeta)
    const secondaryColor = "#f3f4f6"; // Fundo claro (para linhas)
    const textColor = "#1f2937";
    const boldFont = "helvetica";
    const normalFont = "helvetica";

    // --- CABEÇALHO GERAL ---
    doc.setFillColor(headerColor);
    doc.rect(0, 0, pageWidth, 50, "F"); // Barra de cabeçalho

    doc.setFont(boldFont, "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255); // Texto branco
    doc.text("Controle de Estoque de Bebidas", margin, 35);

    y = 70; // Começa o conteúdo após o cabeçalho

    let totalGeralItens = 0;

    estoque.forEach((categoria) => {
      const totalItensCategoria = categoria.bebidas.reduce(
        (sum, b) => sum + b.quantidade,
        0
      );
      totalGeralItens += totalItensCategoria;

      // --- Título da Categoria ---
      if (y + sectionHeight + 10 > doc.internal.pageSize.height - margin) {
        doc.addPage();
        y = margin;
      }

      doc.setFillColor(secondaryColor);
      doc.rect(margin, y - 5, pageWidth - margin * 2, sectionHeight, "F");

      doc.setFont(boldFont, "bold");
      doc.setFontSize(14);
      doc.setTextColor(textColor);
      doc.text(categoria.categoria, margin + 5, y + 12);

      doc.setFontSize(10);
      doc.setTextColor(textColor);
      doc.text(
        `Total: ${totalItensCategoria} itens`,
        pageWidth - margin - 5,
        y + 12,
        { align: "right" }
      );

      y += sectionHeight + 5;

      // --- Tabela de Itens (com Produto e Quantidade) ---
      // Desenha os títulos da coluna (opcional)
      doc.setFont(boldFont, "bold");
      doc.setFontSize(10);
      doc.setTextColor(textColor);
      doc.text("Produto", margin + 5, y + 10);
      doc.text("Qtd", pageWidth - margin - 5, y + 10, { align: "right" });
      y += 15; // Espaço para o cabeçalho da tabela

      doc.setFont(normalFont, "normal");
      doc.setFontSize(11);

      categoria.bebidas.forEach((bebida, itemIndex) => {
        if (bebida.quantidade === 0) return;

        if (y + cellHeight > doc.internal.pageSize.height - margin) {
          doc.addPage();
          y = margin;
        }

        // Fundo da linha (Zebrado)
        const lineBgColor = itemIndex % 2 === 0 ? 245 : 255;
        doc.setFillColor(lineBgColor, lineBgColor, lineBgColor);
        doc.rect(margin, y, pageWidth - margin * 2, cellHeight, "F");

        // Texto do Produto
        doc.setTextColor(textColor);
        doc.text(bebida.nome, margin + 5, y + 12);

        // Quantidade (Alinhada à Direita)
        doc.text(bebida.quantidade.toString(), pageWidth - margin - 5, y + 12, {
          align: "right",
        });

        y += cellHeight;
      });

      y += 15; // Espaço após a tabela
    });

    // --- RODAPÉ/SUMÁRIO GERAL ---
    if (y + 30 > doc.internal.pageSize.height - margin) {
      doc.addPage();
      y = margin;
    }

    const footerColor = "#10b981"; // Cor secundária (Verde)
    doc.setFillColor(footerColor);
    doc.rect(margin, y, pageWidth - margin * 2, 30, "F");

    doc.setFont(boldFont, "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); // Texto branco
    doc.text("TOTAL GERAL DE ITENS", margin + 5, y + 20);
    doc.text(totalGeralItens.toString(), pageWidth - margin - 5, y + 20, {
      align: "right",
    });

    doc.save("estoque-bebidas.pdf");

    mostrarMensagem("PDF gerado com sucesso!");
  }, [estoque]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark" : ""
      } bg-bg text-text`}
    >
      {/* Header com os handlers */}
      <Header
        onSalvar={handleSalvar}
        onExportarPDF={handleExportarPDF}
        onResetar={handleResetar}
      />

      <div className="flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className="cursor-pointer p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-[--color-primary] dark:text-yellow-400 active:scale-95 transition"
          aria-label={`Mudar para tema ${
            theme === "light" ? "escuro" : "claro"
          }`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <main className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-[--color-primary] cursor-default">
          Controle de Estoque
        </h2>

        {/* Visão 1: Cards de Categoria */}
        {!categoriaEmDetalhe && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {estoque.map((cat) => (
              <div
                key={cat.categoria}
                onClick={() => handleAbrirDetalhe(cat.categoria)}
                className="bg-white p-4 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition active:scale-[0.98] border-b-4 border-[--color-secondary]"
              >
                <h3 className="font-bold text-base text-[--color-text] text-center">
                  {cat.categoria}
                </h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  {cat.bebidas.reduce((sum, b) => sum + b.quantidade, 0)} itens
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Visão 2: Detalhe da Categoria Selecionada */}
        {categoriaEmDetalhe && categoriaSelecionada && (
          <div>
            <button
              onClick={handleFecharDetalhes}
              className="mb-4 text-sm text-[--color-primary] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              &larr; Voltar para Categorias
            </button>
            <CategoriaCard
              key={categoriaSelecionada.categoria}
              categoria={categoriaSelecionada}
              onQuantidadeChange={handleQuantidadeChange}
              forceAberto={true}
            />
          </div>
        )}

        <Mensagem texto={mensagem.texto} visivel={mensagem.visivel} />
      </main>
    </div>
  );
};

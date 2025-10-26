interface MensagemProps {
    texto: string;
    visivel: boolean;
}

export const Mensagem: React.FC<MensagemProps> = ({texto, visivel}) => {
    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1 bg-green-500 text-white px-4 py-2 rounded shadow-md transition-all duration-300 ${visivel ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {texto}
        </div>
    )
}
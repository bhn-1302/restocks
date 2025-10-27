export interface Bebida {
  nome: string;
  quantidade: number;
}

export interface Categoria {
  categoria: string;
  bebidas: Bebida[];
}

export const estoqueData: Categoria[] = [
  {
    categoria: "Refrigerantes 2L",
    bebidas: [
      { nome: "Coca-Cola", quantidade: 0 },
      { nome: "Coca-Cola Zero", quantidade: 0 },
      { nome: "Guaraná Antarctica", quantidade: 0 },
      { nome: "Guaraná Antarctica Zero", quantidade: 0 },
      { nome: "Fanta Laranja", quantidade: 0 },
      { nome: "Piracaia", quantidade: 0 },
    ],
  },
  {
    categoria: "Refrigerantes 1L",
    bebidas: [
      { nome: "Guaraná Antarctica", quantidade: 0 },
      { nome: "Guaraná Antarctica Zero", quantidade: 0 },
      { nome: "Sukita Laranja", quantidade: 0 },
    ],
  },
  {
    categoria: "Refrigerantes 600ml Pet",
    bebidas: [
      { nome: "Coca-Cola", quantidade: 0 },
      { nome: "Coca-Cola Zero", quantidade: 0 },
      { nome: "Guaraná Antarctica", quantidade: 0 },
      { nome: "Guaraná Antarctica Zero", quantidade: 0 },
      { nome: "Fanta Laranja", quantidade: 0 },
    ],
  },
  {
    categoria: "Refrigerantes 600ml Vidro",
    bebidas: [
      { nome: "Itubaína", quantidade: 0 },
      { nome: "Guaranita", quantidade: 0 },
    ],
  },
  {
    categoria: "Refrigerantes Lata 350ml",
    bebidas: [
      { nome: "Coca-Cola", quantidade: 0 },
      { nome: "Coca-Cola Zero", quantidade: 0 },
      { nome: "Guaraná Antarctica", quantidade: 0 },
      { nome: "Guaraná Antarctica Zero", quantidade: 0 },
      { nome: "Fanta Laranja", quantidade: 0 },
      { nome: "Fanta Laranja Zero", quantidade: 0 },
      { nome: "Fanta Uva", quantidade: 0 },
      { nome: "Fanta Uva Zero", quantidade: 0 },
      { nome: "Fanta Maracujá", quantidade: 0 },
      { nome: "Fanta Guaraná", quantidade: 0 },
      { nome: "Pepsi", quantidade: 0 },
      { nome: "Pepsi Black", quantidade: 0 },
      { nome: "Pepsi Twist", quantidade: 0 },
      { nome: "Pepsi Twist Black", quantidade: 0 },
      { nome: "Kuat", quantidade: 0 },
      { nome: "Sprite", quantidade: 0 },
      { nome: "Sprite Zero", quantidade: 0 },
      { nome: "Itubaína", quantidade: 0 },
    ],
  },

  {
    categoria: "Refrigerantes KS",
    bebidas: [
      { nome: "Coca-Cola", quantidade: 0 },
      { nome: "Coca-Cola Zero", quantidade: 0 },
      { nome: "Fanta Uva", quantidade: 0 },
      { nome: "Fanta Laranja", quantidade: 0 },
      { nome: "Sprite", quantidade: 0 },
      { nome: "Soda", quantidade: 0 },
    ],
  },
  {
    categoria: "Refrigerantes KS 185ml",
    bebidas: [{ nome: "Guaranita", quantidade: 0 }],
  },
  {
    categoria: "Refrigerantes Caçulinha",
    bebidas: [
      { nome: "Coca-Cola", quantidade: 0 },
      { nome: "Coca-Cola Zero", quantidade: 0 },
      { nome: "Guaraná Antarctica", quantidade: 0 },
      { nome: "Guaraná Antarctica Zero", quantidade: 0 },
      { nome: "Pepsi", quantidade: 0 },
      { nome: "Pepsi Black", quantidade: 0 },
      { nome: "Pepsi Twist", quantidade: 0 },
      { nome: "Sukita Laranja", quantidade: 0 },
      { nome: "Soda", quantidade: 0 },
    ],
  },
  {
    categoria: "Águas",
    bebidas: [
      { nome: "Água Mineral", quantidade: 0 },
      { nome: "Água Mineral Com Gás", quantidade: 0 },
    ],
  },
  {
    categoria: "Águas Saborizadas",
    bebidas: [
      { nome: "H2O", quantidade: 0 },
      { nome: "H2O Limoneto", quantidade: 0 },
      { nome: "Lemon Sprite", quantidade: 0 },
    ],
  },
  {
    categoria: "Cervejas Litrão",
    bebidas: [
      { nome: "Skol", quantidade: 0 },
      { nome: "Amstel", quantidade: 0 },
      { nome: "Original", quantidade: 0 },
    ],
  },
  {
    categoria: "Cervejas 600ml",
    bebidas: [
      { nome: "Skol", quantidade: 0 },
      { nome: "Amstel", quantidade: 0 },
      { nome: "Heineken", quantidade: 0 },
      { nome: "Original", quantidade: 0 },
      { nome: "Eisenbahn", quantidade: 0 },
    ],
  },
  {
    categoria: "Cervejas Long Neck",
    bebidas: [{ nome: "Heineken", quantidade: 0 }],
  },
  {
    categoria: "Cervejas Latas 350ml",
    bebidas: [
      { nome: "Skol", quantidade: 0 },
      { nome: "Original", quantidade: 0 },
      { nome: "Eisenbahn", quantidade: 0 },
      { nome: "Heineken", quantidade: 0 },
      { nome: "Heineken Zero Álcool", quantidade: 0 },
      { nome: "Amstel", quantidade: 0 },
      { nome: "Budweiser", quantidade: 0 },
    ],
  },
];

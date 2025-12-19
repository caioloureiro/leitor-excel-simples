# 📊 Leitor Excel Simples

Um sistema web completo para ler, criar, editar e deletar dados em arquivos Excel com interface moderna em tema escuro.

**Desenvolvido por:** Caio Loureiro  
**Site:** https://digitalmd.com.br  
**Currículo:** https://digitalmd.com.br/caioloureiro/cv/

## ✨ Funcionalidades

- **Ler Excel**: Carregue dados do arquivo `teste.xlsx`
- **Criar**: Adicione novos registros ao Excel
- **Editar**: Modifique registros existentes
- **Deletar**: Remova registros com confirmação
- **Salvar Automático**: Todas as mudanças são salvas automaticamente no Excel
- **Tema Escuro**: Interface elegante e moderna com paleta de cores escura
- **Responsivo**: Funciona bem em diferentes tamanhos de tela

## 🚀 Instalação

### Pré-requisitos
- PHP 7.4+
- Composer
- WAMP64 (ou Apache + PHP)

### Passos

1. **Clone ou copie os arquivos** para sua pasta web:
```bash
cd c:\wamp64\www\leitor-excel-simples
```

2. **Instale as dependências** com Composer:
```bash
composer install
```

3. **Crie dados de exemplo** (opcional):
- Acesse `http://localhost/leitor-excel-simples/criar_dados.php`
- Isso gerará um arquivo `teste.xlsx` com dados de exemplo

## 📖 Como Usar

1. **Acesse o sistema**:
   - `http://localhost/leitor-excel-simples/`

2. **Carregue o Excel**:
   - Clique em "Carregar Excel"
   - Os dados serão exibidos em uma tabela

3. **Adicione registros**:
   - Clique em "+ Novo Registro"
   - Preencha os campos
   - Clique em "Salvar" (salva automaticamente no Excel)

4. **Edite registros**:
   - Clique no botão ✎ na linha desejada
   - Modifique os dados
   - Clique em "Salvar" (salva automaticamente no Excel)

5. **Delete registros**:
   - Clique no botão ✕ na linha desejada
   - Confirme a exclusão
   - O registro é removido e salvo automaticamente

## 🎨 Cores do Tema Escuro

| Elemento | Cor | Código |
|----------|-----|--------|
| Fundo Principal | Cinza Escuro | #1a1a1a |
| Fundo Secundário | Cinza | #2d2d2d |
| Destaque | Ciano | #00d4ff |
| Sucesso | Verde | #00d084 |
| Erro | Vermelho | #ff4444 |
| Aviso | Laranja | #ffa500 |

## 📁 Estrutura de Arquivos

```
leitor-excel-simples/
├── index.php           # Página principal com HTML e lógica PHP
├── estilo.css          # Estilos do tema escuro (incluído em index.php)
├── script.js           # Lógica do CRUD em JavaScript (incluído em index.php)
├── teste.xlsx          # Arquivo Excel com os dados
├── composer.json       # Dependências do Composer
├── composer.lock       # Lock file do Composer
├── vendor/             # Pasta com a biblioteca PHPSpreadsheet
├── preferences.md      # Preferências de desenvolvimento
├── README.md           # Este arquivo
└── criar_dados.php     # Script para gerar dados de exemplo
```

## 🛠️ Preferências de Desenvolvimento

Siga as diretrizes em `preferences.md`:

- Indentação com **TAB**
- Unidades responsivas com **VW** quando possível
- Cores via variáveis CSS em `:root`
- Propriedades específicas (não shorthands genéricos)
- Sem comentários inline em CSS

## 🔧 Tecnologias Utilizadas

- **Backend**: PHP 7.4+
- **Biblioteca Excel**: PHPOffice/PHPSpreadsheet v5.3.0
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Banco de Dados**: Excel (.xlsx)

## 📝 Notas

- O arquivo Excel é salvo automaticamente a cada operação
- Mantém a primeira linha como header (cabeçalho)
- Suporta múltiplas colunas de qualquer tipo de dado
- Interface intuitiva com confirmação antes de deletar

## 🐛 Troubleshooting

### Erro: "Arquivo não encontrado"
- Verifique se `teste.xlsx` existe na pasta do projeto
- Acesse `criar_dados.php` para gerar um novo arquivo

### Erro ao ler Excel
- Certifique-se de que as dependências estão instaladas: `composer install`
- Verifique as permissões da pasta

### Dados não salvam
- Verifique se o arquivo `teste.xlsx` tem permissão de escrita
- Verifique os logs do PHP para mais detalhes

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. O arquivo `preferences.md` para diretrizes de desenvolvimento
2. O console do navegador (F12) para erros JavaScript
3. Os logs do PHP para erros do servidor

## 📄 Licença

Projeto de desenvolvimento livre. Sinta-se à vontade para modificar e compartilhar.

---

**Última atualização**: 17 de dezembro de 2025

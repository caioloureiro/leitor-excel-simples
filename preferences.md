## Exemplo de importação de CSS e JS

<style><?php require 'css/estilo.css'; ?></style>
<script><?php require 'js/script.js'; ?></script>

# Preferences

- Indentação: sempre TAB
- Foco em Float para layouts simples
- nunca usar 100vw, use sempre 100%
- CSS: usar unidades VW para medidas responsivas; evitar VH e PX quando possível; prefira percentuais quando aplicável
 - 1vw = largura da tela em px dividido por 100
- Cores: usar `white` e `black` explicitamente quando necessário fora do `:root`; todas as demais cores devem vir de variáveis em `:root` (ex.: `--karazan-bordo`, `--karazan-cream`)
- Fontes e espaçamento: usar as variáveis de `:root` para família, tamanho e altura de linha. Exemplos: `--ibarra`, `--linbiolinum`, `--segoe`, `--fontSizeTitulo`, `--lineHeightTitulo`, `--fontSizeTexto`, `--lineHeightTexto`, `--fontSizeBtn`
- Layout: padrão é `float:left` para seções simples; usar flexbox/grid apenas quando necessário
- Comentários: não adicionar comentários dentro de arquivos CSS; documentação do projeto e diretrizes devem ficar em `templates/preferences.md` ou em um README separado
- Propriedades: não usar shorthands genéricos (ex.: evite `background` e `border`); use propriedades específicas como `background-image`, `background-size`, `background-position`, `background-color`, `border-width`, `border-style`, `border-color`
- Start/End: cada arquivo view/css/js deve conter apenas os marcadores de início/fim no topo/rodapé do próprio arquivo como comentários, seguindo o padrão: `/* Start - caminho/arquivo.ext */` e `/* End - caminho/arquivo.ext */`. Fora esses marcadores, evite comentários inline em CSS.
- Branco/Preto literais: quando uma cor literal for equivalente a `#fff` ou `#ffffff` use `white`; quando for `#000` ou `#000000` use `black`.
- Formatação CSS: evitar linhas em branco desnecessárias; mantenha CSS conciso para facilitar inclusão inline quando necessário
- Importação: preferir includes/require para injetar CSS/JS nas views (ex.: `<?php require 'css/arquivo.css'; ?>`)

Notas rápidas de implementação

- Só é permitido comentário inline em CSS para os marcadores Start/End no topo e rodapé do arquivo. Comentários explicativos, TO-DOs ou exemplos devem ficar neste arquivo (`templates/preferences.md`) ou em `README.md`.
- Prefira usar variáveis do `:root` para qualquer cor, família de fontes, tamanhos e espaçamentos. Evite valores literais espalhados.
- Evite shorthands genéricos: use propriedades específicas para melhor controle e consistência.

Essas diretrizes devem ser seguidas em todos os projetos e tarefas. Se houver exceção, documentar no README do projeto.

## Modelo de componentes (exemplo sem comentários inline em CSS)

<!-- Start - caminho/do/arquivo.php -->
<?php // PHP aqui ?>
<style>
	/* CSS do componente — sem comentários inline */
</style>
<section>
<!-- HTML do componente -->
</section>
<script>
	// JS do componente — sem comentários inline
</script>
<!-- End - caminho/do/arquivo.php -->

## Modelo de CSS ou JS

/* Start - caminho/arquivo.css */
/* CSS ou JS aqui — sem comentários inline */
/* End - caminho/arquivo.css */

## Sempre colocar no README.md os dados do autor

Desenvolvido por Caio Loureiro.
Site: https://digitalmd.com.br
Informações do Desenvolvedor: https://digitalmd.com.br/caioloureiro/cv/
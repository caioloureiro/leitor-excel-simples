<?php
require __DIR__ . '/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();
$worksheet = $spreadsheet->getActiveSheet();

$dados = [
	['Nome', 'Sobrenome', 'Email', 'Telefone'],
	['João', 'Silva', 'joao@example.com', '11999999999'],
	['Maria', 'Santos', 'maria@example.com', '11888888888'],
	['Pedro', 'Oliveira', 'pedro@example.com', '11777777777'],
	['Ana', 'Souza', 'ana@example.com', '11666666666'],
];

foreach ($dados as $rowIndex => $row) {
	foreach ($row as $colIndex => $value) {
		$colLetter = chr(65 + $colIndex);
		$worksheet->getCell($colLetter . ($rowIndex + 1))->setValue($value);
	}
}

$writer = new Xlsx($spreadsheet);
$writer->save(__DIR__ . '/teste.xlsx');

echo "Arquivo teste.xlsx criado com sucesso! 📊<br>";
echo "Linhas: " . count($dados) . "<br>";
echo "Colunas: " . count($dados[0]) . "<br>";
echo "<a href='index.php'>Voltar para o CRUD</a>";
?>

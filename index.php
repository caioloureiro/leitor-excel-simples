<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao'])) {
	ob_clean();
	header('Content-Type: application/json; charset=utf-8');
	
	$arquivo = __DIR__ . '/teste.xlsx';
	$resposta = ['sucesso' => false, 'erro' => 'Ação desconhecida'];
	
	try {
		if ($_POST['acao'] === 'ler_excel') {
			if (!file_exists($arquivo)) {
				throw new Exception('Arquivo não encontrado: ' . $arquivo);
			}

			require __DIR__ . '/vendor/autoload.php';
			$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
			$spreadsheet = $reader->load($arquivo);
			$worksheet = $spreadsheet->getActiveSheet();
			$dados = [];
			
			$highestRow = $worksheet->getHighestRow();
			$highestColumn = $worksheet->getHighestColumn();
			
			for ($row = 1; $row <= $highestRow; $row++) {
				$rowData = [];
				for ($col = 'A'; $col <= $highestColumn; $col++) {
					$cell = $worksheet->getCell($col . $row);
					$rowData[] = $cell->getValue();
				}
				$dados[] = $rowData;
			}
			
			$resposta = ['sucesso' => true, 'dados' => $dados];
		}
		elseif ($_POST['acao'] === 'salvar_excel') {
			$dados = isset($_POST['dados']) ? json_decode($_POST['dados'], true) : null;
			
			if (!is_array($dados) || empty($dados)) {
				throw new Exception('Dados inválidos');
			}

			require __DIR__ . '/vendor/autoload.php';
			$spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
			$worksheet = $spreadsheet->getActiveSheet();
			
			foreach ($dados as $rowIndex => $row) {
				foreach ($row as $colIndex => $value) {
					$colLetter = chr(65 + $colIndex);
					$worksheet->getCell($colLetter . ($rowIndex + 1))->setValue($value);
				}
			}

			$writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
			$writer->save($arquivo);
			
			$resposta = ['sucesso' => true, 'mensagem' => 'Arquivo salvo com sucesso!'];
		}
	} catch (Exception $e) {
		$resposta = ['sucesso' => false, 'erro' => $e->getMessage()];
	}

	echo json_encode($resposta, JSON_UNESCAPED_UNICODE);
	exit();
}
?>
<!-- Start - index.php -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>CRUD Excel - Tema Escuro</title>
</head>
<body>

	<style><?php include 'estilo.css'; ?></style>

	<header>
		<h1>📊 CRUD Excel</h1>
		<p class="subtitle">teste.xlsx</p>
	</header>
	
	<main>
		<div class="container">
			<div class="controls">
				<button id="btnCarregar" class="btn-primary">Carregar Excel</button>
				<button id="btnNovo" class="btn-primary" disabled>+ Novo Registro</button>
				<button id="btnSalvar" class="btn-success" disabled style="display:none;">Salvar Excel</button>
			</div>

			<div id="formNovoRegistro" class="form-novo" style="display:none;">
				<h3>Novo Registro</h3>
				<div id="formCampos"></div>
				<div class="form-buttons">
					<button id="btnSalvarRegistro" class="btn-success">Salvar</button>
					<button id="btnCancelarRegistro" class="btn-secondary">Cancelar</button>
				</div>
			</div>

			<div id="resultado" class="resultado"></div>
		</div>
	</main>

	<script><?php include 'script.js'; ?></script>

</body>
</html>
<!-- End - index.php -->
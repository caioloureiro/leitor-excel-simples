/* Start - script.js */
document.addEventListener('DOMContentLoaded', function() {
	const btnCarregar = document.getElementById('btnCarregar');
	const btnNovo = document.getElementById('btnNovo');
	const btnSalvar = document.getElementById('btnSalvar');
	const btnSalvarRegistro = document.getElementById('btnSalvarRegistro');
	const btnCancelarRegistro = document.getElementById('btnCancelarRegistro');
	const resultado = document.getElementById('resultado');
	const formNovoRegistro = document.getElementById('formNovoRegistro');
	const formCampos = document.getElementById('formCampos');

	let dadosAtuais = null;
	let colunas = [];
	let linhaEmEdicao = null;

	btnCarregar.addEventListener('click', carregarExcel);
	btnNovo.addEventListener('click', abrirFormNovoRegistro);
	btnSalvar.addEventListener('click', salvarExcelManual);
	btnSalvarRegistro.addEventListener('click', salvarRegistro);
	btnCancelarRegistro.addEventListener('click', fecharFormNovoRegistro);

	function carregarExcel() {
		resultado.innerHTML = '<div class="loading">Carregando arquivo Excel</div>';
		btnCarregar.disabled = true;

		const formData = new FormData();
		formData.append('acao', 'ler_excel');

		fetch(window.location.href, {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			btnCarregar.disabled = false;

			if (data.sucesso) {
				dadosAtuais = data.dados;
				colunas = data.dados[0] || [];
				mostraTabela(data.dados);
				btnNovo.disabled = false;
				btnSalvar.style.display = 'inline-block';
			} else {
				resultado.innerHTML = `<div class="erro">✗ Erro: ${data.erro || 'Erro ao ler arquivo'}</div>`;
				btnNovo.disabled = true;
				btnSalvar.style.display = 'none';
			}
		})
		.catch(error => {
			btnCarregar.disabled = false;
			resultado.innerHTML = `<div class="erro">✗ Erro de conexão: ${error.message}</div>`;
			btnNovo.disabled = true;
			btnSalvar.style.display = 'none';
		});
	}

	function mostraTabela(dados) {
		if (!dados || dados.length === 0) {
			resultado.innerHTML = '<div class="erro">✗ Nenhum dado encontrado no Excel</div>';
			return;
		}

		let html = '<div class="sucesso">✓ Arquivo carregado! (' + dados.length + ' linhas)</div>';
		html += '<table><thead><tr>';

		const linhaHeader = dados[0];
		for (let i = 0; i < linhaHeader.length; i++) {
			html += '<th>' + (linhaHeader[i] || 'Coluna ' + (i + 1)) + '</th>';
		}
		html += '<th>Ações</th></tr></thead><tbody>';

		for (let i = 1; i < dados.length; i++) {
			html += '<tr data-linha="' + i + '">';
			for (let j = 0; j < dados[i].length; j++) {
				html += '<td>' + (dados[i][j] !== null && dados[i][j] !== undefined ? dados[i][j] : '') + '</td>';
			}
			html += '<td class="td-acoes">';
			html += '<button class="btn-info" onclick="editarLinha(' + i + ')">✎</button>';
			html += '<button class="btn-danger" onclick="deletarLinha(' + i + ')">✕</button>';
			html += '</td></tr>';
		}

		html += '</tbody></table>';
		resultado.innerHTML = html;
	}

	function abrirFormNovoRegistro() {
		linhaEmEdicao = null;
		formCampos.innerHTML = '';

		for (let i = 0; i < colunas.length; i++) {
			const colName = colunas[i] || 'Coluna ' + (i + 1);
			const grupo = document.createElement('div');
			grupo.className = 'form-group';
			grupo.innerHTML = `
				<label>${colName}</label>
				<input type="text" data-coluna="${i}" class="campo-entrada" />
			`;
			formCampos.appendChild(grupo);
		}

		formNovoRegistro.style.display = 'block';
		formNovoRegistro.scrollIntoView({ behavior: 'smooth' });
	}

	window.editarLinha = function(linhaIdx) {
		linhaEmEdicao = linhaIdx;
		formCampos.innerHTML = '';

		const linha = dadosAtuais[linhaIdx];

		for (let i = 0; i < colunas.length; i++) {
			const colName = colunas[i] || 'Coluna ' + (i + 1);
			const valor = linha[i] !== null && linha[i] !== undefined ? linha[i] : '';
			const grupo = document.createElement('div');
			grupo.className = 'form-group';
			grupo.innerHTML = `
				<label>${colName}</label>
				<input type="text" data-coluna="${i}" class="campo-entrada" value="${valor}" />
			`;
			formCampos.appendChild(grupo);
		}

		const titulo = formNovoRegistro.querySelector('h3');
		titulo.textContent = 'Editar Registro #' + linhaIdx;

		formNovoRegistro.style.display = 'block';
		formNovoRegistro.scrollIntoView({ behavior: 'smooth' });
	};

	window.deletarLinha = function(linhaIdx) {
		if (confirm('Tem certeza que deseja deletar esta linha?')) {
			dadosAtuais.splice(linhaIdx, 1);
			mostraTabela(dadosAtuais);
			salvarExcelAutomatico('Linha deletada e salva!');
		}
	};

	function salvarRegistro() {
		const campos = formCampos.querySelectorAll('.campo-entrada');
		const novaLinha = [];

		campos.forEach(campo => {
			novaLinha.push(campo.value);
		});

		if (linhaEmEdicao === null) {
			dadosAtuais.push(novaLinha);
		} else {
			dadosAtuais[linhaEmEdicao] = novaLinha;
		}

		mostraTabela(dadosAtuais);
		fecharFormNovoRegistro();
		salvarExcelAutomatico(linhaEmEdicao === null ? 'Novo registro adicionado e salvo!' : 'Registro editado e salvo!');
	}

	function fecharFormNovoRegistro() {
		formNovoRegistro.style.display = 'none';
		formNovoRegistro.querySelector('h3').textContent = 'Novo Registro';
		linhaEmEdicao = null;
	}

	function salvarExcelAutomatico(mensagem) {
		btnSalvar.disabled = true;

		const formData = new FormData();
		formData.append('acao', 'salvar_excel');
		formData.append('dados', JSON.stringify(dadosAtuais));

		fetch(window.location.href, {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			btnSalvar.disabled = false;

			if (data.sucesso) {
				resultado.insertAdjacentHTML('afterbegin', '<div class="sucesso">✓ ' + mensagem + '</div>');
			} else {
				resultado.insertAdjacentHTML('afterbegin', '<div class="erro">✗ Erro ao salvar: ' + data.erro + '</div>');
			}
		})
		.catch(error => {
			btnSalvar.disabled = false;
			resultado.insertAdjacentHTML('afterbegin', '<div class="erro">✗ Erro: ' + error.message + '</div>');
		});
	}

	function salvarExcelManual() {
		salvarExcelAutomatico('Excel salvo manualmente!');
	}
});
/* End - script.js */
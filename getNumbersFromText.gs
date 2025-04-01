function getNumbersFromText(texto){
  // abre aba da tabela ASCII
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Tabela ASCII");
  
  // guarda a ultima linha da planilha
  var last = sh.getLastRow();
  // pega os dados da tabela ASCII base (linha_inicio, coluna_inicio, linha_fim, coluna_fim)
  var data = sh.getRange(3,1,last,8).getValues();

  // data[rn][0] = simbolo/texto
  // data[rn][1] = sequencia numerica das letras
  // data[rn][2] = primos
  // data[rn][3] = decimal
  // data[rn][4] = octal
  // data[rn][5] = hexadecimal
  // data[rn][6] = binário
  // data[rn][7] = numero HTML

  // monta map de letras e numeros para a coluna Alfabeto
  mapLetrasNumeros = buildMapTextNumbers(data, last, 1);

  // monta map de letras e numeros para a coluna Primos
  mapLetrasPrimos = buildMapTextNumbers(data, last, 2);

  // monta map de detras e decimais para a coluna Decimal
  mapLetrasDECASCII = buildMapTextNumbers(data, last, 3);

  // monta map de detras e octais para a coluna Octal
  mapLetrasOCTASCII = buildMapTextNumbers(data, last, 4);

  // monta map de detras e hexadecimais para a coluna Hexadecimal
  mapLetrasHEXASCII = buildMapTextNumbers(data, last, 5);

  // monta map de detras e binarios para a coluna Binário
  mapLetrasBINASCII = buildMapTextNumbers(data, last, 6);

  // monta map de detras e numero HTML para a coluna Numero HTML
  mapLetrasHTMLASCII = buildMapTextNumbers(data, last, 7);

  var ret = [];
  var letra = '';
  for(i=0; i<texto.length; i++){
    var col = [];
    // pega letra
    letra = texto.charAt(i);
    // coluna Letra
    col[0] = letra;
    // coluna Alfabeto
    col[1] = mapLetrasNumeros.get(letra);
    // coluna Primos
    col[2] = mapLetrasPrimos.get(letra);
    // coluna Decimal ASCII
    col[3] = mapLetrasDECASCII.get(letra);
    // coluna Octal ASCII
    col[4] = mapLetrasOCTASCII.get(letra);
    // coluna Hexadecimal ASCII
    col[5] = mapLetrasHEXASCII.get(letra);
    // coluna Binários ASCII
    col[6] = mapLetrasBINASCII.get(letra);
    // coluna Números HTML
    col[7] = mapLetrasHTMLASCII.get(letra);
    // guarda os dados na tabela de retorno
    ret[i] = col;
  }
  // retorna tabela preenchida
  return ret;
}

function buildMapTextNumbers(data, last, numCol){
  var map = new Map();
  for(rn=0;rn<last;rn++){
    map.set(data[rn][0],data[rn][numCol]);
    console.log(data[rn][numCol]);
  };
  return map
}

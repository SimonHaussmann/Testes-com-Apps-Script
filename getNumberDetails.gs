function getNumberDetails(number){
  // abre aba da tabela ASCII
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Tabela ASCII");
  
  // guarda a ultima linha da planilha
  var last = sh.getLastRow();
  // pega os dados da tabela ASCII base (linha_inicio, coluna_inicio, linha_fim, coluna_fim)
  var data = sh.getRange(3,1,last,8).getValues();

  // data[rn][0] = numero
  // data[rn][1] = sequencia das letras do numero
  // data[rn][2] = letras dos primos
  // data[rn][3] = decimal
  // data[rn][4] = octal
  // data[rn][5] = hexadecimal
  // data[rn][6] = binário
  // data[rn][7] = numero HTML

  // monta map de letras e numeros para a coluna Alfabeto
  mapLetrasNumeros = buildMapNumberDetails(data, last, 1);

  // monta map de letras e numeros para a coluna Primos
  mapLetrasPrimos = buildMapNumberDetails(data, last, 2);

  // monta map de detras e decimais para a coluna Decimal
  mapLetrasDECASCII = buildMapNumberDetails(data, last, 3);

  // monta map de detras e octais para a coluna Octal
  mapLetrasOCTASCII = buildMapNumberDetails(data, last, 4);

  // monta map de detras e hexadecimais para a coluna Hexadecimal
  mapLetrasHEXASCII = buildMapNumberDetails(data, last, 5);

  // monta map de detras e binarios para a coluna Binário
  mapLetrasBINASCII = buildMapNumberDetails(data, last, 6);

  // monta map de detras e numero HTML para a coluna Numero HTML
  mapLetrasHTMLASCII = buildMapNumberDetails(data, last, 7);

  var ret = [];
  var numb = '';
  var countLine = 0;
  const numberSplitted = number.split(' ');
  for(let i in numberSplitted){
    var col = [];
    // pega numero
    numb = numberSplitted[i];
    // coluna Numero
    col[0] = numb;
    // coluna Alfabeto
    col[1] = mapLetrasNumeros.get(numb);
    // coluna Primos
    col[2] = mapLetrasPrimos.get(numb);
    // coluna Decimal ASCII
    col[3] = mapLetrasDECASCII.get(numb);
    // coluna Octal ASCII
    col[4] = mapLetrasOCTASCII.get(numb);
    // coluna Hexadecimal ASCII
    col[5] = mapLetrasHEXASCII.get(numb);
    // coluna Binários ASCII
    col[6] = mapLetrasBINASCII.get(numb);
    // coluna Números HTML
    col[7] = mapLetrasHTMLASCII.get('&#'+numb+';');
    
    // guarda os dados na tabela de retorno
    ret[i] = col;
  }
  // retorna tabela preenchida
  return ret;
}

function buildMapNumberDetails(data, last, numCol){
  var map = new Map();
  for(rn=0;rn<last;rn++){
    map.set(data[rn][numCol],data[rn][0]);
  };
  return map
}

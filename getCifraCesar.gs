function getCifraCesar(texto,chave) {
  // to test
  // texto = "A"; chave = 2;

  // garante que é uppercase
  texto = texto.toUpperCase();

  // abre aba da tabela ASCII
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Tabela ASCII");
  // pega somente os dados de letras maiusculas e numeros dos dados da tabela ASCII base (linha_inicio, coluna_inicio, linha_fim, coluna_fim)
  var data = sh.getRange(3,1,27,2).getValues();

  // data[rn][0] = simbolo/texto
  // data[rn][1] = sequencia numerica das letras

  // monta map de letras e numeros
  mapLetrasNumeros = buildMapTextNumbersToCesar(data, 27, 1);


  var ret = [];
  for(i=0; i<texto.length; i++){
    var col = [];
    // pega letra
    letra = texto.charAt(i);
    // coluna Original
    col[0] = letra;
    // coluna +chave (numero)
    var numbKey = getCesarNumber(mapLetrasNumeros,letra,chave);
    col[1] = numbKey;
    // coluna +chave (letra)
    col[2] = getCesarTxtFromNumber(mapLetrasNumeros,numbKey);
    // coluna -chave (numero)
    var numbKey = getCesarNumber(mapLetrasNumeros,letra,-chave);
    col[3] = numbKey;
    // coluna -chave (letra)
    col[4] = getCesarTxtFromNumber(mapLetrasNumeros,numbKey);
    
    // guarda os dados na tabela de retorno
    ret[i] = col;
  }
  return(ret);
}

function getCesarNumber(mapLetrasNumeros, letra, chave){
  var number = 0;
  number = mapLetrasNumeros.get(letra);

  number = Number(number) + Number(chave);

  return number
}

function getCesarTxtFromNumber(mapLetrasNumeros, number){
  // caso a chave seja maior que 26, deve fazer o loop nas letas mais de 1x
  var times = 1;
  times = Math.abs(number/26);
  
  // loop nas letras  
  while(times >= 0){
    if(number <= 0){
      number = number + 26;
    }else if(number > 26){
      number = number - 26;
    }
    times--;
  }
  var numStr = '';
  numStr = String(Math.abs(number));
  
  var letra = '';
  letra = mapLetrasNumeros.get(numStr);

  return letra
}

function buildMapTextNumbersToCesar(data, last, numCol){
  var map = new Map();
  // letra - numero
  for(rn=0;rn<last;rn++){
    map.set(data[rn][0],data[rn][numCol]);
  };
  // numero - letra
  for(rn=0;rn<last;rn++){
    map.set(data[rn][numCol],data[rn][0]);
  };
  return map
}

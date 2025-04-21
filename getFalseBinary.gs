function getFalseBinary(number) {
  // to test
  // number = "1234321";
  
  var numberStr = String(number);

  var ret = [];
  var numb = "";
  var actualBinaryNum = "0";
  for(i=0; i<numberStr.length; i++){
    var col = [];
    numb = numberStr.charAt(i);
    col[0] = numb;
    col[1] = actualBinaryNum.repeat(numb);
    if(actualBinaryNum=="0"){
      actualBinaryNum = "1";
    }else{
      actualBinaryNum = "0";
    }
    ret[i] = col;
  }
  return ret;
}

function getLongBinaryToText(longBinary){
  // to test
  // longBinary = "011000111100011011111111010000011											";

  longBinary = longBinary.trim();

  if(longBinary.length < 8){
    console.log("ERRO! O Binário precisa ter no mínimo 8 dígitos!");
    return "O Binário precisa ter no mínimo 8 dígitos!";
  }

  // abre aba da tabela ASCII
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Tabela ASCII");

  // guarda a ultima linha da planilha
  var last = sh.getLastRow();
  // pega os dados da tabela ASCII base (linha_inicio, coluna_inicio, linha_fim, coluna_fim)
  var data = sh.getRange(3,1,last,8).getValues();

  // monta map de detras e hexadecimais para a coluna Hexadecimal
  mapLetrasBINASCII = buildMapNumberDetails(data, last, 6);

  var ret = [];
  var countDig = 0;
  var countLoop = 0;
  while(countDig < longBinary.length){
    // loop 8 by 8 to take the binarys
    var bin = "";
    var col = [];
    for(i=0;i<8;i++){
      numb = String(longBinary.charAt(countDig));
      // break if this is the end of the string
      if(numb == ""){
        break;
      }else if(numb != "1" && numb != "0"){
        console.log("ERRO! Número diferente de zero ou um encontrado: >"+numb+"<");
        return "Número diferente de zero ou um encontrado!";
      }
      bin += String(numb);
      countDig++;
    }
    // record the binary
    col[0] = bin;
    // get the ASCII digit for the binary
    col[1] = mapLetrasBINASCII.get(bin);
    ret[countLoop] = col;
    countLoop++;
  }
  return ret;
}

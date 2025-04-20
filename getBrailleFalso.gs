function getBrailleFalso(valuesRange) {
  var ss = SpreadsheetApp.getActive();
  const sh = ss.getActiveSheet();

  // pega os dados das 3 tabelas base (linha_inicio, coluna_inicio, linha_fim, coluna_fim)
  var data = [];
  data[0] = sh.getRange(3,2,3,3).getValues();
  data[1] = sh.getRange(7,2,3,3).getValues();
  data[2] = sh.getRange(11,2,3,3).getValues();
  
  // pega os valores a serem buscados nas tabelas
  var values = valuesRange.filter(String);

  var ret = [];
  for(i in values){
    value = values[i][0];

    num1= String(value).charAt(0);
    num2= String(value).charAt(1);
    num3= String(value).charAt(2);

    if(num1 > 3 || num2 > 3 || num3 > 3){return "Erro: Número maior que 3 encontrado!";}

    val = data[num1-1][num2-1][num3-1]
    ret[i] = val;
  }
  return ret;
}

var dependencyObj= {
    'FIELDS':['Planta Envasado','Cabezal'],           'VALUES':{
        '1 CAJICÁ':['No tiene','P','Q','V','T','U','M','N','C','D','Y1','Y2','Y3','Y4','J','K','L','R','S','E','F','W','X','O','A','B' ],
        '2 PALMIRA':['No tiene','D','E','F','G','A','B'],            
        '4 MEDELLÍN':['No tiene','E11','E12','E13','C','D'],
        '5 BUCARAMANGA':['No tiene','1','2','3','4','5','6','P','A','B','C','D','EL 1','EL 2','EL 3','B1','B2','B3','BA','BB','EL1','EL2','EL3',],
        '6 AGUACHICA':['No tiene','A','B','C','D','E','F','G','H','I','J','K','L','M'],     
        '7 QDV':['No tiene'],           
        'MAQUILAS':['No tiene'] ,
        'NO TIENE':['No tiene'] ,
        'AREQUIPE':['No tiene'] ,
        'YOGURT CAJICÁ':['No tiene'],
        'PEC': ['W','X','A','B','C','D','E','F','P','Q','R','S','T','U','J','K','L','M','N','O','Y1','Y2','Y3','Y4','ASTEPO','V','TBA-19','TBA-21','ECOLEAN']
        }
  };
  $CS.setFieldDependency(dependencyObj);

var dependencyObj= {
    'FIELDS':['Planta Envasado','Cabezal'],
    'VALUES':{
    '1 CAJICÁ':['No tiene','W','X','A','B','C','D','E','F','P','Q','R','S','T','U','J','K','L','M','N','O','Y1','Y2','Y3','Y4','ASTEPO','V','TBA-19','TBA-21','ECOLEAN'],
    '2 PALMIRA':['No tiene','D','E','F','G','A','B'],            
    '4 MEDELLÍN':['No tiene','E11','E12','E13','C','D'],
    '5 BUCARAMANGA':['No tiene','1','2','3','4','5','6','P','A','B','C','D','EL 1','EL 2','EL 3','B1','B2','B3','BA','BB','EL1','EL2','EL3',],
    '6 AGUACHICA':['No tiene','A','B','C','D','E','F','G','H','I','J','K','L','M'],     
    '7 QDV':['No tiene'],           
    'MAQUILAS':['No tiene'] ,
    'NO TIENE':['No tiene'] ,
    'AREQUIPE':['No tiene'] ,
    'YOGURT CAJICÁ':['No tiene'],
    }
  };
  $CS.setFieldDependency(dependencyObj);


// 59 cabezal
// 68 planta envasado
// 72 envasadora
// 73 esterilizadora
var cab=$CS.getValue("WorkOrder_Fields_1501_UDF_CHAR59");
var pla=$CS.getValue("WorkOrder_Fields_1501_UDF_CHAR68");

//CAJICA
PEC
if (cab==="W" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 0");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 13000");}
    else if (cab==="X" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 0");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 13000");}
    else if (cab==="A" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 1");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 8000");}
    else if (cab==="B" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 1");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 8000");}
    else if (cab==="C" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 2");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 8000");}
    else if (cab==="D" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 2");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 8000");}
    else if (cab==="E" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 3");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 13000");}
    else if (cab==="F" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 3");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 13000");}
    else if (cab==="P" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 8");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}
    else if (cab==="Q" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 8");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}
    else if (cab==="R" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 9");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 13000");}
    else if (cab==="S" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 9");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 13000");}
    else if (cab==="T" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 10");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}
    else if (cab==="U" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Prepac 10");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}
    else if (cab==="J" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 2");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="K" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 2");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="L" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 2");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="M" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 3");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="N" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 3");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="O" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 3");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="Y1" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 4");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="Y2" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 4");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="Y3" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 4");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="Y4" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Elcster 4");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 24000");}
    else if (cab==="ASTEPO" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","Astepo");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}
    else if (cab==="V" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","As-1");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}
    else if (cab==="TBA-19" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","TBA-19");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 8000");}
    else if (cab==="TBA-21" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","TBA-21");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 8000");}
    else if (cab==="ECOLEAN" && pla==="CAJICÁ"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ECOLEAN");
    $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","ST 4000");}

//PALMIRA
else if (cab==="D" && pla==="2 PALMIRA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPACK 0");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","FINNATH");}
else if (cab==="E" && pla==="2 PALMIRA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPACK 0");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","FINNATH");}
else if (cab==="F" && pla==="2 PALMIRA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPACK 2");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","FINNATH");}
else if (cab==="G" && pla===" 2 PALMIRA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPACK 2");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","FINNATH");}
else if (cab==="A" && pla==="2 PALMIRA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPACK 1");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORCK");}
else if (cab==="B" && pla==="2 PALMIRA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPACK 1");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORCK");}
else if (cab==="No tiene" && pla==="2 PALMIRA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","N/A");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}

//MEDELLIN
else if (cab==="E11" && pla==="4 MEDELLÍN"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORK 12000 / STORK 4000");}
else if (cab==="E12" && pla==="4 MEDELLÍN"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORK 12000 / STORK 4000");}
else if (cab==="E13" && pla==="4 MEDELLÍN"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORK 12000 / STORK 4000");}
else if (cab==="C" && pla==="4 MEDELLÍN"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORK 12000 / STORK 4000");}
else if (cab==="D" && pla==="4 MEDELLÍN"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","STORK 12000 / STORK 4000");}
else if (cab==="No tiene" && pla==="4 MEDELLÍN"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","N/A");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}

//BUCARAMANGA
else if (cab==="1" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 330");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="2" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 330");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="3" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 330");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="4" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 2728");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="5" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 2728");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="6" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 2728");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="P" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC 1");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="A" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC 1");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="B" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC 1");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="C" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC 2");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="D" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC 2");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="EL 1" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="EL 2" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="EL 3" && pla==="5 BUCARAMANGA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 15000");}
else if (cab==="No tiene" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","N/A");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}

else if (cab==="B1" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 1330");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="B2" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 1330");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="B3" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI 1330");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="BA" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC I");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="BB" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","PREPAC I");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="EL1" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER ");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="EL2" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER ");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}
else if (cab==="EL3" && pla==="5 BUCARAMANGA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ELECSTER ");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}

//AGUACHICA
else if (cab==="A" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A31");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 10000");}
else if (cab==="B" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A31");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 10000");}
else if (cab==="C" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A31");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 10000");}
else if (cab==="D" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A32");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 5000");}
else if (cab==="E" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A32");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 5000");}
else if (cab==="F" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A32");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","REDA 5000");}
else if (cab==="G" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A2");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");}
else if (cab==="H" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A2");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");}
else if (cab==="I" && pla==="6 AGUACHICA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A4");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");} 
else if (cab==="J" && pla==="6 AGUACHICA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A4");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");}
else if (cab==="K" && pla==="6 AGUACHICA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A4");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");}
else if (cab==="L" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A4");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");}
else if (cab==="M" && pla==="6 AGUACHICA"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","ESSI A4");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","");}
else if (cab==="No tiene" && pla==="6 AGUACHICA"){$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","N/A");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}

//RESTANTES
else if (cab==="No tiene" && pla==="7 QDV"){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","N/A");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}

else if ( pla==="MAQUILAS" || pla==="NO TIENE" || pla==="AREQUIPE"  || pla==="YOGURT CAJICÁ" ){ $CS.setValue("WorkOrder_Fields_1501_UDF_CHAR72","N/A");
$CS.setValue("WorkOrder_Fields_1501_UDF_CHAR73","N/A");}




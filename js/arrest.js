var fs=require('fs');

var readLine=require('readline');
var rd=readLine.createInterface(
  {
  input: fs.createReadStream('crime.csv'),// to fetch csv file
  });

var count=0;
var obtrue={};// object when the arrest has been there for assault cases
var obfalse={};// object when the arrest has not been there for assault cases
var final=[]; //array to push final onject

rd.on('line', function(line)// to read csv file line by line
{

  var data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);// split the line  using comma and ignoring comma if itis inside a string


  if (count == 0)
  {
    
    indexPrimary = data.indexOf('Primary Type');
    indexArrest = data.indexOf('Arrest');
    indexYear = data.indexOf('Year');
    count=count+1;

  }

   else
   {     
    //console.log('hi',data[indexArrest]);
       if(data[indexPrimary]=="ASSAULT" && data[indexArrest]=="true" && !obtrue[data[indexYear]])
       {
         obtrue[data[indexYear]]=1;//if the object is not there for a particular year it will be created
         
       }
       else if(data[indexPrimary]=="ASSAULT" && data[indexArrest]=="true")
       {
         obtrue[data[indexYear]]=obtrue[data[indexYear]]+1;//if the object is already there for a particular year it will be increased by 1

       }
       else if(data[indexPrimary]=="ASSAULT" && data[indexArrest]=="false" && !obfalse[data[indexYear]])
        {
          obfalse[data[indexYear]]=1; //if the object is not there for a prticular year it will be created
        }
        else if(data[indexPrimary]=="ASSAULT" && data[indexArrest]=="false")
        {
        obfalse[data[indexYear]]=obfalse[data[indexYear]]+1;//if the object is already there for a particular year it will be increased by 1
        }
  }
});
// after the lines have been read
rd.on('close', function()
{
  for (var i in obtrue)
  {
    //creating the final object having three keys
    var obfinal=
    {
      "Arrests": obtrue[i],
      "NonArrests": obfalse[i],
      "year": i
    };

   

      //pushing the final object into array
    final.push(obfinal);
    
  }
    fs.writeFileSync('../html/arrest.json',JSON.stringify(final),"utf8",function(err){console.log(err);});
    console.log("converted");

});

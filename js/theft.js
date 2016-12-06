var fs=require("fs");
var readLine=require("readline");

var rl=readLine.createInterface(
 {
 input: fs.createReadStream("crime.csv"),// to fetch csv file
 });


var count=0;
var ob1={},ob2={};
var final=[]//array to push final onject
rl.on('line', function(line)// to read csv file line by line
{
  var data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)// split the line  using comma and ignoring comma if itis inside a string
  

  if (count == 0)
  {
    indexPrimary = data.indexOf('Primary Type');
      indexDescription = data.indexOf('Description');
      //console.log(indexDescription);
      indexYear = data.indexOf('Year');
    count=count+1;
  }
  else  if(data[indexYear]>=2001 && data[indexYear]<=2016)
  {

     
          if(data[indexPrimary] =="THEFT" && data[indexDescription]=="OVER $500" && !ob1[data[indexYear]])
          {
            ob1[data[indexYear]]=1;//if the object is not there for a particular year it will be created
          }

          else if(data[indexPrimary] =="THEFT" && data[indexDescription]=="OVER $500")
          {
            ob1[data[indexYear]]=ob1[data[indexYear]]+1;  //if the object is already there for a particular year it will be increased by 1
                    

          }
          else if(data[indexPrimary] =="THEFT"  && data[indexDescription]=="$500 AND UNDER" && !ob2[data[indexYear]])
          {
              ob2[data[indexYear]]=1;//if the object is not there for a particular year it will be created
                       

          }
          else if(data[indexPrimary] =="THEFT"  && data[indexDescription]=="$500 AND UNDER")
          {
            ob2[data[indexYear]] =ob2[data[indexYear]]+1;//if the object is already there for a particular year it will be increased by 1
                    


          }

  }


});

// after the lines have been read

rl.on('close',function()
{
  for (var i in ob1)
  {
   	var obfinal=
   	{
		"OVER$500":ob1[i],
  		"$500ANDUNDER":ob2[i],
  		"year":i
   	};
    final.push(obfinal);
 	}

	fs.writeFileSync("../html/theft.json",JSON.stringify(final),"utf8",function(err){console.log(err);});
   console.log("converted");
});
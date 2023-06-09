
// exports=module.exports bydefault we use only exports instead of module.exports
// exports simply mean is to use a function with other file using exports and destination file use require method to use it .
module.exports.getDate=getDate;
module.exports.getDay =getDay;
// console.log(getDate());


var getDate=function ( ) {
    var day = new Date();
   
    var options={
        weekday:'long',
        day:"numeric",
        month:'long'
    };
    var today=day.toLocaleDateString("en-US",options);
  return today;

}
function getDay( ) {
    var day = new Date();
   
    var options={
        weekday:'long'
       
    };
    var today=day.toLocaleDateString("en-US",options);
  return today;

}
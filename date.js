exports.date=function(){
   var today=new Date();
     const options={
        day:'numeric',
        month:'long',
        year:'numeric'
     }
 return today.toLocaleTimeString('en-US',options);
}

function output(){
var a =parseInt(document.getElementById('val1').value);
var b =parseInt(document.getElementById('val2').value);
var val3 =document.getElementById('val3');
 var output=document.getElementById('output');
//   output.innerText= a+b;
 var c=a+b;
output.innerHTML = "<b class='text-info'>"+ c +"</b>";
val3.value=c;
}


function go() {
    let button = document.getElementById('btn');
    // console.log(button);

    // button.className = "btn btn-danger";

    if (button.className === "btn btn-info") {
        button.className = "btn btn-dark"; 
    } else {
        button.className = "btn btn-info";
    }
}
   
var arr=[100,"saket",21];
var obj={
    roll:100,
    name:"saket",
    age:20
}
console.log(obj);
console.log(obj.name);
console.log(arr[2]);

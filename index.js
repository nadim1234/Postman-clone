var addParam=document.getElementsByClassName("addParam")[0];
var paralist=document.getElementsByClassName("paralist")[0];
var jsonRadio=document.getElementById("json");
var customParametersRadio=document.getElementById("customParameters");
var requestJson=document.getElementsByClassName("requestJson")[0];

paralist.style.display='none'
var parameters=document.getElementsByClassName("parameters")[0]
var paramCount=1;
document.getElementsByClassName("addParam")[0].addEventListener("click",addparam)
function addparam(e){
    paramCount++;
    let newParam=`<div class="parameterPair"><input type="text" id="parameterKey${paramCount}" placeholder="Enter Parameter key" />&nbsp;
                        <input type="text" id="parameterValue${paramCount}" placeholder="Enter Parameter Value" />
                        <button id='removeButton' onclick='removeParameterPair(this)'>-</button>
                        <div>`
    var tempdiv=document.createElement('div')
    tempdiv.innerHTML=newParam
    parameters.appendChild(tempdiv)
    document.getElementsByClassName("addParam")[0].addEventListener("click",addparam)
}
jsonRadio.addEventListener("click",()=>{
    paralist.style.display='none';
    requestJson.style.display='flex'
})

customParametersRadio.addEventListener("click",()=>{
    paralist.style.display='flex';
    requestJson.style.display='none'
})

function removeParameterPair(e){
e.parentElement.remove()
}

console.log(document.getElementById('response').innerHTML)
document.getElementById('submit').addEventListener('click',()=>{
    var requestType=document.querySelector("input[name='requestType']:checked").value
    if(requestType=='get'){
    document.getElementById('response').innerHTML="fetching data"
    var url=document.getElementById('url').value;
    fetch(url).then(response=>{
        return response.json();
    }).then(data=>{ 
        console.log(data)
        document.getElementById('response').innerHTML= JSON.stringify(data)
    
    })
}
else{
    var contentType=document.querySelector("input[name='contentType']:checked").value
    var data={}
    if(contentType=='json'){
        data=document.getElementById('requestJsonText').value
        console.log(data)
    }
    else{
        for(var i=1;i<=paramCount;i++){
            if(document.getElementById(`parameterKey${i}`)){
            var key=document.getElementById(`parameterKey${i}`).value;
            var value=document.getElementById(`parameterValue${i}`).value;
            data[key]=value
            }
        }
        data=JSON.stringify(data)
    }
    document.getElementById('response').innerHTML="Posting data"
    var url=document.getElementById('url').value;
    fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        method: "POST",
        body: data
    }).then(data=>data.text()).then(text=>{
        console.log(text)
        document.getElementById('response').innerHTML= text
    })
}

})
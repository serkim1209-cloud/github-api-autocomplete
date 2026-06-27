const text = document.querySelector("input");
const autoText = document.querySelector("#list");
const down = document.querySelector("#down")
let timer ;
text.addEventListener("input", ()=> {
clearTimeout(timer);
if(!text.value.trim()){
autoText.innerHTML = ""
return;
}
timer = setTimeout(()=>{
getApi(text.value)},2000);
});

async function getApi(query){
try{
const get = await fetch(`https://api.github.com/search/repositories?q=${query}`);
const data = await get.json();
const first5 = data.items.slice(0,5);
autoText.innerHTML = "";
first5.forEach(repo => {
const li = document.createElement("li");
li.textContent = repo.name;
autoText.append(li);
li.addEventListener("click",()=>{
const div = document.createElement("div");
div.id = "inlist";
div.innerHTML =`
Name: ${repo.name}<br>
Owner: ${repo.owner.login}<br>
Stars: ${repo.stargazers_count}
`;
const button = document.createElement("button");
button.textContent ="×";
button.addEventListener("click",()=>{
div.remove();
});
div.append(button);
down.append(div);
text.value = "";
autoText.innerHTML = "";
});
});
}catch(error){
console .log("Произошла ошибка")
}
}
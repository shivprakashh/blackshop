async function sug(cate,subcate){
 const resp =   await fetch(``,{method:"POST",headers:{'Content-Type':'application/json'},body:{cate:cate}})
return resp.json();
}
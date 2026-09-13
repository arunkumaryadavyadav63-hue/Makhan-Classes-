const classButtons=document.getElementById("classButtons");
const adminClass=document.getElementById("adminClass");
for(let i=1;i<=8;i++){
  const b=document.createElement("button"); b.textContent=`Class ${i}`;
  b.onclick=()=>showClass(i); classButtons.appendChild(b);
  const o=document.createElement("option"); o.textContent=`Class ${i}`; o.value=i; adminClass.appendChild(o);
}
function getVideos(){return JSON.parse(localStorage.getItem("makhanVideos")||"[]")}
function showClass(c){
  const area=document.getElementById("content"); area.classList.remove("hidden");
  const videos=getVideos().filter(v=>String(v.cls)===String(c));
  area.innerHTML=`<h2>Class ${c} – Video Classes</h2>`+
    (videos.length?videos.map(v=>`<div class="video"><b>${escapeHtml(v.title)}</b><br><small>${v.subject}</small><br><a href="${v.url}" target="_blank"><button>▶️ Video देखें</button></a></div>`).join(""):"<p>अभी इस Class के लिए कोई वीडियो प्रकाशित नहीं है।</p>");
  area.scrollIntoView({behavior:"smooth"});
}
function addVideo(){
  const title=document.getElementById("title").value.trim(), cls=adminClass.value,
        subject=document.getElementById("subject").value, url=document.getElementById("video").value.trim();
  if(!title||!url){document.getElementById("msg").textContent="Video नाम और YouTube link भरें।";return}
  const a=getVideos(); a.push({title,cls,subject,url}); localStorage.setItem("makhanVideos",JSON.stringify(a));
  document.getElementById("msg").textContent="✅ Video Publish हो गया। अब Class चुनकर देखें।";
  document.getElementById("title").value=""; document.getElementById("video").value="";
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

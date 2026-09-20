document.querySelectorAll('.print-page').forEach(b=>b.addEventListener('click',()=>window.print()));
const slides=[...document.querySelectorAll('.demo-slide')];let current=0;
function showSlide(index){current=Math.max(0,Math.min(slides.length-1,index));slides.forEach((slide,i)=>slide.hidden=i!==current);document.getElementById('slide-count').textContent=`Slide ${current+1} of ${slides.length}`;document.getElementById('previous').disabled=current===0;document.getElementById('next').disabled=current===slides.length-1;}
if(slides.length){document.getElementById('previous').addEventListener('click',()=>showSlide(current-1));document.getElementById('next').addEventListener('click',()=>showSlide(current+1));document.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA','BUTTON','A','SUMMARY'].includes(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();showSlide(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();showSlide(current-1);}});showSlide(0);}
let closedNotes=[];
window.addEventListener('beforeprint',()=>{closedNotes=[...document.querySelectorAll('.speaker-notes:not([open])')];closedNotes.forEach(note=>note.open=true);});
window.addEventListener('afterprint',()=>closedNotes.forEach(note=>note.open=false));

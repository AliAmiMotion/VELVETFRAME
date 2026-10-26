const root=document.documentElement;
const cursor=document.querySelector('.cursor-orbit');
window.addEventListener('pointermove',e=>{
  const x=(e.clientX/innerWidth-.5)*2,y=(e.clientY/innerHeight-.5)*2;
  root.style.setProperty('--mx',x.toFixed(3));root.style.setProperty('--my',y.toFixed(3));
  cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`;
});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting)entry.target.classList.add('visible');
}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('a,button,.glasses-stage').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='48px';cursor.style.height='48px'});
  el.addEventListener('mouseleave',()=>{cursor.style.width='26px';cursor.style.height='26px'});
});

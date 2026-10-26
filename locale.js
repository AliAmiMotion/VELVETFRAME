(() => {
  const prices = {'49 GEL':'$18 USD','59 GEL':'$22 USD','69 GEL':'$26 USD','89 GEL':'$33 USD','99 GEL':'$37 USD','109 GEL':'$40 USD'};
  const copy = {
    about:['About','ჩვენ შესახებ'], shop:['Shop','მაღაზია'], contact:['Contact','კონტაქტი'],
    aboutTitle:['Eyewear for your other self.','სათვალე შენი მეორე მე-სთვის.'],
    aboutDescription:['Velvet Frame is an edit of bold, playful eyewear made for people who treat getting dressed like world-building. Futuristic silhouettes, nostalgic glamour and frames that never disappear into the background.','Velvet Frame თამამი და გამორჩეული სათვალეების შერჩეული კოლექციაა მათთვის, ვისთვისაც ჩაცმა საკუთარი სამყაროს შექმნაა. ფუტურისტული სილუეტები, ნოსტალგიური გლამური და ჩარჩოები, რომლებიც არასდროს იკარგება ფონში.'],
    enter:['Enter the collection','კოლექციაში შესვლა'], collections:['← Collections','← კოლექციები'],
    dragFrames:['Drag the frames to turn them','გადაათრიე სათვალე მოსატრიალებლად'],
    back:['← BACK TO SHOP','← მაღაზიაში დაბრუნება'], drag:['DRAG TO TURN','გადაათრიე მოსატრიალებლად'],
    note:['A statement frame for stepping into another version of yourself.','გამორჩეული ჩარჩო, რომელიც შენი ახალი ვერსიის აღმოჩენაში დაგეხმარება.'],
    add:['ADD TO CART','კალათაში დამატება'], added:['ADDED TO CART','კალათაშია'], soon:['COMING SOON','მალე'],
    contactTitle:["Let’s talk.",'დაგვიკავშირდი.'], contactIntro:["Questions about an order, a frame, or your next favorite pair? We’re here.",'შეკვეთასთან, ჩარჩოსთან ან შენს მომავალ საყვარელ სათვალესთან დაკავშირებით კითხვა გაქვს? ჩვენ აქ ვართ.'],
    support:['Customer support','მომხმარებელთა მხარდაჭერა'], instagramGeorgia:['Instagram — Georgia','Instagram — საქართველო'], instagramUsa:['Instagram — USA','Instagram — აშშ'], office:['Tbilisi office','თბილისის ოფისი'], appointment:['Request an appointment ↗','ვიზიტის დაჯავშნა ↗'], draft:['Draft location — confirm before launch.','სატესტო მისამართი — გაშვებამდე დასადასტურებელია.']
  };
  const setText=(selector,key,ge)=>document.querySelectorAll(selector).forEach(el=>{el.textContent=copy[key][ge?1:0]});
  function applyLocale(market){
    const ge=market==='ge'; localStorage.setItem('velvet-market',market); document.documentElement.lang=ge?'ka':'en'; document.body.dataset.market=market;
    setText('.nav-links a[href*="about-title"]','about',ge); setText('.nav-links a[href*="collection"]','shop',ge); setText('.nav-links a[href*="contact"]','contact',ge);
    setText('#about-title','aboutTitle',ge); setText('.about-description','aboutDescription',ge); setText('.collection-back','collections',ge);
    setText('.shop-heading-meta > span','dragFrames',ge); setText('.product-render > p','drag',ge); setText('.product-note','note',ge);
    setText('.contact-title','contactTitle',ge); setText('.contact-intro','contactIntro',ge); setText('.contact-support .contact-label,.support-row .contact-label','support',ge); setText('.contact-card:nth-child(2) .contact-label','instagramGeorgia',ge); setText('.contact-card:nth-child(3) .contact-label','instagramUsa',ge); setText('.office-copy .contact-label','office',ge); setText('.office-email','appointment',ge); setText('.draft-note','draft',ge);
    document.querySelectorAll('.about-link').forEach(el=>{el.innerHTML=`${copy.enter[ge?1:0]} <span aria-hidden="true">↗</span>`});
    document.querySelectorAll('.back-link').forEach(el=>{el.textContent=ge?copy.back[1]:`← VF ${(el.getAttribute('href')||'collection').replace('.html','')}`});
    document.querySelectorAll('.collection-price,.product-price').forEach(el=>{if(!el.dataset.gelPrice&&/GEL/.test(el.textContent))el.dataset.gelPrice=el.textContent.trim();if(el.dataset.gelPrice)el.textContent=ge?el.dataset.gelPrice:(prices[el.dataset.gelPrice]||el.dataset.gelPrice)});
    const cart=document.querySelector('#add-cart'); if(cart){const state=cart.disabled?'soon':cart.classList.contains('added')?'added':'add';cart.textContent=copy[state][ge?1:0]}
    document.querySelectorAll('.market-option').forEach(button=>{const active=button.dataset.market===market;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
    window.dispatchEvent(new CustomEvent('velvet:market',{detail:{market}}));
  }
  document.querySelectorAll('.nav-bag').forEach(bag=>{bag.href='cart.html';const badge=bag.querySelector('span');if(badge){try{const cart=JSON.parse(localStorage.getItem('velvet-cart-items')||'[]');badge.textContent=cart.reduce((sum,item)=>sum+(Number(item.quantity)||0),0)}catch{badge.textContent='0'}}});
  const actions=document.querySelector('.nav-actions'); if(actions&&!actions.querySelector('.market-switch')){const switcher=document.createElement('div');switcher.className='market-switch';switcher.setAttribute('aria-label','Choose country and language');switcher.innerHTML='<button class="market-option" type="button" data-market="ge">GE</button><span>/</span><button class="market-option" type="button" data-market="us">US</button>';actions.prepend(switcher);switcher.addEventListener('click',event=>{const button=event.target.closest('.market-option');if(button)applyLocale(button.dataset.market)})}
  const saved=localStorage.getItem('velvet-market');applyLocale(saved==='ge'||saved==='us'?saved:'us');window.VelvetLocale={applyLocale,copy};
})();

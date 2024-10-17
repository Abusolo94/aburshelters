  

  const sectionEl = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  const listWrapper = document.querySelector('.product-wrapper');
  const showDetails = document.querySelector('.details-page');
  const imageList = document.querySelector('.imag-list');
  const price__descript = document.querySelector('.price-descrip');
  const image__title = document.querySelector('.images-title');
  const relatedPro = document.querySelector('.ralated-list');
  let ralated = [];
  const cartEl = document.querySelector('.cart');
  const detailedActionBtn = document.querySelector('.action-btns');
  const cartList = document.querySelector('.cart-infor')

  const storedItem= document.querySelector('.list__of__items')
  let cart = [];
  let stored = [];
  let newFeed = [];
  let searched = [];
const menuIcone = document.querySelector('.menu')
const navMenu = document.querySelector('nav ul')
menuIcone.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')

})
  




  window.onscroll = ()=>{

    sectionEl.forEach(sec=>{
       let  top = window.scrollY;
       let offset = sec.offsetTop - 100;
       let height = sec.offsetHeight;
       let id = sec.getAttribute('id');

       if(top >= offset && top < offset + height){

        navLinks.forEach(link=>{
            link.classList.remove('current-p')
            document.querySelector('nav a[ href*= '+ id +']').classList.add('current-p')
        })
              
       }
        
    })

  


  };


//   <=========== rendering listing items===============>


    function render_list_items(){
        listings.forEach(item =>
            listWrapper.innerHTML +=
            `
               <div class="listing-item">
                            <img src="${item.thumbnail}" alt="image">
                            <h1>${item.title}</h1>
                              <h1>${item.price}</h1>
                            <p>Rating <span>${item.rating}</span></p>
                            <p class="dess">${item.description}</p>
                            <button onclick="displayDetails(${item.id})">Details</button>
                        </div>
            `)

         
    }

    render_list_items();


    function displayDetails(id){
       const currentItem = listings.find(item => item.id ===id)

       if(currentItem){
          imageList.innerHTML = ''
        currentItem.images.forEach(img => 
          
            imageList.innerHTML += `
             <img src="${img.image}">
            `
        )
        image__title.innerHTML =`
            <img src="${currentItem.thumbnail}" alt="image">
        `
        price__descript.innerHTML = `
            <h1>${currentItem.title}</h1>
            <p>${currentItem.narrative} </p>
             <h1>Ugx ${currentItem.price}/=</h1>
        `

        detailedActionBtn.innerHTML = `
           <button onclick="hideDetails()">Back</button>
             <button onclick="addingToCart(${currentItem.id})">Add</button>
        `
        showRelatedInfo(currentItem)
      

        showDetails.classList.add('show')
       }

    }

    function hideDetails(){
        showDetails.classList.remove('show')

    }

    function showRelatedInfo(currentId){
     const items = listings.filter(item => item.contegory === currentId.contegory)
     
        ralated.push(items)
        console.log(ralated)
   
        renderingRelated(items)

    }


    function renderingRelated(item){
        relatedPro.innerHTML = ''
   
            item.forEach(property =>

                relatedPro.innerHTML += `
                <div onclick="detailingRalated(${property.id})" class="ralated-details-wrapper">
                               <img src="${property.thumbnail}" alt="image">
                               <h1>${property.title}</h1>
                               <h1>${property.price}</h1>
                               <p>Rating <span>${property.rating}</span></p>
                               <p>${property.description}</p>
    
                           </div>
    
           `
             )

    }

 function detailingRalated(currentRelated){
 
    renderingRelated(currentRelated)
    showDetails.classList.add('show')
   
 }



 function addingToCart(currentId){
    if(cart.some(item => item.id === currentId)){
       display__errors('this item alread added to nagotion room')
        return
    }else{
        let cartItem = listings.find(product => product.id === currentId)

        cart.push(cartItem)
      
        renderingCartItems()
        updatingCartInformation()
   
      
        showDetails.classList.remove('show')

    }
  

 
 

 } 

 function renderingCartItems(){
    cartList.innerHTML = ''

    cart.forEach(item => 
        cartList.innerHTML += `
           
                    <li>
                        <div class="cart-item">
                            <img src="${item.thumbnail}" alt="image">
                         
                        </div>
                        <div class="cart-item-infor">
                            <h1>${item.title}</h1>
                            <p>${item.description}</p>
                                <h1>Ugx ${item.price}</h1>
                            
                            <div class="buttons">
                                <button onClick="deletingCartItem(${item.id})">delete</button>
                                <button onClick ="storingItems(${item.id})" >Store</button>
                            </div>

                        </div>
                    </li>

        
        `
    )
 

 }

 const messText = document.querySelector('.message')
 function showCart(){

    cartEl.classList.toggle('show')
    if(cart.length === 0){
      messText.classList.add('active')
      // return
    }
   
   

 }

 function deletingCartItem(currentId){
    
      cart = cart.filter(item => item.id !== currentId);

     renderingCartItems();
     updatingCartInformation()
     console.log(cart)

  
 }



 function backButtons(){
    const cartBack = document.querySelector('.cart .back')
    const detailedBack = document.querySelector('.details-page  .back')
    cartBack.addEventListener('click', (e)=>{
        e.target.parentElement.classList.remove('show')

    })
    detailedBack.addEventListener('click', (e)=>{
        e.target.parentElement.classList.remove('show')

    })
 }
 backButtons()

  function updatingCartInformation(){
    const itemNumber = document.querySelector(".itemNumber")
    const itemNumbere1 = document.querySelector(".itemNumber2")
    const subTotal = document.querySelector(".subTotal")
    const fee = document.querySelector(".fee")
    const totalx = document.querySelector(".toto")

    let subtotals = 0; let fees = 0;   let  itemsNums = 0;
    let totals = 0;

    cart.forEach(item=>{
        subtotals += item.price
        fees += (5/100) * subtotals
        totals += subtotals + fees
        itemsNums += item.unit
      

        

    })

    itemNumber.innerText = `${itemsNums} item(s)`
    itemNumbere1.innerText = `${itemsNums} item(s)`
    subTotal.innerText = `Ugx ${subtotals}/=`
    fee.innerText = `Ugx ${fees}/=`
    totalx.innerText = `Ugx ${totals}/=`
  }

  // function storingItems(currentId){
     
  //   let storedData = cart.find(item => item.id === currentId)
  //   stored.push(storedData)
  //   renderingCartAdItems(stored)


  // }
   


  // function renderingCartAdItems(items){
  //   storedItem.innerHTML = ""

  //   items.forEach(item => storedItem.innerHTML += `
        
  //          <li>
  //                       <img src="${item.thumbnail}" alt="image">
  //                       <div class="stored-info">
  //                           <h1>${item.title}</h1>
  //                           <p>${item.description}</p>
  //                       </div>
  //                   </li>`

  //   )

  // }



  const blogListEL = document.querySelector('.blog__lists');
  const blogDetailsShow = document.querySelector('.details__blog__page')
  






  function renderingBlogLists(){

    blog__list.map(blogs => blogListEL.innerHTML += `
          <div class="cards">
                            <img src="${blogs.image}" alt="">
                            <div class="narrative">
                                <h1>${blogs.title}</h1>
                                <p>${blogs.describ}</p>
                                <button onClick="showBlogDetails(${blogs.id})" >check out</button>
                            </div>
                        </div>

        `)

  }

  renderingBlogLists()



  function showBlogDetails(currentBlog){
    console.log(currentBlog)
    const blog = blog__list.find(blogItem => blogItem.id === currentBlog)
    rendering__detailed__blog(blog)

    blogDetailsShow.classList.add('show')

  }

  function rendering__detailed__blog(currentblog){
     
      blogDetailsShow.innerHTML = `
        <span  class="material-symbols-outlined back">
                        arrow_back
                        </span>   
         <div class="blog__page-info">
                        <div class="blog-header">
                            <div class="description">
                                <h1>${currentblog.title}</h1>
                                <p>${currentblog.describ}</p>
                            </div>
                            <div class="blog_image">
                                <img src="${currentblog.image}" alt="">
                            </div>
                         
                        </div>

                        <div class="blog__body">
                           ${currentblog.body}

                        </div>
                        <div class="auther-information">
                            <h1>Abusolo Richard</h1>
                            <p>Web developer, consultant, senior software engneer</p>
                            <div class="connect">
                                <p>connect</p>
                                <div class="links">
                                    <span>facebook</span>
                                    <span>LinkedIn</span>
                                </div>
                            </div>

                        </div>
                    </div>
      `
     


  }

  blogDetailsShow.addEventListener('click', (e)=>{
    if(e.target.className === 'material-symbols-outlined back'){
        blogDetailsShow.classList.remove('show')

    }

  })





  const service__container = document.querySelector('.services')
  const servic__container__details = document.querySelector('.services-container')
  const service__back = document.querySelector('.servic-back')
  const serv__details__spec = document.querySelectorAll('.serv__spec__details')
  service__container.addEventListener('click', (e)=>{
   
    let currentServ = e.target.dataset.serv
    console.log(currentServ)
    servic__container__details.classList.add('show')

    serv__details__spec.forEach( serv=>{
        serv.classList.remove('show')
        const currents = document.getElementById(currentServ)
        currents.classList.add('show')
    })
  })

  service__back.addEventListener('click', ()=>{
    servic__container__details.classList.remove("show")
  })



  const about__service__summary = document.querySelector('.serive-summary')
  const listingEl = document.querySelector('.listing')
  const filterd__list = document.querySelector('.list__of__target_status')
  const filteres__back  = document.querySelector('.filtered-back')
  const filtered__list__details = document.querySelector('.filtered__list__details')
  let filtered = []
  
  filteres__back.addEventListener('click', ()=>{
    filterd__list.classList.remove('show')
  })


  about__service__summary.addEventListener('click', (e)=>{
       
      
      if(e.target.className === 'resid'){
      
        fitlerlistings__residential()
        filterd__list.classList.add('show')
      }
      if(e.target.className === 'warehs'){
        fitlerlistings__warehouse()
        filterd__list.classList.add('show')
        
      }
      if(e.target.className === 'hotels'){
        fitlerlistings__hotel()
        filterd__list.classList.add('show')
      
      }
  })


  function fitlerlistings__residential(){
   const itemz =  listings.filter(property => property.status === 'residetial')
  
 
   filtered.push(itemz)
   console.log(filtered)
   renderingFilteredDetails(itemz) 




  }
  function fitlerlistings__warehouse(){
    const itemz =  listings.filter(property => property.status === 'warehouse')
    renderingFilteredDetails(itemz) 

      

  }
  function fitlerlistings__hotel(){
    const itemz =  listings.filter(property => property.status === 'hotel')
    renderingFilteredDetails(itemz) 

      

  }


  function renderingFilteredDetails(filtered) {
    filtered__list__details.innerHTML = ''
    filtered.map(
      (singleItem) =>
        (filtered__list__details.innerHTML += `
           <div class="listing-cards">
                   <img src="${singleItem.thumbnail}" alt="image">
                    <h1>${singleItem.title}</h1>
                      <h1>${singleItem.price}</h1>
                     <p>${singleItem.description}</p>
                  <p>Rating <span>${singleItem.rating}</span></p>
                                 
                       <button>Details</button>
            </div>
        
        `)
    );
  }


  const contact__chat__container = document.querySelector('.contact__chat__container');
  const contact__chat__back = document.querySelector('.chat-back');
  const contact__send__btn = document.querySelector('.send__btn');
  const inputEL = document.querySelectorAll('.contact-details input');
  const chat__room = document.querySelector('.chat--room');
  const formEl = document.querySelector('.form__body')
  const chat__send  = document.querySelector('.chat__send')
  let contact__data = []


  contact__chat__back.addEventListener('click', ()=>{
    contact__chat__container.classList.remove('show')
  })
  contact__send__btn.addEventListener('click', ()=>{
          get__contact__form__data()

          setTimeout(()=>{
            renderingOrgChat()

          }, 3000)
    
  })



  function get__contact__form__data(){
    const namef = document.getElementById('firstname');
    const names = document.getElementById('lastname');
    const email = document.getElementById('email');
    const phone = document.getElementById('tel');
    const text = document.getElementById('testarea');
    const allInput__el = document.querySelectorAll('.form__body input')

    if(namef.value === '' && names.value=== '' 
      && email.value==='' && phone.value===''
       && text.value === ''){
      display__errors('all input fields must be filled')

    } else{
      let info = {
        fname : namef.value,
        sname : names.value,
        email: email.value,
        phone: phone.value,

        text: text.value,
    }
    console.log(info.text)
    contact__data.push(info)
  console.log(contact__data)
  renderiingContactClientChat(info)

  contact__chat__container.classList.add('show')

  allInput__el.forEach(input=> input.value = '')
  text.value =''

    }
  
          
        
 
  }
         
  
  function renderiingContactClientChat(info){
    let html = `
      <p class="client">${info.text}</p>
    `
    chat__room.insertAdjacentHTML('beforeend', html)

  }

  function renderingOrgChat(){

    let html = `
      <p class="admin">
            Thanks for contacting us we are happy to serve at aburshelters please always trust us
     </p>
    `
    chat__room.insertAdjacentHTML('beforeend', html)
  }
   chat__send.addEventListener('click', ()=>{
    chat__text__input()

   })

    function chat__text__input(){
        const chat__text = document.querySelector('.chat__text')
        let html = `
           
      <p class="client">${chat__text.value}</p>
    
        `
        chat__room.insertAdjacentHTML('beforeend', html)
        chat__text.value = ''
       
    }


    const error__container = document.querySelector('.error__mess__popup')
    const error__container__close = document.querySelector('.pop-back')
    const error__container__ok = document.querySelector('.ok__btn')

    error__container__close.addEventListener('click',  ()=>{
      error__container.classList.remove('show')

    })
    error__container__ok.addEventListener('click',  ()=>{
      error__container.classList.remove('show')

    }) 

    function display__errors(message){
      const error__messsage = document.querySelector('.error__message')
      error__container.classList.add('show')
      error__messsage.textContent = `${message}`
       
      setTimeout(()=>{
        error__container.classList.remove('show')

      }, 3000)

    }

    const payment__section = document.querySelector('.paymenent__section')
    const payment__back = document.querySelector('.back-payment')
    payment__back.addEventListener('click', ()=>{
      payment__section.classList.remove('show')

    })

    function consultancy__inquiry(){
    
     
      if(cart === ''){
        display__errors('there is nothing in the cart')

      }else{
        console.log(cart)
        payment__section.classList.add('show')

      }


    }

   
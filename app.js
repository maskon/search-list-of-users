const list = document.getElementById('list')
const filterElem = document.getElementById('filter')
const container = document.querySelector('.container')

container.classList.remove('w-50')

async function start() {
    try {
        const url = await fetch('https://jsonplaceholder.typicode.com/posts')
        const user = await url.json()
        
        list.innerHTML = 'Loading...'
        
        setTimeout( () => {
            
            list.innerHTML = ''
            
            user.forEach(function (item) {
                render(item)                 
            })
            
        },2000)   
        
        filterElem.addEventListener('input', () => {
                    
            const userFilter = user.filter(function (arr) {

                return arr.title.startsWith(filterElem.value)
                
            })
            
            list.innerHTML = ''

            userFilter.forEach(function (item) {                
                render(item)
            })
            
            userFilter.length === 0 ? list.innerHTML = 'Ничего не найдено!' : ''
            
        })
        
    } catch (err) {
        console.log('error')
    }    
}

start()

function render(item) {
    const li = document.createElement('li')
    li.innerHTML = `<li class="list-group-item">${item.title}</li>`
    li.style.listStyleType = 'none'
    list.appendChild(li)
}

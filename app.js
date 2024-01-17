const list = document.getElementById('list')
const filterElem = document.getElementById('filter')
const total = document.getElementById('total')

async function start() {
    try {
        const url = await fetch('https://jsonplaceholder.typicode.com/comments')
        const user = await url.json()
        
        list.innerHTML = 'Loading...'
        
        total.style.color = '#9aef40'
        total.style.marginLeft = '10px'
        
        setTimeout( () => {
            
            list.innerHTML = ''
            
            user.forEach(function (item) {
                render(item)
                total.innerHTML = user.length
            })
            
        },2000)   
        
        filterElem.addEventListener('input', () => { 
            
            const userFilter = user.filter(function (arr) {     
                const value = filterElem.value.toUpperCase()
                return arr.name.toUpperCase().includes(value)      
            })
            
            list.innerHTML = ''
            
            userFilter.forEach(function (item) {                
                render(item)
                total.innerHTML = userFilter.length
            })
            
            if (userFilter.length === 0) {
                list.innerHTML = 'Ничего не найдено!'
                total.innerHTML = 0
            }
        })
        
    } catch (err) {
        list.style.color = 'red'
        list.innerHTML = err.message
    }    
}

start()

function render(item) {
    const li = document.createElement('li')
    li.innerHTML = `<li class="list-group-item">${item.name}</li>`
    li.style.listStyleType = 'none'
    list.appendChild(li)
}

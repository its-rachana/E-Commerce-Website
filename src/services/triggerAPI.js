export async function fetchAllData (){
    const response = await fetch("http://localhost:5000/fetchAlldata",
        {
            method:"GET"
        }
    )
    return await response.json();
}
export async function clearAllCartItems (){
    const response = await fetch("http://localhost:5000/emptyCart",
        {
            method:"DELETE"
        }
    )
    return await response.json();
}
export async function fetchSpecificData(searchQuery){
    const response = await fetch('http://localhost:5000/searchInAllItems',{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body : JSON.stringify({searchQuery})
    })
    return response.json();
}
export async function addItemToCart(product){
    return await fetch("http://localhost:5000/addItemToCart",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body: JSON.stringify({product})
    })
}

export async function removeItemFromCart(product){
    return await fetch("http://localhost:5000/deleteFromCart",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({product})
    })
}

export async function fetchAllCartItems () {
    const response = await fetch("http://localhost:5000/getCartItems",{
        method:"GET"
    })
    return response.json()
}

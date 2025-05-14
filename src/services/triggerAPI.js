export async function fetchAllData (){
    const response = await fetch("/fetchAlldata",
        {
            method:"GET"
        }
    )
    return await response.json();
}
export async function clearAllCartItems (){
    const response = await fetch("/emptyCart",
        {
            method:"DELETE"
        }
    )
    return await response.json();
}
export async function fetchSpecificData(searchQuery){
    const response = await fetch('/searchInAllItems',{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body : JSON.stringify({searchQuery})
    })
    return response.json();
}
export async function addItemToCart(product){
    return await fetch("/addItemToCart",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({product})
    })
}

export async function removeItemFromCart(product){
    return await fetch("/deleteFromCart",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({product})
    })
}

export async function fetchAllCartItems () {
    const response = await fetch("/getCartItems",{
        method:"GET"
    })
    return response.json()
}

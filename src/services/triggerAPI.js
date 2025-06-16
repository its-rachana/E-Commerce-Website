export async function retrieveSecretKeyFromBackend(){
    const response = await fetch('/retrieveKey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5000 }),
    })
    return await response.json();
}
export async function retrievePromoCode(){
    const response = await fetch('/retrievePromoCodes', {
        method: 'GET'
    });
    return await response.json();
}
export async function fetchUserAddresses(email){
    const response = await fetch('/userAddresses',{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({user_email:email})
    })
    return await response.json()
}
export async function addUserAddresses(email,address){
    const response = await fetch('/addUserAddress',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({user_email:email,new_address:address})
    })
    return await response.json()
}
export async function editUserAddresses(email,address){
    const response = await fetch('/editUserAddress',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({user_email:email,new_address:address})
    })
    return await response.json()
}
export async function getRewardPoints(email){
    const response = await fetch('/getRewardPoints',{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({user_email:email})
    })
    return await response.json()
}
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

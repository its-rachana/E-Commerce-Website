import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from "@blueprintjs/core";
import {
    addItemToCart,
    clearAllCartItems,
    fetchAllData,
    fetchSpecificData,
    removeItemFromCart
} from "@/services/triggerAPI";
import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";

function Home (){
    const router = useRouter();
    const [displayItems,setDisplayItems] = useState([])
    const[cartItems,setCartItems] = useState([])
    const [imageErrors, setImageErrors] = useState({});

    useEffect( ()=>{
        const clearCart = async() =>{
            await clearAllCartItems();
        }
        const fetchData = async() =>{
            const response = await fetchAllData();
            setDisplayItems(response);
        }
        clearCart();
        fetchData();
    },[])

    const handleSearch = async(searchQuery) =>{
        const data = await fetchSpecificData(searchQuery);
        setDisplayItems(data);
    }
    const handleAddFunctionality = async (productToAdd)=>{
        console.log("add clicked")
        const data = await addItemToCart(productToAdd,setCartItems)
        console.log(data)
      if(data.status===200) {
          setCartItems(prevItems => [...prevItems, productToAdd]);
      }
    }
    const handleRemoveFunctionality = async(product) =>{
        const data = await removeItemFromCart(product);
        if(data.status === 200){
            setCartItems(cartItems.filter((item) => item!==product));
        }
    }
    const handleGoToCartFunctionality = () =>{
        console.log("cart icon clicked")
        router.push("/cart")
    }
    return (
        <div>

                <div className="container mt-4">
                    <div className="bp5-input-group">
                        <span className="bp5-icon bp5-icon-search"></span>
                        <input
                            className="bp5-input"
                            type="search"
                            placeholder="Search input"
                            dir="auto"
                            onChange={(e) => handleSearch(e.target.value)}/>
                    </div>
                    <div align={"center"} className={"mt-4"}>
                        <button role="button" className="bp5-button bp5-intent-primary" tabIndex="0"
                        onClick={()=>handleGoToCartFunctionality()}>Go to cart</button>
                    </div>

                    <div className="row mt-4">
                    {displayItems.map((item, index) => (
                            <div className="col-md-4 mb-5" key={index}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        {cartItems.some(current => JSON.stringify(current) === JSON.stringify(item)) ?
                                            <Icon icon={"remove"} size={30} onClick={()=>handleRemoveFunctionality(item)}/> :
                                            <Icon icon={"add"} size={30} onClick={() => handleAddFunctionality(item)}/>
                                        }
                                        <div>
                                            {imageErrors[index] ? (
                                                <p style={{textAlign: "center", fontSize: 14}}>No image to display</p>
                                            ) : (
                                                <img
                                                    src={item["Image Src"]}
                                                    height={120}
                                                    width={120}
                                                    alt="Product"
                                                    onError={() => setImageErrors(prev => ({...prev, [index]: true}))}
                                                    style={{objectFit: "contain"}}
                                                />
                                            )}
                                        </div>
                                        <h3 className="card-title">
                                            {item["Title"]}
                                        </h3>
                                        {item["Variant SKU"] !== "" ? <h5>SKU: {item["Variant SKU"]}</h5> : <></>}
                                        {item["Variant Price"] !== "" ? <p>${item["Variant Price"]}</p> : <></>}
                                    </div>
                                </div>
                            </div>
                    ))}
                    </div>
                </div>
        </div>
    )
}

export default Home;

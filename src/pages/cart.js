import {useEffect, useState} from "react";
import {fetchAllCartItems, removeItemFromCart} from "@/services/triggerAPI";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Icon} from "@blueprintjs/core";
import {useRouter} from "next/navigation";
export default function cart(){
    const router = useRouter()
    const [cartItems,setCartItems] = useState([])
    useEffect( ()=> {
        console.log("use effect")
        const fetchAllCart = async ()=>{
            const data = await fetchAllCartItems()
            data.map((item,index)=>{
                console.log(item["product"])
            })
            setCartItems(data);
        }
        fetchAllCart();

    },[])
    const handleRemoveFunctionality = async (product) => {
        console.log(product);
        const data = await removeItemFromCart(product);

        if (data.status === 200) {
            setCartItems(prevItems =>
                prevItems.filter(item => JSON.stringify(item.product) !== JSON.stringify(product))
            );

        }
    }

    const handleGoBackFunctionality = ()=>{
        router.push("/homepage")
    }
    return (
        <div className="container mt-4">
            <span>
                <Icon icon={"arrow-left"} size={40} onClick={()=>handleGoBackFunctionality()}></Icon>
                <h1 align={"center"}>Cart Items</h1>
            </span>
            <div className="row mt-4">
            {cartItems.map((item, index) => (
                    <div className="col-md-4 mb-5" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <Icon icon={"remove"} size={30} onClick={()=>handleRemoveFunctionality(item["product"])}/> :
                                <img
                                    src={item["product"]["Image Src"]}
                                    height={120}
                                    width={120}
                                    alt={item["product"]["Title"] || "Product Image"}
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevents infinite loop
                                        e.target.src = "/fallback-image.png"; // Use your own fallback image path
                                    }}
                                />
                                <h3 className="card-title">
                                    {item["Title"]}
                                </h3>
                                {item["product"]["Variant SKU"] !== "" ? <h5>SKU: {item["product"]["Variant SKU"]}</h5> : <></>}
                                {item["product"]["Variant Price"] !== "" ? <p>${item["product"]["Variant Price"]}</p> : <></>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )
}

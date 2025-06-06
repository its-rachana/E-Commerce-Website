import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddressComponent from "../components/address";
import {Card, Divider} from "@blueprintjs/core";
export default function shipment(){
    return (
        <div className="container mt-4">
            <div className={"row-cols-1"}>
                <h4>Account</h4>
                <h6>Rachana Angara</h6>
                <Divider style={{marginLeft: 0, marginRight: 0}}/>
            </div>
            <div className={"row"}>
                <div className={"col-4"}>
                    <AddressComponent/>
                    <h6>Payment method</h6>
                </div>
                <div className={"col-8"}>
                    <Card>
                        <h1>right section of the page</h1>
                    </Card>
                </div>
            </div>
        </div>
    )
}

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json(); // Extract the data from the request body
        const tran_id = (Math.floor(100000 + Math.random() * 900000)).toString();
        const init_url = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

        const formData = new FormData();
        formData.append("store_id", "divin66b785e93ac60");
        formData.append("store_passwd", "divin66b785e93ac60@ssl");
        formData.append("uid", body.uid);
        formData.append("total_amount", body.total_amount);
        formData.append("currency", body.currency);
        formData.append("tran_id", tran_id);
        formData.append("success_url", `http://localhost:3000/api/payment/success?id=${tran_id}`);
        formData.append("fail_url", `/fail`);
        formData.append("cancel_url", `/cancel`);
        formData.append("ipn_url", `http://localhost:3000/api/ipn`);
        formData.append("cus_name", body.cus_name);
        formData.append("cus_email", body.cus_email);
        formData.append("cus_add1", body.cus_add1);
        formData.append("cus_add2", body.cus_add2);
        formData.append("cus_city", body.cus_city);
        formData.append("cus_state", body.cus_state);
        formData.append("cus_postcode", body.cus_postcode);
        formData.append("cus_country", body.cus_country);
        formData.append("cus_phone", body.cus_phone);
        formData.append("cus_fax", body.cus_fax);
        formData.append("shipping_method", body.shipping_method);
        formData.append("ship_name", body.ship_name);
        formData.append("ship_add1", body.ship_add1);
        formData.append("ship_add2", body.ship_add2);
        formData.append("ship_city", body.ship_city);
        formData.append("ship_state", body.ship_state);
        formData.append("ship_country", body.ship_country);
        formData.append("ship_postcode", body.ship_postcode);
        formData.append("product_name", body.product_name);
        formData.append("product_category", body.product_category);
        formData.append("product_profile", body.product_profile);
        formData.append("product_amount", body.product_amount);
    

       
        const requestOptions = {method: 'POST', body: formData}
        let SSLRes=await fetch(init_url, requestOptions)

        let SSLResJSON=await SSLRes.json();
    
        return NextResponse.json({data:SSLResJSON})

    } catch (e) {
        console.error("Error during SSLCommerz initialization:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

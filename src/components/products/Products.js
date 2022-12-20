import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCartPlus } from 'react-icons/fa';
import { sharedContext } from '../../context/UserContext';

const Products = () => {
    const [products, setProducts] = useState(null);
    const {user, refetchCart} = useContext(sharedContext);
    console.log(products);
    useEffect(()=>{
        axios.get('http://localhost:5000/products')
        .then(res => {
            if(res.data.success){
                setProducts(res.data.products);
            }
        }).catch(err => console.error('[Error]:', err));
    },[])

    const handleAddToCart = (product) => {
        if(user?.email){
            product['buyerEmail'] = user?.email;
            product['quantity'] = 1;
            axios.put(`http://localhost:5000/addto-cart/?email=${user?.email}`, product, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("Token")}`,
                  } 
            })
            .then(res => {
                if(res.data.success){
                    toast.success(res.data.message);
                    refetchCart();
                }
            }).catch(err => {
                console.error('[error:]', err)
            })
        }else{
            toast.error('Please Login to Purchase Product');
        }
    }
    return (
        <div className='w-full my-10'>
            <h4 className='text-3xl font-semibold text-center'>All Products</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 place-items-center px-5 md:px-10 xl:px-0'>
                {
                    products?.map(product => (
                        <div key={product._id} className='product max-w-full w-[350px] h-[520px] border border-gray-200 relative transition-all rounded-md p-3 hover:border-none hover:shadow-lg'>
                            <img src={product.img} alt="" className='w-full h-[296px] rounded-md'/>
                            <div className='product-info my-4'>
                                <p className='product-name mt-2 text-xl font-semibold'>{product.name}</p>
                                <p className='mt-2 text-lg'>Price: ${product.price}</p>
                                <p className='mt-2 text-lg'>Seller: {product.seller}</p>
                            </div>
                            <button onClick={() => handleAddToCart(product)} className='btn-cart bg-[#FFE0B3] w-[92%] rounded-md flex items-center justify-center py-3 hover:bg-[#eccfa3] transition-all mr-3 mb-3 absolute bottom-0'>
                                    <p className='btn-text'>Add to Cart</p>
                                    <FaCartPlus className='w-4 h-4'></FaCartPlus>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;
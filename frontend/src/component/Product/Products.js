import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,getProduct} from "../../actions/productAction"
import Loader from "../../component/layout/Loader/Loader"
import ProductCard from "../Home/ProductCard"
import { useParams } from 'react-router-dom';
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
    const {keyword}=useParams();

    const [currentPage,setCurrentPage]=useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [activeCategory, setActiveCategory] = useState(null);

    const alert = useAlert();
    const dispatch=useDispatch();
    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount}= useSelector((state)=>state.products)

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
      setPrice(newPrice);
      setCurrentPage(1);
    };
    const handelCategory=(category)=>{
      if (activeCategory === category) {
        setActiveCategory(null);
        setCategory("");
      } else {
        setActiveCategory(category);
        setCategory(category);
      }
    }

    useEffect(()=>{
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }        
      dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,error,alert,keyword,currentPage,price,category,ratings])

    let count = filteredProductsCount;

  return (
    <Fragment>
      {loading?<Loader/>:(

        <Fragment>
            <h2 className='productsHeading'>Products</h2>
            <div className="products">
                {products && products.map((product)=>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className={`category-link ${activeCategory === category ? 'active' : ''}`}
                  key={category}
                  onClick={() => handelCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

            {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}    

        </Fragment>

      )}
    </Fragment>
  )
}

export default Products

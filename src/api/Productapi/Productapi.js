import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";

// Add Category APi
export const addCategoryApi = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/product/api/addcategory`, data, header, "admin"
  );
};
// Get category Api//

export const GetCategoryApi = async (header) => {
  return await commonrequest("GET", `${BASE_URL}/product/api/getcategory`, "", header, "admin")
}
// Get brand Api//

export const GetBrandApi = async (header) => {
  return await commonrequest("GET", `${BASE_URL}/product/api/getbrand`, "", header, "admin")
}
// Add Brand APi
export const addBrandApi = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/product/api/addbrand`, data, header, "admin"
  );
};


// Add products Api//

export const AddproductApi = async (data, categoryId, header,) => {

  return await commonrequest("POST", `${BASE_URL}/product/api/addproducts?categoryid=${categoryId}`, data, header, "admin")
}

///update product api///


export const UpdateproductApi = async (data, id, categoryId, header,) => {
 

  return await commonrequest("PUT", `${BASE_URL}/product/api/updateproduct/${id}?categoryid=${categoryId}`, data, header, "admin")
}
///delete product api///


export const deleteproductsApi = async (data, header) => {
 

  return await commonrequest("DELETE", `${BASE_URL}/product/api/deleteproducts/${data.url}`, data, header, "admin")
}

///Delete images Api///
export const DeleteImageApi = async (data, header) => {


  return await commonrequest("DELETE", `${BASE_URL}/product/api/deleteImage`, data, header, "admin")
}





// Get products Api//

export const GetAllproductsApi = async (data, header) => {

  return await commonrequest("GET", `${BASE_URL}/product/api/getproduct?page=${data.page}`, "", header, "admin")
}
// Get similar products Api//

export const getSimilarProductsApi = async (data, header) => {

  return await commonrequest("GET", `${BASE_URL}/product/api/product/${data.productid}/similar`, "", header, "admin")
}

// search products Api//

export const searchProductApi = async (data, header) => {
  

  return await commonrequest("GET", `${BASE_URL}/product/api/search?productName=${data.productName}`, "", header, "admin")
}








// filter products Api//

export const filterproductsApi = async (data, header) => {

   

  return await commonrequest("GET", `${BASE_URL}/product/api/getproduct?categoryId=${data.selectedCategory}&price=${data.price}&sizes=${data.size}&brand=${data.brand}&sortBy=${data.sortBy}&limit=${data.limit}`, "", header, "admin")
}


export const resetfilterproductsApi = async (data, header) => {
 
  const url = new URL(`${BASE_URL}/product/api/reset-products`);
  if (data.categoryId) {
    url.searchParams.append('categoryId', data.categoryId);
  }
  return await commonrequest("GET", url.toString(), "", header, "user");
};





// newarivals products Api//

export const newarivalproductsApi = async (data, header) => {


  return await commonrequest("GET", `${BASE_URL}/product/api/newarival`, "", header, "admin")
}
// newarivals products Api//

export const getSingleProductApi = async (data, header) => {


  return await commonrequest("GET", `${BASE_URL}/product/api/getaproduct/${data.productid}`, "", header, "admin")
}


// ADD Banner  Api//

export const addBannerAPi = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/product/api/addbannerimage`, data, header, "admin")
}

// GEt Banner  Api//

export const GetBannerApi = async (header) => {
  return await commonrequest("GET", `${BASE_URL}/product/api/getbannerimages`, "", header, "admin")
}



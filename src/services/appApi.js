import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create the api

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://156.67.221.40:8080" }),
    endpoints: (builder) => ({

        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),
        // creating product
        createProduct: builder.mutation({
            query: (product) => ({
                url: "/products",
                body: product,
                method: "POST",
            }),
        }),

        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: "PATCH",
            }),
        }),
        changeProductCount: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/change-product-count",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // add to cart
        addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: "/products/add-to-cart",
                body: cartInfo,
                method: "POST",
            }),
        }),
        // remove from cart
        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/products/remove-from-cart",
                body,
                method: "POST",
            }),
        }),

        // increase cart
        increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/increase-cart",
                body,
                method: "POST",
            }),
        }),

        // decrease cart
        decreaseCartProduct: builder.mutation({
            query: (body) => ({
                url: "/products/decrease-cart",
                body,
                method: "POST",
            }),
        }),
        // create order
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
        createOrderByAdmin: builder.mutation({
            query: (body) => ({
                url: "/orders/admin",
                method: "POST",
                body,
            }),
        }),
        setIsDiscount: builder.mutation({
            query: (body) => ({
                url: "/users/discount",
                method: "PATCH",
                body,
            }),
        }),
        updateCode: builder.mutation({
            query: (body) => ({
                url: "/codes/update",
                method: "PATCH",
                body,
            }),
        }),
        
        getPromoCodeArr: builder.query({
            query: () => '/codes',
          }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useCreateProductMutation,
    useAddToCartMutation,
    useChangeProductCountMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useCreateOrderByAdminMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetPromoCodeArrQuery,
    useUpdateCodeMutation,
    useSetIsDiscountMutation
} = appApi;

export default appApi;

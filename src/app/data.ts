"use server";

import { client } from "./utils/sanity-client";
import {
  Category,
  FeaturedData,
  HeroSecData,
  PImage,
  Product,
} from "./utils/types";

////////////////////
// Hero Section Data
////////////////////

export const fetchLogo = async () => {
  const logo: PImage = await client.fetch({
    query: `*[_type == "logo"]{
      logo {asset -> {url}}
    }[0]`,
  });
  return logo;
};

export const fetchHeroSecData = async () => {
  const heroSecData: HeroSecData = await client.fetch({
    query: `*[_type == "landing"]{
     hero
    }`,
  });
  return heroSecData;
};

////////////////////
// Description Data
////////////////////

export const fetchDescData = async () => {
  return await client.fetch({
    query: `*[_type == "landing"]{
     hero
    }`,
  });
};

///////////////////
// New Arrivals Data
///////////////////

export const fetchNewArrivalsData = async () => {
  const newArrivals: Product[] = await client.fetch({
    query: `*[_type == "product"]{
      _rev,
        name,
        category -> {name},
        main_image {asset-> {url}},
        price,
        size[]->{name},
        subCategory,
        _createdAt
    }`,
  });
  return newArrivals;
};

///////////////////
// Featured Data
///////////////////

export const fetchFeaturedData = async () => {
  const featData: FeaturedData = await client.fetch({
    query: `*[_type == "landing"]{
      featured
    }`,
  });
  return featData;
};

///////////////////
// Products Data
///////////////////

export const fetchAllProducts = async () => {
  const products: Product[] = await client.fetch({
    query: `*[_type == "product"]{
      _rev,
        name,
        description,
        category -> {name},
        subCategory -> {name},
        size[] -> {name},
        main_image {asset-> {url}},
        images[] {asset->{url}},
        price,
        is_favourite,
        is_soldOut,
    }`,
  });
  return products;
};

export const fetchFeaturedProducts = async () => {
  const products: Product[] = await client.fetch({
    query: `
        *[_type == "product" && is_favourite == true]{
            _rev,
              name,
              description,
              category -> {name},
              subCategory -> {name},
              size[] -> {name},
              main_image {asset-> {url}},
              images[] {asset->{url}},
              price,
              is_favourite,
              is_soldOut,
          }`,
  });
  return products;
};

export const fetchProductByID = async (_rev: string) => {
  const product: Product = await client.fetch({
    query: `
          *[_type == "product" && _rev == "${_rev}"]{
              _rev,
                name,
                description,
                category -> {name},
                subCategory -> {name},
                size[] -> {name},
                main_image {asset-> {url}},
                images[] {asset->{url}},
                price,
                is_favourite,
                is_soldOut,
            }[0]`,
  });
  return product;
};
export const fetchProductByCategory = async (_category: string) => {
  console.log(_category);
  const products: Product[] = await client.fetch({
    query: `
      *[_type == "product" && category->name == "${_category}"]{
        _rev,
          name,
          description,
          category -> {name},
          subCategory -> {name},
          size[] -> {name},
          main_image {asset-> {url}},
          images[] {asset->{url}},
          price,
          is_favourite,
          is_soldOut,
            
      }`,
  });
  return products;
};

///////////////////
// Categories Data
///////////////////

export const fetchCategories = async () => {
  const categories: Category[] = await client.fetch({
    query: `
    *[_type == "category"]{
      _id,
      name
    }
    `,
  });
  return categories;
};

export const fetchCategoryById = async (_id: string) => {
  const category = await client.fetch({
    query: `
    *[_type == category && _id == "${_id}"]{
      _id,
      name
    }
    `,
  });
  return category;
};

/////// ADMIN ///////
////////////////////

export type MAIN_IMAGE = {
  main_image: {
    asset: {
      url: string;
    };
  };
};

export const fetchMainImage = async (_rev: string) => {
  const image: MAIN_IMAGE[] = await client.fetch({
    query: `*[_type == "product" && _rev == "${_rev}"]{
      main_image {asset-> {url}},
    }`,
  });
  return image[0];
};

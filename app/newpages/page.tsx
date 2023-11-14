"use client";
import PermissionPage from "app/PermissionPage";
import { axiosAuth } from "lib/axios";
import React, { useEffect, useState } from "react";

const ServerPage = () => {
  const [datePage, setDataPage] = useState();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const posts = await axiosAuth.get("/api/stories?populate=*");
    setDataPage(posts.data);
  };
  // const posts = await axiosAuth.get("/api/stories");

  return <PermissionPage>{JSON.stringify(datePage)}</PermissionPage>;
};

export default ServerPage;

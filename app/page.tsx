"use client";
import ImageGallery from "react-image-gallery";
// import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { axiosAuth } from "lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "./Providers";
import PermissionPage from "app/PermissionPage";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthContext();
  const router = useRouter();
  const path = `${process.env.BASE_URL}`;
  // const axiosAuth = useAxiosAuth();
  const fetchPost = async () => {
    const res = await axiosAuth.get("/api/stories?populate=*");
    const data = res.data.data.map((e: any) => {
      const url = path + e.attributes.imgFile.data.attributes.url;
      return {
        original: url,
        thumbnail: url,
      };
    });
    setPosts(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <PermissionPage>
      {posts ? (
        <div className="flex justify-center">
          <ImageGallery
            showFullscreenButton={true}
            showBullets={true}
            showThumbnails={true}
            showNav={true}
            items={posts}
          />
        </div>
      ) : null}
    </PermissionPage>
  );
};

export default HomePage;

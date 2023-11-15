"use client";
import ImageGallery from "react-image-gallery";
// import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { axiosAuth } from "lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "./Providers";
import PermissionPage from "app/PermissionPage";
import { getToken, Messaging } from "firebase/messaging";
import firebase_app from "app/config";
import { getMessaging } from "firebase/messaging";

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

  const getTokenFCM = async () => {
    const messagingFB = getMessaging(firebase_app);
    const fcm_token = await getToken(messagingFB, {
      vapidKey: "g3KgUs6cQB6Prpz7YG7AGXXAHwb-qfoD6erJ1n90Ad8",
    });
    console.log(fcm_token, "fcm_token");
    return fcm_token;
  };

  useEffect(() => {
    console.log("ccc");
    getTokenFCM();
  }, []);

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

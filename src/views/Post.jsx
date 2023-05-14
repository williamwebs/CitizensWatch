import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNav, Nav } from "../config";
import { IoArrowRedo } from "react-icons/io5";
import "../styles/home.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

import { Rings } from "react-loader-spinner";

const Post = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(AuthContext);
  
  const fetchPosts = async () => {
    const q = query(
      collection(db, "allPosts"),
      where("userID", "==", user.uid)
    );

    setIsLoading(true);

    try {
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        const postData = doc.data();
        const timestamp = postData.createdAt.toDate();

        return {
          id: doc.id,
          ...postData,
          timestamp,
        };
      });
      setUserPosts(data);
      setIsLoading(false);
      console.log(userPosts);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <Nav />
      <div className="container box">
        <div className="flex flex_">
          <p>Your reports</p>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
        {isLoading ? (
          <div className="loader">
            <Rings
              height="150"
              width="150"
              color="rgb(236, 166, 73)"
              radius="10"
              visible={true}
              ariaLabel="rings-loading"
            />
          </div>
        ) : (
          userPosts.map((i) => {
            return (
              <div className="report__card">
                <p>{i.details.slice(0, 200)} ...</p>
                <div className="bottom">
                  <span>{i.timestamp.toDateString()}</span>
                  <span
                    style={{
                      flex: "1",
                      textAlign: "right",
                      background: "transparent",
                    }}
                  >
                    {i.timestamp.toLocaleTimeString()}
                  </span>
                  <Link to={`/home/${i.details.slice(0, 20)}`} state={i}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "100%",
                        padding: ".5rem",
                      }}
                    >
                      <IoArrowRedo
                        style={{
                          fontSize: "14px",
                        }}
                      />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      <BottomNav />
    </main>
  );
};

export default Post;

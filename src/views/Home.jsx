import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNav, Nav } from "../config";
import { IoArrowRedo } from "react-icons/io5";
import "../styles/home.css";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";

import { Rings } from "react-loader-spinner";

const Home = () => {
  const user = useContext(AuthContext);
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    const collectionRef = collection(db, "allPosts");
    const queryRef = query(collectionRef, orderBy("createdAt", "desc"));
    setLoading(true);

    try {
      const querySnapShot = await getDocs(queryRef);

      // const q = query(collectionRef, orderBy("createdAt"));
      // q.doc.map((doc)=> console.log(doc.data()))
      // console.log(q);
      const data = querySnapShot.docs.map((doc) => {
        const postData = doc.data();

        // console.log(postData.createdAt.);
        const timestamp = postData.createdAt.toDate();

        return {
          id: doc.id,
          ...postData,
          timestamp,
        };
      });
      // const data = querySnapShot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // const data = querySnapShot.docs.map((doc) => doc.data());

      setCollectionData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  console.log(collectionData);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <main>
      <Nav />
      <div className="container box">
        {loading ? (
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
          collectionData.map((i) => {
            return (
              <div className="report__card">
                <div className="flex">
                  <span className="incident__type">{i.incident}</span>
                  <span className="incident__location">{i.location}</span>
                  <span
                    style={{
                      flex: "1",
                      textAlign: "right",
                    }}
                  >
                    {i.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p>{i.details.slice(0, 150)} ...</p>
                <div className="bottom">
                  <span>{i.timestamp.toDateString()}</span>
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

export default Home;

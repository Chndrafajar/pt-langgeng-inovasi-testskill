import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosInstance';

export default function HomePages() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //fungsi get data posts
  const getPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/posts');
      setPosts(data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // memanggil fungsi get data post
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          {loading
            ? // Placeholder loading
              Array.from({ length: 9 }).map((_, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="card placeholder">
                    <div className="placeholder-id">
                      <div className="item-id"></div>
                    </div>
                    <div className="placeholder-hr">
                      <div className="item-hr"></div>
                    </div>
                    <div className="placeholder-info placeholder-glow">
                      <div className="placeholder-title placeholder-glow"></div>
                      <div className="placeholder-desc placeholder-glow"></div>
                    </div>
                  </div>
                </div>
              ))
            : //fungsi slice(0,9) hanya untuk menampilkan 9 data saja
              posts?.slice(0, 9).map((p) => (
                <div className="col-lg-4 col-md-6" key={p.id}>
                  <div className="card">
                    <div className="header">
                      <h5>
                        Id: <span>{p?.id}</span>
                      </h5>
                      <hr />
                      <h5 className="title">{p?.title.substring(0, 25)}...</h5>
                      <span className="desc">{p?.body.substring(0, 100)}...</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

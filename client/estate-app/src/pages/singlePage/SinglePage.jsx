import "./SinglePage.scss";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense, useContext } from "react";
import Map from "../../components/map/map.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";

function SinglePage() {
  const { post } = useLoaderData();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <div className="info">
            <Suspense fallback={<p>Loading post details...</p>}>
              <Await resolve={post}>
                {(post) => (
                  <>
                    <div className="top">
                      <div className="post">
                        <h1>{post.title}</h1>
                        <div className="address">
                          <i className="fa-solid fa-location-pin"></i>
                          <span>{post.address}</span>
                        </div>
                        <div className="price">$ {post.price}</div>
                      </div>
                      <div className="user">
                        <img
                          src={currentUser.avatar ? `http://localhost:8000${currentUser.avatar}` : "/noavatar.jpg"}
                          alt="User Avatar"
                        />
                        <span>{post.user.username}</span>
                      </div>
                    </div>
                    <div className="features">
                      <p className="title">Location</p>
                      <div className="mapContainer">
                        <Map items={[post]} />
                      </div>
                    </div>
                  </>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SinglePage;
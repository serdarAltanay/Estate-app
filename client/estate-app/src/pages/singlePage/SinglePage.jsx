import "./SinglePage.scss";
// import Slider from "../../components/slider/Slider";
import { useLoaderData } from "react-router-dom";
import Map from "../../components/map/map.jsx"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";

function SinglePage() {
  const post = useLoaderData();
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          {/* <Slider images={post.images} /> */}
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <i class="fa-solid fa-location-pin"></i>
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={currentUser.avatar ? `http://localhost:8000${currentUser.avatar}` : "/noavatar.jpg"}  alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <i class="fa-solid fa-clipboard"></i>
              <div className="featureText">
              <span>Utilities</span>
              {post.postDetail.utilities ? (
                post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )
              ) : (
                <p>Information not available</p>
              )}
              </div>
            </div>
            <div className="feature">
              <i class="fa-solid fa-dog"></i>
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <i class="fa-solid fa-comments-dollar"></i>
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <i class="fa-solid fa-maximize"></i>
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <i class="fa-solid fa-bed"></i>
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <i class="fa-solid fa-bath"></i>
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <i class="fa-solid fa-school"></i>
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <i class="fa-solid fa-dog"></i>
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <i class="fa-solid fa-comments-dollar"></i>
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default SinglePage;
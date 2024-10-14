import "./createPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import apiRequest from "../../services/apiRequest";

function CreatePostPage() {
 const [value,setValue] = useState("")
 const [images, setImages] = useState([]);
 const [error,setError]= useState("")

 const handleFileChange = (e) => {
  setImages([...e.target.files]);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  const title = e.target.title.value;
  const price = e.target.price.value;
  const address = e.target.address.value;
  const city = e.target.city.value;
  const bedroom = e.target.bedroom.value;
  const bathroom = e.target.bathroom.value;
  const type = e.target.type.value;
  const property = e.target.property.value;
  const latitude = e.target.latitude.value;
  const longitude = e.target.longitude.value; 
  const size = e.target.size.value;
  const school = e.target.school.value; 
  const bus = e.target.bus.value; 
  const restaurant = e.target.restaurant.value;
  const utilities = e.target.utilities.value; 
  const pet = e.target.pet.value;
  const income = e.target.income.value; 

  formData.append("postData[title]", title);
  formData.append("postData[price]", price);
  formData.append("postData[address]", address);
  formData.append("postData[city]", city);
  formData.append("postData[bedroom]", bedroom);
  formData.append("postData[bathroom]", bathroom);
  formData.append("postData[type]", type);
  formData.append("postData[property]", property);
  formData.append("postData[latitude]", latitude); 
  formData.append("postData[longitude]", longitude); 
  formData.append("postDetail[desc]", value);
  formData.append("postDetail[size]", size); 
  formData.append("postDetail[school]", school);
  formData.append("postDetail[bus]", bus); 
  formData.append("postDetail[restaurant]", restaurant); 
  formData.append("postDetail[utilities]", utilities);
  formData.append("postDetail[pet]", pet);
  formData.append("postDetail[income]", income);

  // Add images to formData
  images.forEach((image) => {
      formData.append("images", image); 
  });

  console.log("Form Data:", Object.fromEntries(formData.entries()));

  try {
      const res = await apiRequest.post("/posts", formData, {
          withCredentials: true,
      });
      console.log("Response:", res.data);
  } catch (error) {
      setError("Error uploading post: " + error.message);
  }
};


  return (
    <div className="createPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}> 
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
          
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {/* {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))} */}
         <h2 className='title'>Upload Images</h2>
        <div className='uploadWidget'>  
            {images.length === 0 && (
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          )}
          {images.length > 0 && (
            
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          )}
            <div className="imagePreviewContainer">
            {/* Görsel önizlemeleri */}
            {Array.from(images).map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Uploaded preview ${index}`}
                className="imagePreview"
              />
            ))}
          </div>
          </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
import "./createPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import apiRequest from "../../services/apiRequest";
import LeafletMap from "../../components/leaflet-map/leafletMap.jsx";  // Corrected import

function CreatePostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState(null);  // State to store latitude
  const [longitude, setLongitude] = useState(null);  // State to store longitude

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Use e.target to extract values from the form inputs
    const title = e.target.title.value;
    const price = e.target.price.value;
    const address = e.target.address.value;
    const city = e.target.city.value;
    const bedroom = e.target.bedroom.value;
    const bathroom = e.target.bathroom.value;
    const type = e.target.type.value;
    const property = e.target.property.value;
    const size = e.target.size.value;
    const school = e.target.school.value;
    const bus = e.target.bus.value;
    const restaurant = e.target.restaurant.value;
    const utilities = e.target.utilities.value;
    const pet = e.target.pet.value;
    const income = e.target.income.value;

    // Append form data
    formData.append("title", title);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("bedroom", bedroom);
    formData.append("bathroom", bathroom);
    formData.append("type", type);
    formData.append("property", property);
    formData.append("latitude", latitude);  // Use latitude from the map
    formData.append("longitude", longitude);  // Use longitude from the map
    formData.append("desc", value);
    formData.append("size", size);
    formData.append("school", school);
    formData.append("bus", bus);
    formData.append("restaurant", restaurant);
    formData.append("utilities", utilities);
    formData.append("pet", pet);
    formData.append("income", income);

    // Add images to formData
    if (images.length > 0) {
      images.forEach(image => formData.append("images", image));
  }

  console.log("Form Data:", Object.fromEntries(formData.entries()));

  try {
      const res = await apiRequest.post("/posts", formData, {
          withCredentials: true,
      });
      console.log("Response:", res.data);
  } catch (error) {
      setError("Error uploading post: " + (error.response?.data?.message || error.message));
      console.log(error.response?.data || error);
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
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>

            {/* Other Form Fields */}
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" required />
            </div>

            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" required>
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
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
              <input min={0} id="size" name="size" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input id="school" name="school" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bus">Nearby Bus Stop</label>
              <input id="bus" name="bus" type="text" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Nearby Restaurant</label>
              <input id="restaurant" name="restaurant" type="text" />
            </div>

            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {/* Map Section */}
        <div className="mapContainer">
          <h2>Select Location</h2>
          <LeafletMap setLocation={(location) => {
            setLatitude(location.lat);
            setLongitude(location.lng);
          }} />
        </div>

        {/* Upload Widget */}
        <div className="uploadWidget">
          <h2>Upload Images</h2>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
          <div className="imagePreviewContainer">
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

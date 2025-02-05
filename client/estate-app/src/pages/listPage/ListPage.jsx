import "./ListPage.scss";
import Filter from "../../components/filter/filter.jsx";
import Card from "../../components/card/card.jsx";
import Map from "../../components/map/map.jsx";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const { postResponse } = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter data={postResponse} />
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={postResponse}>
              {(posts) => posts.map((post) => <Card key={post.id} item={post} />)}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading map...</p>}>
          <Await resolve={postResponse}>
            {(posts) => <Map items={posts} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
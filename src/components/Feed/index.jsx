import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../client.js";

import { MasonryLayout, Spinner } from "../../components";
import { feedQuery, searchQuery } from "../../utils/data.js";

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState();
    const { categoryId } = useParams();

    useEffect(() => {


        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);

            client.fetch(query).then(data => {
                setPins(data);
                setLoading(false);
            });
        } else {
            setLoading(true);

            client.fetch(feedQuery).then(data => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);
    console.log(pins)

    const categoryName = categoryId || "new";

    if (loading) return <Spinner msg={`We are adding ${categoryName} ideas to your feed!`} />;

    return <div>
        {pins && <MasonryLayout pins={pins} />}
    </div>;
};

export default Feed;

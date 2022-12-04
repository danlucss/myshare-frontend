import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../../client.js";

import { MasonryLayout, Spinner } from "../../components";
import { feedQuery, searchQuery } from "../../utils/data.js";

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        if (categoryId) {
            const query = searchQuery(categoryId);

            client.fetch(query).then(data => {
                setPins(data);
                setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then(data => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);

    if (loading) return <Spinner msg={"We are adding new ideas to your feed!"} />;

    return <div>
        {pins && <MasonryLayout pins={pins} />}
    </div>;
};

export default Feed;
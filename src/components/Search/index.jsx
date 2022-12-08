import { useState, useEffect } from "react";

import { MasonryLayout } from "../../components";
import { client } from "../../client";
import { feedQuery, searchQuery } from "../../utils/data";
import Spinner from "../Spinner";

const Search = ({ searchTerms }) => {
    const [loading, setLoading] = useState(true);
    const [pins, setPins] = useState(null);


    useEffect(() => {
        if (searchTerms) {
            setLoading(true);
            const query = searchQuery(searchTerms.toLowerCase());
            client.fetch(query).then((res) => {
                setPins(res);
                setLoading(false);
            });

        } else {

            client.fetch(feedQuery).then((res) => {
                setPins(res);
                setLoading(false);
            }
            );
        }

    }, [searchTerms]);

    return (
        <div>
            {loading && <Spinner msg={`Searching for Pins...`} />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerms !== '' && !loading && (
                <div className="mt-10 text-center   text-xl"> No Pins Found</div>
            )}
        </div>
    )
}

export default Search;
import { useState, useEffect } from "react";

// 4 - custom hook
export const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(url);
    
          const json = await res.json();
    
          setData(json);
        }
        fetchData();
    }, [url]);

    return { data };
}
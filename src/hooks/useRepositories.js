import { useState, useEffect } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState();

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace IP address with own
    const response = await fetch("http://192.168.0.197:5000/api/repositories");
    const json = await response.json();

    console.log(json);
    setLoading(false);
    setRepositories(json);
  };

  // Save the data into state once app initialize
  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;

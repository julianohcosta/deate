const { useState } = require("react");

const useHttp = (requestConfig, callback) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const controller = new AbortController();
  const signal = controller.signal;

  const sendRequest = () => {
    setError(null);
    try {
      fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        signal,
      })
        .then(response => {
          if (!response.ok) {
            setError("Request Failed!");
          }
          return response.json();
        })
        .then(resposta => {
          callback(resposta);
        })
        .catch(err => {
          setError(err.message || "Something went wrong!");
        });
    } catch (e) {
      setError(e.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    error,
    sendRequest,
    controller,
  };
};

export default useHttp;

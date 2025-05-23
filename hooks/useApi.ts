import { useCallback, useEffect, useState } from "react";

interface ApiRequest {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  transform?: (data: unknown) => unknown;
  dependencies?: unknown[];
  lazy?: boolean;
}

export const useApi = ({
  endpoint,
  method,
  body,
  headers = {},
  token,
  onSuccess,
  onError,
  transform,
  dependencies = [],
  lazy = true,
}: ApiRequest) => {
  const [status, setStatus] = useState<
    "pending" | "idle" | "success" | "error"
  >("idle");
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);

  const requestBody = JSON.stringify(body);
  const requestHeaders = JSON.stringify(headers);

  const request = useCallback(async () => {
    const configHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (token) {
      configHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      method,
      body: requestBody,
      headers: configHeaders,
    };

    try {
      setStatus("pending");
      const completeUrl = new URL("http://localhost:8081" + endpoint);
      const response = await fetch(completeUrl,config);
      const responseData = await response.json();

      if (response.ok) {
        const transformedData = transform
          ? transform(responseData)
          : responseData;
        setData(transformedData);
        setStatus("success");
        onSuccess?.(transformedData);
      } else {
        setError(responseData);
        setStatus("error");
        onError?.(responseData);
      }
    } catch (err) {
      console.error(err);
      setError(err);
      setStatus("error");
      onError?.(err);
    }
  }, [
    endpoint,
    method,
    requestBody,
    requestHeaders,
    token,
    transform,
    onSuccess,
    onError,
  ]);

  useEffect(() => {
    if (!lazy) {
      request();
    }
  }, [request, ...dependencies, lazy]);

  return { status, data, error, request };
};

import { useState } from "react";
import { RequestModel } from "./model/FetchModel";
import { requestAPI } from "./Requestfetch";


export const useFetch = <T,>() => {

    const [data, setData] = useState<T>();

    const [state, setState] = useState({
        isLoading: false,
        hasError: "",
    })




    const doFetch = async (request: RequestModel) => {
        setState({
            ...state,
            isLoading: true,
        });

        try {

            const response = await requestAPI<T>(request);

            if (response != null) {


                setData(response);
                setState({
                    ...state,
                    isLoading: false,
                    hasError: ''
                });
            } else {

                setState({
                    ...state,
                    isLoading: false,
                    hasError: "error al traer datos del API",
                });
            }
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                hasError: "Error al traer datos del API",
            });
        }
    }

    return {
        data,
        ...state,
        doFetch, setState
    };
}